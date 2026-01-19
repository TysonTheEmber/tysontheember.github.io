import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {Project} from '@site/src/data/projects';
import type {DownloadsData} from '@site/src/utils/downloads';
import styles from './styles.module.css';

type ProjectCardProps = Project & {
  downloadsData: DownloadsData | null;
  downloadsLoading: boolean;
  downloadsError: boolean;
};

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

export default function ProjectCard({
  title,
  image,
  description,
  link,
  buttonLabel,
  curseforgeSlug,
  modrinthSlug,
  tags,
  downloadsData,
  downloadsLoading,
  downloadsError,
}: ProjectCardProps): ReactNode {
  const projectKey = curseforgeSlug ?? modrinthSlug;
  const projectData = projectKey ? downloadsData?.projects?.[projectKey] : undefined;
  const curseforgeDownloads = projectData?.curseforge;
  const modrinthDownloads = projectData?.modrinth;
  const totalDownloads =
    projectData?.total ??
    ((curseforgeDownloads ?? 0) + (modrinthDownloads ?? 0));

  return (
    <div className="card">
      <div className={styles.projectCardHeader}>
        <img
          src={image}
          alt={`${title} icon`}
          className={styles.projectIcon}
        />
        <div className={styles.projectInfo}>
          <h3>{title}</h3>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.projectCardBody}>
        <p className={styles.projectDescription}>{description}</p>

        {(curseforgeSlug || modrinthSlug) && (
          <div className={styles.statsSection}>
            {downloadsLoading ? (
              <div className={styles.downloadText}>Loading downloads...</div>
            ) : downloadsError ? (
              <div className={styles.downloadText}>Downloads unavailable</div>
            ) : (
              <>
                {(projectData && totalDownloads !== null && totalDownloads > 0) ? (
                  <>
                    <div className={styles.totalDownloads}>
                      <strong>{formatDownloads(totalDownloads)}</strong> downloads
                    </div>
                    <div className={styles.platformStats}>
                      {curseforgeDownloads !== undefined && curseforgeDownloads !== null && curseforgeSlug && (
                        <span className={styles.statBadge}>
                          CF: {formatDownloads(curseforgeDownloads)}
                        </span>
                      )}
                      {modrinthSlug && modrinthDownloads !== undefined && modrinthDownloads !== null && (
                        <span className={styles.statBadge}>
                          MR: {formatDownloads(modrinthDownloads)}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={styles.downloadText}>No downloads yet</div>
                )}
              </>
            )}
          </div>
        )}

        <div className={styles.projectActions}>
          {link && (
            <Link to={link} className="button button--primary button--block">
              {buttonLabel ?? 'View Docs'}
            </Link>
          )}
          {curseforgeSlug && (
            <Link
              className="button button--secondary button--block"
              href={`https://www.curseforge.com/minecraft/mc-mods/${curseforgeSlug}`}
            >
              Download on CurseForge
            </Link>
          )}
          {modrinthSlug && (
            <Link
              className="button button--secondary button--block"
              href={`https://modrinth.com/mod/${modrinthSlug}`}
            >
              Download on Modrinth
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
