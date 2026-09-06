import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dailyPracticeCards } from '../../daily-projects';

export function generateStaticParams() {
  return dailyPracticeCards.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = dailyPracticeCards.find((item) => item.id === id);
  if (!project) return { title: '作品未找到｜杨婷作品集' };
  return {
    title: `${project.title}｜杨婷作品集`,
    description: `${project.title} 日常视觉练习作品展示`,
  };
}

export default async function DailyProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = dailyPracticeCards.find((item) => item.id === id);
  if (!project) notFound();
  const gallery = project.gallery ?? [project.image];

  return (
    <main className="daily-detail-page" style={{ '--daily-color': project.color } as React.CSSProperties}>
      <div className="daily-detail-shell">
        <nav className="daily-detail-nav">
          <Link href="/#gallery">← WUMI / DAILY ARCHIVE</Link>
          <span>{project.id} / {String(dailyPracticeCards.length).padStart(2, '0')}</span>
        </nav>
        <section className="daily-detail-gallery" aria-label={`${project.title}图片展示`}>
          {gallery.map((image, index) => (
            <figure key={image}>
              <img
                src={image}
                alt={`${project.title}作品图片 ${String(index + 1).padStart(2, '0')}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
          ))}
        </section>
      </div>
    </main>
  );
}

