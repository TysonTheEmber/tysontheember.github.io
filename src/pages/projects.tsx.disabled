import {useState, useEffect, useMemo} from 'react';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FilterBar from '@site/src/components/FilterBar';
import ProjectCard from '@site/src/components/ProjectCard';
import {projects, allProjectTypes, allTags, type ProjectType} from '@site/src/data/projects';
import type {DownloadsData} from '@site/src/utils/downloads';
import {fetchDownloads} from '@site/src/utils/downloads';
import styles from './projects.module.css';

export default function ProjectsPage(): ReactNode {
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedType('all');
    setSelectedTags([]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = selectedType === 'all' || project.type === selectedType;
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));
      return typeMatch && tagsMatch;
    });
  }, [selectedType, selectedTags]);

  return (
    <Layout
      title="Projects"
      description="Browse all projects by TysonTheEmber - Minecraft mods, APIs, and more"
    >
      <div className={styles.projectsPage}>
        <div className="container">
          <header className={styles.pageHeader}>
            <Heading as="h1">Projects</Heading>
            <p>Explore all my projects - mods, APIs, and more</p>
          </header>

          <FilterBar
            projectTypes={allProjectTypes}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
          />

          {downloadsLoading ? (
            <div className={styles.loadingState}>
              <p>Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No projects found matching your filters.</p>
              <button className="button button--primary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  downloadsData={downloadsData}
                  downloadsLoading={downloadsLoading}
                  downloadsError={downloadsError}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
