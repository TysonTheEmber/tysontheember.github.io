import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function ViewCounter(): React.ReactElement {
  // Show cached value immediately for instant display
  const [views, setViews] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cached-view-count');
      return cached ? parseInt(cached, 10) : null;
    }
    return null;
  });
  // Only show loading if there's no cached value
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cached-view-count');
      return !cached; // Only loading if no cache exists
    }
    return true;
  });

  useEffect(() => {
    // Check if the visitor is a bot/crawler
    const isBot = (): boolean => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return true;
      }

      const botPatterns = [
        /bot/i, /crawler/i, /spider/i, /crawling/i,
        /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i,
        /baiduspider/i, /yandexbot/i, /facebookexternalhit/i,
        /twitterbot/i, /rogerbot/i, /linkedinbot/i,
        /embedly/i, /quora link preview/i, /showyoubot/i,
        /outbrain/i, /pinterest/i, /developers\.google\.com\/\+\/web\/snippet/i,
        /slackbot/i, /vkshare/i, /w3c_validator/i,
        /redditbot/i, /applebot/i, /whatsapp/i, /flipboard/i,
        /tumblr/i, /bitlybot/i, /skypeuripreview/i, /nuzzel/i,
        /discordbot/i, /qwantify/i, /pinterestbot/i,
        /lighthouse/i, /chrome-lighthouse/i, /ahrefsbot/i,
        /semrushbot/i, /dotbot/i, /algolia/i
      ];

      const userAgent = navigator.userAgent;
      return botPatterns.some(pattern => pattern.test(userAgent));
    };

    const fetchAndIncrementViews = async () => {
      try {
        // Skip incrementing if this is a bot
        if (isBot()) {
          console.log('Bot detected, skipping view increment');
          // Still fetch the count to display, but use GET endpoint without incrementing
          const response = await fetch(
            'https://api.counterapi.dev/v1/tysontheember.dev/page-views',
            {
              method: 'GET',
            }
          );

          if (response.ok) {
            const data = await response.json();
            setViews(data.count);
            localStorage.setItem('cached-view-count', data.count.toString());
          }
          setIsLoading(false);
          return;
        }

        // Set a shorter timeout for faster fallback
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

        const response = await fetch(
          'https://api.counterapi.dev/v1/tysontheember.dev/page-views/up',
          {
            method: 'GET',
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn('CounterAPI request failed, using fallback');
          throw new Error('API request failed');
        }

        const data = await response.json();
        console.log('View count response:', data);
        setViews(data.count);
        // Cache the value for instant display on next visit
        localStorage.setItem('cached-view-count', data.count.toString());
      } catch (err) {
        console.error('Error fetching view count:', err);
        // Try alternative approach - simple localStorage increment for demo
        const localCount = localStorage.getItem('view-count');
        const currentCount = localCount ? parseInt(localCount, 10) : 1000;
        const newCount = currentCount + 1;
        localStorage.setItem('view-count', newCount.toString());
        localStorage.setItem('cached-view-count', newCount.toString());
        setViews(newCount);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndIncrementViews();
  }, []);

  // Format large numbers with abbreviations (1k, 1M, etc.)
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
  };

  // Always show the counter, even while loading
  const displayText = isLoading ? '...' : views !== null ? `${formatViewCount(views)} views` : 'Loading...';

  // Create tooltip with exact number
  const tooltipText = views !== null ? `${views.toLocaleString()} total views` : 'Loading view count...';

  return (
    <div className={styles.viewCounter} title={tooltipText}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
      <span className={styles.count}>{displayText}</span>
    </div>
  );
}
