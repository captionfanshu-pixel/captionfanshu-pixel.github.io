import type { Metadata } from 'next';
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

  return (
    <main className="daily-detail-page">
      <img className="daily-detail-image" src={project.image} alt={`${project.title}作品展示`} />
    </main>
  );
}

