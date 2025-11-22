import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function ViewCounter(): JSX.Element {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      try {
        // Using CountAPI.xyz - a free view counter API
        // This will increment the counter each time the page loads
        const response = await fetch(
          'https://api.countapi.xyz/hit/tysontheember.dev/page-views'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch views');
        }

        const data = await response.json();
        setViews(data.value);
      } catch (err) {
        console.error('Error fetching view count:', err);
        setError(true);
      }
    };

    fetchAndIncrementViews();
  }, []);

  if (error) {
    return null; // Don't show anything if there's an error
  }

  if (views === null) {
    return (
      <div className={styles.viewCounter}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        <span className={styles.count}>---</span>
      </div>
    );
  }

  // Format number with commas (e.g., 1,234,567)
  const formattedViews = views.toLocaleString();

  return (
    <div className={styles.viewCounter}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
      <span className={styles.count}>{formattedViews} views</span>
    </div>
  );
}
