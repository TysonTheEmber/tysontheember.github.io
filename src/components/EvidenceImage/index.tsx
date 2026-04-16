import React, {useState, useEffect, useCallback} from 'react';
import {createPortal} from 'react-dom';
import styles from './styles.module.css';

interface EvidenceImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function EvidenceImage({src, alt, caption}: EvidenceImageProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const modal =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.overlay}
            onClick={close}
            role="dialog"
            aria-label={caption}
          >
            <button
              className={styles.closeButton}
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              className={styles.modalImage}
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
            />
            <p className={styles.modalCaption}>{caption}</p>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <figure className={styles.container}>
        <div
          className={styles.imageWrapper}
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpen(true);
          }}
        >
          <img className={styles.thumbnail} src={src} alt={alt} loading="lazy" />
          <span className={styles.zoomHint}>Click to enlarge</span>
        </div>
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
      {modal}
    </>
  );
}
