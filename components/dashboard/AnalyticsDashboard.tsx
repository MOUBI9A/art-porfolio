'use client';

import { useEffect, useState } from 'react';

interface Stats {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
  };
  timeSeries: { date: string, views: number, uniques: number }[];
  referrers: { name: string, count: number }[];
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/v1/analytics/stats?days=7');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-64 glass-strong rounded-xl w-full"></div>;
  }

  if (!stats) return null;

  const maxViews = Math.max(...stats.timeSeries.map(d => d.views), 10);
  
  // Simple SVG Chart Logic
  const width = 600;
  const height = 150;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = stats.timeSeries.map((d, i) => {
    const x = padding + (i / (stats.timeSeries.length - 1)) * chartWidth;
    const y = height - padding - (d.views / maxViews) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium tracking-widest uppercase mb-5" style={{ color: 'var(--color-text-muted)' }}>
        Performance
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="glass-strong rounded-xl p-6">
          <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Total Views</p>
          <p className="text-3xl font-light text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            {stats.summary.totalViews}
          </p>
        </div>
        <div className="glass-strong rounded-xl p-6">
          <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Unique Visitors</p>
          <p className="text-3xl font-light text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            {stats.summary.uniqueVisitors}
          </p>
        </div>
        <div className="glass-strong rounded-xl p-6">
          <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Top Referrer</p>
          <p className="text-3xl font-light text-white truncate" style={{ fontFamily: 'var(--font-playfair)' }}>
            {stats.referrers[0]?.name || 'N/A'}
          </p>
        </div>
      </div>

      <div className="glass-strong rounded-xl p-6 mb-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm font-medium text-white">Views (Last 7 Days)</p>
          </div>
          <div className="flex gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-gold)' }}></span>
              <span>Views</span>
            </div>
          </div>
        </div>
        
        <div className="h-[150px] w-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" />
            <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.05)" />
            
            {/* The Line */}
            <polyline
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.3))' }}
            />
            
            {/* Data Points */}
            {stats.timeSeries.map((d, i) => {
              const x = padding + (i / (stats.timeSeries.length - 1)) * chartWidth;
              const y = height - padding - (d.views / maxViews) * chartHeight;
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r="3" 
                  fill="#000" 
                  stroke="var(--color-gold)" 
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>
        
        <div className="flex justify-between mt-4 px-[20px]">
          {stats.timeSeries.map((d, i) => (
            <span key={i} className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
              {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
