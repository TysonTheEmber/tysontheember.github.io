import type {ReactNode} from 'react';
import type {ProjectType} from '@site/src/data/projects';
import styles from './styles.module.css';

type FilterBarProps = {
  projectTypes: ProjectType[];
  selectedType: ProjectType | 'all';
  onTypeChange: (projectType: ProjectType | 'all') => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
};

export default function FilterBar({
  projectTypes,
  selectedType,
  onTypeChange,
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
}: FilterBarProps): ReactNode {
  const hasActiveFilters = selectedType !== 'all' || selectedTags.length > 0;

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Filter by Type:</label>
        <div className={styles.typeButtons}>
          <button
            className={`${styles.typeButton} ${selectedType === 'all' ? styles.active : ''}`}
            onClick={() => onTypeChange('all')}
          >
            All
          </button>
          {projectTypes.map((type) => (
            <button
              key={type}
              className={`${styles.typeButton} ${selectedType === type ? styles.active : ''}`}
              onClick={() => onTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Filter by Tags:</label>
        <div className={styles.tagButtons}>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.active : ''}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className={styles.clearSection}>
          <button className={styles.clearButton} onClick={onClearFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
