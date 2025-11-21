import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link?: string;
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
    link: 'https://www.curseforge.com/minecraft/mc-mods/spelunkery-plus',
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
    link: 'https://www.curseforge.com/minecraft/mc-mods/orbital-railgun-reforged',
  },
];

function Feature({title, image, description, link}: FeatureItem) {
  const content = (
    <>
      <div className="text--center">
        <img src={image} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </>
  );

  return (
    <div className={clsx('col col--3')}>
      {link ? (
        <a href={link} className={styles.featureLink}>
          {content}
        </a>
      ) : (
        content
      )}
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
