import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link?: string;
  curseforgeSlug?: string;
  modrinthSlug?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Embers Text API',
    image: require('@site/static/img/embers-text-api-icon.png').default,
    description: (
      <>
        Create stunning animated in-game overlays, banners, and cinematic text messaging
        with full control over styling, positioning, and animations.
      </>
    ),
    link: '/embers-text-api/intro',
    curseforgeSlug: 'embers-text-api',
    modrinthSlug: 'embers-text-api',
  },
  {
    title: 'Aperture API',
    image: require('@site/static/img/aperture-api-icon.png').default,
    description: (
      <>
        Professional cinematic camera tooling for Minecraft Forge with in-game editing,
        smooth camera paths, and export capabilities for your videos.
      </>
    ),
    link: '/aperture-api/intro',
    curseforgeSlug: 'aperture-api',
    modrinthSlug: 'aperture-api',
  },
  {
    title: 'Spelunkery+',
    image: require('@site/static/img/spelunkery-plus-icon.png').default,
    description: (
      <>
        Enhance your underground adventures with expanded mining progression,
        new loot tables, and compatibility with popular mining-focused mods.
      </>
    ),
    curseforgeSlug: 'spelunkery-plus',
    modrinthSlug: 'spelunkery-plus',
  },
  {
    title: 'Orbital Railgun Reforged',
    image: require('@site/static/img/orbital-railgun-icon.png').default,
    description: (
      <>
        A powerful weapon mod bringing devastating orbital strikes to Minecraft.
        Unleash precision firepower from the skies with advanced targeting systems.
      </>
    ),
    curseforgeSlug: 'orbital-railgun-reforged',
    modrinthSlug: 'orbital-railgun-reforged',
  },
];

function Feature({title, image, description, link, curseforgeSlug, modrinthSlug}: FeatureItem) {
  const [curseforgeDownloads, setCurseforgeDownloads] = useState<number | null>(null);
  const [modrinthDownloads, setModrinthDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];

      if (curseforgeSlug) {
        promises.push(
          fetch(`https://api.cfwidget.com/minecraft/mc-mods/${curseforgeSlug}`)
            .then(res => res.json())
            .then(data => {
              if (data.downloads?.total) {
                setCurseforgeDownloads(data.downloads.total);
              }
            })
            .catch(() => {})
        );
      }

      if (modrinthSlug) {
        promises.push(
          fetch(`https://api.modrinth.com/v2/project/${modrinthSlug}`)
            .then(res => res.json())
            .then(data => {
              if (data.downloads) {
                setModrinthDownloads(data.downloads);
              }
            })
            .catch(() => {})
        );
      }

      await Promise.all(promises);
      setLoading(false);
    };

    fetchData();
  }, [curseforgeSlug, modrinthSlug]);

  const formatDownloads = (count: number | null): string => {
    if (count === null) return '...';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const totalDownloads = (curseforgeDownloads ?? 0) + (modrinthDownloads ?? 0);

  const content = (
    <>
      <div className="text--center">
        <img src={image} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center'}}>
          {link && (
            <Link to={link} className="button button--primary button--md" style={{width: '100%', maxWidth: '200px'}}>
              View Docs
            </Link>
          )}
          {(curseforgeSlug || modrinthSlug) && (
            <>
              {loading ? (
                <div style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)'}}>Loading downloads...</div>
              ) : (
                <>
                  {(curseforgeDownloads !== null || modrinthDownloads !== null) && (
                    <div style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
                      <div style={{marginBottom: '0.25rem', fontWeight: 'bold'}}>
                        {formatDownloads(totalDownloads)} total downloads
                      </div>
                    </div>
                  )}
                  <div style={{fontSize: '0.9rem', display: 'flex', gap: '1rem'}}>
                    {curseforgeDownloads !== null && curseforgeSlug && (
                      <div>
                        <a
                          href={`https://www.curseforge.com/minecraft/mc-mods/${curseforgeSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{color: 'var(--ifm-color-primary)', textDecoration: 'underline', fontWeight: '500'}}
                        >
                          CurseForge
                        </a>
                        {' '}({formatDownloads(curseforgeDownloads)})
                      </div>
                    )}
                    {modrinthSlug && modrinthDownloads !== null && (
                      <div>
                        <a
                          href={`https://modrinth.com/mod/${modrinthSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{color: 'var(--ifm-color-primary)', textDecoration: 'underline', fontWeight: '500'}}
                        >
                          Modrinth
                        </a>
                        {' '}({formatDownloads(modrinthDownloads)})
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className={clsx('col col--3')}>
      {content}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
