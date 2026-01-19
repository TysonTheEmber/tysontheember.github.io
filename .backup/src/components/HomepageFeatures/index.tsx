import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import type {DownloadsData} from '@site/src/utils/downloads';
import {fetchDownloads} from '@site/src/utils/downloads';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link?: string;
  buttonLabel?: string;
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
        with full control over styling, positioning, and animations. With more to come!
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
        smooth camera paths, and export capabilities for use in your videos.
      </>
    ),
    link: '/aperture-api/intro',
    curseforgeSlug: 'aperture-api',
    modrinthSlug: 'aperture-api',
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
    link: '/orbital-railgun/config',
    buttonLabel: 'Config Guide',
    curseforgeSlug: 'orbital-railgun-reforged',
  },
];

function Feature({
  title,
  image,
  description,
  link,
  buttonLabel,
  curseforgeSlug,
  modrinthSlug,
  downloadsData,
  downloadsLoading,
  downloadsError,
}: FeatureItem & {
  downloadsData: DownloadsData | null;
  downloadsLoading: boolean;
  downloadsError: boolean;
}) {

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

  const projectKey = curseforgeSlug ?? modrinthSlug;
  const projectData = projectKey ? downloadsData?.projects?.[projectKey] : undefined;
  const curseforgeDownloads = projectData?.curseforge;
  const modrinthDownloads = projectData?.modrinth;
  const totalDownloads =
    projectData?.total ??
    ((curseforgeDownloads ?? 0) + (modrinthDownloads ?? 0));

  const imageElement = (
    <div className="text--center">
      <img src={image} className={styles.featureImg} alt={title} />
    </div>
  );

  const content = (
    <>
      {link ? (
        <Link to={link} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center'}}>
          {link && (
            <Link to={link} className="button button--primary button--md" style={{width: '100%', maxWidth: '200px'}}>
              {buttonLabel ?? 'View Docs'}
            </Link>
          )}
          {(curseforgeSlug || modrinthSlug) && (
            <>
              {downloadsLoading ? (
                <div style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)'}}>Loading downloads...</div>
              ) : downloadsError ? (
                <div style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)'}}>Downloads unavailable right now</div>
              ) : (
                <>
                  {(projectData && totalDownloads !== null) ? (
                    <div style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
                      <div style={{marginBottom: '0.25rem', fontWeight: 'bold'}}>
                        {formatDownloads(totalDownloads)} total downloads
                      </div>
                    </div>
                  ) : (
                    <div style={{marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)'}}>
                      No download data yet
                    </div>
                  )}
                  <div style={{fontSize: '0.9rem', display: 'flex', gap: '1rem'}}>
                    {curseforgeDownloads !== undefined && curseforgeDownloads !== null && curseforgeSlug && (
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
                    {modrinthSlug && modrinthDownloads !== undefined && modrinthDownloads !== null && (
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
    <div className={clsx('col col--4')}>
      {content}
    </div>
  );
}

function FeaturesGrid({
  downloadsData,
  downloadsLoading,
  downloadsError,
}: {
  downloadsData: DownloadsData | null;
  downloadsLoading: boolean;
  downloadsError: boolean;
}): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature
              key={idx}
              {...props}
              downloadsData={downloadsData}
              downloadsLoading={downloadsLoading}
              downloadsError={downloadsError}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  const [downloadsData, setDownloadsData] = useState<DownloadsData | null>(null);
  const [downloadsLoading, setDownloadsLoading] = useState(true);
  const [downloadsError, setDownloadsError] = useState(false);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const data = await fetchDownloads();
        if (!data) {
          setDownloadsError(true);
          return;
        }
        setDownloadsData(data);
      } catch (err) {
        console.error('Error fetching project downloads', err);
        setDownloadsError(true);
      } finally {
        setDownloadsLoading(false);
      }
    };

    loadDownloads();
  }, []);

  return (
    <FeaturesGrid
      downloadsData={downloadsData}
      downloadsLoading={downloadsLoading}
      downloadsError={downloadsError}
    />
  );
}
