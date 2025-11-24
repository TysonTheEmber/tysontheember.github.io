import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import EmberCanvas from '@site/src/components/EmberCanvas';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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

  const formatDownloads = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <EmberCanvas className={styles.emberBackground} />
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
