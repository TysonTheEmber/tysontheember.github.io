import React from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
  type NavbarItem as NavbarItemConfig,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import SettingsMenu from '@site/src/components/SettingsMenu';
import NavbarIcon from '@site/src/components/NavbarIcon';
import styles from './styles.module.css';

function useNavbarItems(): NavbarItemConfig[] {
  return useThemeConfig().navbar.items;
}

function NavbarItems({items}: {items: NavbarItemConfig[]}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items',
        )}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right',
        )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const rightItemsWithoutSearch = rightItems.filter(
    (item) => item.type !== 'search',
  );

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItemsWithoutSearch} />
          <div className={styles.desktopOnly}>
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
            <SettingsMenu />
          </div>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {searchBarItem ? (
            <NavbarItem {...searchBarItem} />
          ) : (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
