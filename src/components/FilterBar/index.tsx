import type {ReactNode} from 'react';
import styles from './styles.module.css';

type FilterBarProps = {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
};

export default function FilterBar({
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
}: FilterBarProps): ReactNode {
  const hasActiveFilters = selectedTags.length > 0;

  return (
    <div className={styles.filterBar}>
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
