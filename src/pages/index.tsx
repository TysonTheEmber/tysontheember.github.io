import type {ReactNode} from 'react';
import {useState, useEffect, useMemo} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface EmberConfig {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  blur: number;
  opacity: number;
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [windDirection, setWindDirection] = useState<'left' | 'right' | 'none'>('none');

  useEffect(() => {
    const fetchTotalDownloads = async () => {
      try {
        // Fetch pre-computed download counts from static file
        // This file is updated every 6 hours by GitHub Actions
        const response = await fetch('/data/downloads.json');
        const data = await response.json();
        setTotalDownloads(data.total);
      } catch (error) {
        console.error('Error fetching downloads:', error);
      }
      setLoading(false);
    };

    fetchTotalDownloads();
  }, []);

  useEffect(() => {
    const changeWind = () => {
      const directions: Array<'left' | 'right' | 'none'> = ['left', 'right', 'none'];
      const randomIndex = Math.floor(Math.random() * directions.length);
      setWindDirection(directions[randomIndex]);
    };

    // Change wind direction every 3-6 seconds
    const interval = setInterval(() => {
      changeWind();
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  const formatDownloads = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const emberConfigs = useMemo(() => {
    const generateConfig = (count: number, layer: 'background' | 'midground' | 'foreground'): EmberConfig[] => {
      const configs: EmberConfig[] = [];
      for (let i = 0; i < count; i++) {
        let size: number, blur: number, opacity: number;
        if (layer === 'background') {
          size = 2 + Math.random() * 3;
          blur = 3 + Math.random() * 2;
          opacity = 0.2 + Math.random() * 0.2;
        } else if (layer === 'midground') {
          size = 4 + Math.random() * 4;
          blur = 1 + Math.random() * 1;
          opacity = 0.4 + Math.random() * 0.2;
        } else {
          size = 6 + Math.random() * 6;
          blur = 0;
          opacity = 0.6 + Math.random() * 0.3;
        }

        configs.push({
          id: `${layer}-${i}`,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 6 + Math.random() * 8,
          size,
          blur,
          opacity,
        });
      }
      return configs;
    };

    return {
      background: generateConfig(25, 'background'),
      midground: generateConfig(20, 'midground'),
      foreground: generateConfig(15, 'foreground'),
    };
  }, []);

  const renderEmbers = (configs: EmberConfig[], layer: 'background' | 'midground' | 'foreground') => {
    return configs.map((config) => (
      <div
        key={config.id}
        className={`${styles.ember} ${styles[layer]}`}
        style={{
          left: `${config.left}%`,
          animationDelay: `${config.delay}s`,
          animationDuration: `${config.duration}s`,
          width: `${config.size}px`,
          height: `${config.size}px`,
          filter: config.blur > 0 ? `blur(${config.blur}px)` : 'none',
          opacity: config.opacity,
          '--wind-offset': windDirection === 'left' ? '-400px' : windDirection === 'right' ? '400px' : '0px',
        } as React.CSSProperties}
      />
    ));
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.emberBackground}>
        {renderEmbers(emberConfigs.background, 'background')}
        {renderEmbers(emberConfigs.midground, 'midground')}
        {renderEmbers(emberConfigs.foreground, 'foreground')}
      </div>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.downloads}>
          {loading ? (
            <div>Loading downloads...</div>
          ) : totalDownloads !== null ? (
            <div className={styles.downloadCount}>
              <strong>{formatDownloads(totalDownloads)}</strong> total downloads
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Minecraft mods by TysonTheEmber - featuring Embers Text API, Aperture API, Spelunkery+, and Orbital Railgun Reforged">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
