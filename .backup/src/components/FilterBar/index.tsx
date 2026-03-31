import type {ReactNode} from 'react';
import styles from './styles.module.css';

type FilterBarProps = {
  games: string[];
  tags: string[];
  selectedGame: string;
  selectedTags: string[];
  onGameChange: (game: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
};

export default function FilterBar({
  games,
  tags,
  selectedGame,
  selectedTags,
  onGameChange,
  onTagToggle,
  onClearFilters,
}: FilterBarProps): ReactNode {
  const hasActiveFilters = selectedGame !== 'all' || selectedTags.length > 0;

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Game:</label>
        <div className={styles.gameButtons}>
          <button
            className={`${styles.gameButton} ${selectedGame === 'all' ? styles.active : ''}`}
            onClick={() => onGameChange('all')}
          >
            All
          </button>
          {games.map((game) => (
            <button
              key={game}
              className={`${styles.gameButton} ${selectedGame === game ? styles.active : ''}`}
              onClick={() => onGameChange(game)}
            >
              {game.charAt(0).toUpperCase() + game.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Tags:</label>
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
