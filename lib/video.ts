import { VideoType } from './types';

/**
 * Detects whether a URL is from Google Drive, YouTube, or Vimeo.
 */
export function detectVideoType(url: string): VideoType {
  if (!url) return 'unknown';
  const lower = url.toLowerCase();

  if (lower.includes('drive.google.com')) return 'google_drive';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.includes('vimeo.com')) return 'vimeo';

  return 'unknown';
}

/**
 * Converts any raw video URL into a clean embeddable iframe src.
 *
 * Google Drive:  /file/d/FILE_ID/view  →  /file/d/FILE_ID/preview
 * YouTube:       watch?v=ID or youtu.be/ID  →  youtube.com/embed/ID
 * Vimeo:         vimeo.com/ID  →  player.vimeo.com/video/ID
 */
export function convertToEmbedUrl(url: string, type: VideoType): string {
  if (!url) return '';

  try {
    switch (type) {
      case 'google_drive': {
        // Already a preview link
        if (url.includes('/preview')) return url;

        // Extract file ID from common Drive URL patterns
        const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
          return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
        }

        // open?id=FILE_ID format
        const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (openMatch) {
          return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
        }

        return url;
      }

      case 'youtube': {
        // Already an embed
        if (url.includes('youtube.com/embed/')) return url;

        let videoId: string | null = null;

        // youtu.be/ID
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) videoId = shortMatch[1];

        // youtube.com/watch?v=ID
        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) videoId = watchMatch[1];

        // youtube.com/shorts/ID
        const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) videoId = shortsMatch[1];

        if (videoId) {
          // vq=hd1080 forces 1080p, modestybranding removes logo
          return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&vq=hd1080`;
        }

        return url;
      }

      case 'vimeo': {
        // Already an embed
        if (url.includes('player.vimeo.com')) return url;

        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeoMatch) {
          // quality=1080p forces higher resolution
          return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&transparent=0&quality=1080p`;
        }

        return url;
      }

      default:
        return url;
    }
  } catch {
    return url;
  }
}

/**
 * Full pipeline: detect type and convert URL.
 */
export function processVideoUrl(rawUrl: string): {
  embedUrl: string;
  type: VideoType;
} {
  const type = detectVideoType(rawUrl);
  const embedUrl = convertToEmbedUrl(rawUrl, type);
  return { embedUrl, type };
}
