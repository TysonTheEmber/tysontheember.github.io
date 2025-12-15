import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface NavbarIconProps {
  icon: string;
  href: string;
  label: string;
  size?: number;
}

export default function NavbarIcon({ icon, href, label, size = 24 }: NavbarIconProps): JSX.Element {
  return (
    <a
      href={href}
      className={styles.navbarIcon}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon icon={icon} width={size} height={size} />
    </a>
  );
}
