import React, {type ReactNode, useState} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import {useSettings} from '@site/src/contexts/SettingsContext';
import {Icon} from '@iconify/react';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const {sparksEnabled, toggleSparks} = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <ul className="menu__list">
        {items.map((item, i) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        ))}
      </ul>
      <div className={styles.mobileSidebarFooter}>
        <div className={styles.linksList}>
          <a
            href="https://github.com/TysonTheEmber"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            aria-label="GitHub repository"
          >
            <Icon icon="mdi:github" width={24} height={24} />
            <span>GitHub</span>
          </a>
          <a
            href="https://discord.gg/GCN2Hv4Qzr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            aria-label="Discord server"
          >
            <Icon icon="ic:baseline-discord" width={24} height={24} />
            <span>Discord</span>
          </a>
          <a
            href="https://www.youtube.com/@tysontheember"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            aria-label="YouTube channel"
          >
            <Icon icon="mdi:youtube" width={24} height={24} />
            <span>YouTube</span>
          </a>
          <a
            href="https://modrinth.com/user/TysonTheEmber"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            aria-label="Modrinth profile"
          >
            <Icon icon="simple-icons:modrinth" width={24} height={24} />
            <span>Modrinth</span>
          </a>
          <a
            href="https://www.curseforge.com/members/tysontheember/projects"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            aria-label="CurseForge profile"
          >
            <Icon icon="simple-icons:curseforge" width={24} height={24} />
            <span>CurseForge</span>
          </a>
          <button
            className={styles.linkItem}
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
          >
            <Icon icon="mdi:cog" width={24} height={24} />
            <span>Settings</span>
            <Icon
              icon={showSettings ? "mdi:chevron-up" : "mdi:chevron-down"}
              width={20}
              height={20}
              className={styles.chevron}
            />
          </button>
          {showSettings && (
            <div className={styles.settingsPanel}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>
                    <Icon icon="mdi:sparkles" width={20} height={20} />
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
        <div className={styles.settingsRow}>
          <NavbarColorModeToggle />
        </div>
      </div>
    </>
  );
}
