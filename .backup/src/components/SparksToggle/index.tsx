import React from 'react';
import {useSettings} from '@site/src/contexts/SettingsContext';
import styles from './styles.module.css';

export default function SparksToggle() {
  const {sparksEnabled, toggleSparks} = useSettings();

  return (
    <button
      className={styles.sparksToggle}
      onClick={toggleSparks}
      aria-label={sparksEnabled ? 'Disable click sparks' : 'Enable click sparks'}
      title={sparksEnabled ? 'Disable click sparks' : 'Enable click sparks'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {sparksEnabled ? (
          // Sparkle icon (enabled)
          <>
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="currentColor"
            />
            <path
              d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
              fill="currentColor"
            />
            <path
              d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
              fill="currentColor"
            />
          </>
        ) : (
          // Sparkle icon with slash (disabled)
          <>
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
              fill="currentColor"
              opacity="0.3"
            />
            <line
              x1="3"
              y1="21"
              x2="21"
              y2="3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
