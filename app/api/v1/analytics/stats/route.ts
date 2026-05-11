import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get time range from query (default 7 days for the chart)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // 1. Fetch page views for this user's profile
    const { data: viewsData, error: viewsError } = await supabase
      .from('page_views')
      .select('created_at, ip_hash, project_id, referrer')
      .eq('profile_id', user.id)
      .gt('created_at', startDate.toISOString());

    if (viewsError) {
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }

    // Process data in-memory
    const totalViews = viewsData.length;
    const uniqueVisitors = new Set(viewsData.map(v => v.ip_hash)).size;

    // Views by day
    const viewsByDay: Record<string, { date: string, views: number, uniques: number }> = {};
    const visitorSetByDay: Record<string, Set<string>> = {};

    // Initialize days
    for (let i = 0; i <= days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      viewsByDay[dateStr] = { date: dateStr, views: 0, uniques: 0 };
      visitorSetByDay[dateStr] = new Set();
    }

    viewsData.forEach(v => {
      const dateStr = v.created_at.split('T')[0];
      if (viewsByDay[dateStr]) {
        viewsByDay[dateStr].views++;
        visitorSetByDay[dateStr].add(v.ip_hash);
      }
    });

    Object.keys(viewsByDay).forEach(dateStr => {
      viewsByDay[dateStr].uniques = visitorSetByDay[dateStr].size;
    });

    // Top Referrers
    const referrersMap: Record<string, number> = {};
    viewsData.forEach(v => {
      let ref = 'Direct';
      try {
        if (v.referrer && v.referrer !== '') {
          ref = new URL(v.referrer).hostname;
        }
      } catch (e) {
        ref = 'Other';
      }
      referrersMap[ref] = (referrersMap[ref] || 0) + 1;
    });

    return NextResponse.json({
      summary: {
        totalViews,
        uniqueVisitors,
      },
      timeSeries: Object.values(viewsByDay).sort((a, b) => a.date.localeCompare(b.date)),
      referrers: Object.entries(referrersMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
