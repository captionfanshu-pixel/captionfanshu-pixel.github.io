'use client';

import { useEffect, useState } from 'react';

type ProjectGalleryProps = {
  gallery: string[];
  projectId: string;
  projectTitle: string;
};

export default function ProjectGallery({ gallery, projectId, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? null : (current + 1) % gallery.length);
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, gallery.length]);

  return (
    <>
      <div className="visual-stack">
        {gallery.map((image, imageIndex) => (
          <figure key={image} data-reveal>
            <button className="gallery-frame" type="button" onClick={() => setActiveIndex(imageIndex)} aria-label={`放大查看${projectTitle}设计展示 ${imageIndex + 1}`}>
              <img src={image} alt={`${projectTitle}设计展示 ${imageIndex + 1}`} />
              <span className="inspect-hint">VIEW FULLSCREEN ↗</span>
            </button>
            <figcaption><span>{projectId}—{String(imageIndex + 1).padStart(2,'0')}</span><span>DESIGN SHOWCASE / CLICK TO INSPECT</span></figcaption>
          </figure>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${projectTitle}全屏作品查看器`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
          <div className="lightbox-top"><span>{projectId} / {String(activeIndex + 1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</span><button type="button" onClick={() => setActiveIndex(null)} aria-label="关闭全屏查看">CLOSE ×</button></div>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setActiveIndex((activeIndex - 1 + gallery.length) % gallery.length)} aria-label="上一张图片">←</button>
          <figure><img src={gallery[activeIndex]} alt={`${projectTitle}设计展示 ${activeIndex + 1}`} /><figcaption>{projectTitle} / DESIGN SHOWCASE {String(activeIndex + 1).padStart(2,'0')}</figcaption></figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => setActiveIndex((activeIndex + 1) % gallery.length)} aria-label="下一张图片">→</button>
        </div>
      )}
    </>
  );
}
