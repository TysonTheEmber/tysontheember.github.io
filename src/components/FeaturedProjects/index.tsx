import React from 'react';
import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import Link from '@docusaurus/Link';
import {fetchDownloads, formatDownloadCount, type DownloadsData} from '@site/src/utils/downloads';
import styles from './styles.module.css';

interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  docLink?: string;
  curseforgeSlug?: string;
  modrinthSlug?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'Embers Text API',
    description: 'Send animated text overlays anywhere on screen — typewriter effect, rainbow gradients, neon glow, shake, wave, and more. Built for modpack creators using commands and markup, and mod developers using a clean Java API.',
    image: '/img/embers-text-api-icon.png',
    docLink: '/embers-text-api/intro',
    curseforgeSlug: 'embers-text-api',
    modrinthSlug: 'embers-text-api',
  },
  {
    title: 'Orbital Railgun Reforged',
    description: 'Call down a beam from the heavens and obliterate your foes. A weapon mod that brings orbital railgun firepower to Minecraft — aim, charge, and watch it burn from above. Highly configurable with a in depth config.',
    image: '/img/orbital-railgun-icon.png',
    docLink: '/orbital-railgun/config',
    curseforgeSlug: 'orbital-railgun-reforged',
  },
];

interface ProjectCardProps {
  project: FeaturedProject;
  downloadsData: DownloadsData | null;
  loading: boolean;
}

function ProjectCard({project, downloadsData, loading}: ProjectCardProps): ReactNode {
  const projectKey = project.curseforgeSlug ?? project.modrinthSlug;
  const projectData = projectKey ? downloadsData?.projects?.[projectKey] : undefined;
  const totalDownloads = projectData?.total ?? 0;
  const cfDownloads = projectData?.curseforge ?? 0;
  const mrDownloads = projectData?.modrinth ?? 0;

  return (
    <div className="card">
      <div className={styles.projectCardHeader}>
        <img
          src={project.image}
          alt={`${project.title} icon`}
          className={styles.projectIcon}
        />
        <h3>{project.title}</h3>
      </div>

      <div className={styles.projectCardBody}>
        <p className={styles.projectDescription}>{project.description}</p>

        {!loading && totalDownloads > 0 && (
          <div className={styles.statsSection}>
            <div className={styles.totalDownloads}>
              <strong>{formatDownloadCount(totalDownloads)}</strong> downloads
            </div>
            <div className={styles.platformStats}>
              {cfDownloads > 0 && (
                <span className={styles.statBadge}>
                  CF: {formatDownloadCount(cfDownloads)}
                </span>
              )}
              {mrDownloads > 0 && (
                <span className={styles.statBadge}>
                  MR: {formatDownloadCount(mrDownloads)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className={styles.projectActions}>
          {project.docLink && (
            <Link
              className="button button--primary button--block"
              to={project.docLink}
            >
              View Documentation
            </Link>
          )}
          {project.curseforgeSlug && (
            <Link
              className="button button--secondary button--block"
              href={`https://www.curseforge.com/minecraft/mc-mods/${project.curseforgeSlug}`}
            >
              Download on CurseForge
            </Link>
          )}
          {project.modrinthSlug && !project.curseforgeSlug && (
            <Link
              className="button button--secondary button--block"
              href={`https://modrinth.com/mod/${project.modrinthSlug}`}
            >
              Download on Modrinth
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects(): ReactNode {
  const [downloadsData, setDownloadsData] = useState<DownloadsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const data = await fetchDownloads();
        if (data) {
          setDownloadsData(data);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
      }
      setLoading(false);
    };

    loadDownloads();
  }, []);

  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <p className={styles.sectionDescription}>
          Explore my most popular mods and APIs for Minecraft
        </p>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              downloadsData={downloadsData}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
