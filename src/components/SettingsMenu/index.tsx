import React, {useState, useRef, useEffect} from 'react';
import {Icon} from '@iconify/react';
import {useSettings} from '@site/src/contexts/SettingsContext';
import styles from './styles.module.css';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const {sparksEnabled, toggleSparks} = useSettings();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 200); // Match animation duration
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className={styles.settingsContainer} ref={menuRef}>
      <button
        className={styles.settingsButton}
        onClick={handleToggle}
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        <Icon icon="mdi:cog" width="28" height="28" />
      </button>

      {isOpen && (
        <div className={`${styles.settingsDropdown} ${isAnimating ? styles.closing : ''}`}>
          <div className={styles.settingsHeader}>Settings</div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <Icon icon="mdi:sparkles" width="20" height="20" />
                <span>Click Sparks</span>
              </div>
              <div className={styles.settingDescription}>
                Show particle effects when clicking
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={sparksEnabled}
                onChange={toggleSparks}
                aria-label="Toggle click sparks"
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
