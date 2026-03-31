import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import {Icon} from '@iconify/react';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();

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
        </div>
        <div className={styles.settingsRow}>
          <NavbarColorModeToggle />
        </div>
      </div>
    </>
  );
}
