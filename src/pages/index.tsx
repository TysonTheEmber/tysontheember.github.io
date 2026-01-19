import React from 'react';
import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FeaturedProjects from '@site/src/components/FeaturedProjects';
import Heading from '@theme/Heading';
import EmberCanvas from '@site/src/components/EmberCanvas';
import {fetchDownloads, formatDownloadCount} from '@site/src/utils/downloads';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalDownloads = async () => {
      try {
        const downloads = await fetchDownloads();
        if (downloads) {
          setTotalDownloads(downloads.total);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
      }
      setLoading(false);
    };

    fetchTotalDownloads();
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <EmberCanvas className={styles.emberBackground} />
      <div className="container">
        <div className={styles.heroContent}>
          <img
            src="/img/emberforge-icon.svg"
            alt="EmberForge Logo"
            className={styles.heroLogo}
          />
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>

          {!loading && totalDownloads !== null && (
            <div className={styles.downloadsDisplay}>
              <div className={styles.downloadCount}>
                <strong>{formatDownloadCount(totalDownloads)}</strong>
              </div>
              <div className={styles.downloadLabel}>Total Downloads</div>
            </div>
          )}

          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/projects"
            >
              Browse Projects
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://discord.gg/GCN2Hv4Qzr"
            >
              Join The Discord
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Join the Community</h2>
        <p className={styles.sectionDescription}>
          Connect with other players, get support, and stay updated on the latest EmberForge news!
        </p>
        <div className={styles.communityLinks}>
          <Link
            className="button button--primary button--lg"
            href="https://discord.gg/GCN2Hv4Qzr"
          >
            Join Discord
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/TysonTheEmber"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Projects by TysonTheEmber - featuring Embers Text API, Aperture API, and Orbital Railgun Reforged">
      <HomepageHeader />
      <main>
        <FeaturedProjects />
        <CommunitySection />
      </main>
    </Layout>
  );
}
