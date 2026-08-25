'use client';

import { useEffect } from 'react';

export default function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      root.style.setProperty('--scroll-progress', String(progress));
    };

    root.classList.add('effects-ready');
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    let observer: IntersectionObserver | null = null;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      targets.forEach((target) => observer?.observe(target));
    }

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      observer?.disconnect();
      root.classList.remove('effects-ready');
    };
  }, []);

  return <div className="site-effects" aria-hidden="true"><span className="scroll-progress" /></div>;
}
