import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SettingsMenu from '@site/src/components/SettingsMenu';
import NavbarIcon from '@site/src/components/NavbarIcon';
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
        <div className={styles.iconRow}>
          <NavbarIcon
            icon="mdi:github"
            href="https://github.com/TysonTheEmber"
            label="GitHub repository"
            size={28}
          />
          <NavbarIcon
            icon="ic:baseline-discord"
            href="https://discord.gg/GCN2Hv4Qzr"
            label="Discord server"
            size={30}
          />
          <NavbarIcon
            icon="mdi:youtube"
            href="https://www.youtube.com/@tysontheember"
            label="YouTube channel"
            size={32}
          />
          <NavbarIcon
            icon="simple-icons:modrinth"
            href="https://modrinth.com/user/TysonTheEmber"
            label="Modrinth profile"
          />
          <NavbarIcon
            icon="simple-icons:curseforge"
            href="https://www.curseforge.com/members/tysontheember/projects"
            label="CurseForge profile"
            size={32}
          />
        </div>
        <div className={styles.settingsRow}>
          <SettingsMenu />
          <NavbarColorModeToggle />
        </div>
      </div>
    </>
  );
}
