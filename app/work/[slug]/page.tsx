import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../projects';
import ProjectGallery from './project-gallery';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: '项目未找到｜杨婷作品集' };
  return {
    title: `${project.title}｜杨婷作品集`,
    description: project.summary,
    openGraph: { title: `${project.title}｜杨婷作品集`, description: project.summary, images: [{ url: project.image }] },
    twitter: { card: 'summary_large_image', title: `${project.title}｜杨婷作品集`, description: project.summary, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="manual-page" style={{ '--project-color': project.color } as React.CSSProperties}>
      <nav className="detail-nav">
        <Link href="/#work">← EJECT / 返回卡带库</Link>
        <span>{project.id} / 06</span>
        <Link href="/#contact">CONTACT</Link>
      </nav>

      <header className="manual-hero" data-reveal>
        <div className="manual-title">
          <p>GAME MANUAL / {project.category}</p>
          <span>{project.id}</span>
          <h1>{project.title}</h1>
          <h2>{project.english}</h2>
          <p className="manual-summary">{project.summary}</p>
          <a href="#chapter-one">START READING ↓</a>
        </div>
        <div className="manual-cover">
          <img src={project.image} alt={`${project.title}主视觉`} />
          <span>ORIGINAL GAME ARTWORK</span>
        </div>
      </header>

      <section className="meta-strip" aria-label="项目元数据" data-reveal>
        <div><small>RELEASE</small><b>{project.year}</b></div>
        <div><small>CATEGORY</small><b>{project.category}</b></div>
        <div><small>PLAYER ROLE</small><b>{project.role}</b></div>
        <div><small>STATUS</small><b>COMPLETED ●</b></div>
      </section>

      <section className="manual-chapter" id="chapter-one" data-reveal>
        <div className="chapter-label"><span>CHAPTER 01</span><b>MISSION BRIEF</b></div>
        <div className="chapter-grid">
          <h2>从需求出发，<br />建立完整视觉关卡。</h2>
          <div className="story-blocks">
            <article><span>01 / CHALLENGE</span><h3>设计挑战</h3><p>{project.challenge}</p></article>
            <article><span>02 / APPROACH</span><h3>创意方案</h3><p>{project.approach}</p></article>
            <article><span>03 / OUTCOME</span><h3>最终成果</h3><p>{project.outcome}</p></article>
          </div>
        </div>
      </section>

      <section className="visual-chapter" data-reveal>
        <div className="chapter-label"><span>CHAPTER 02</span><b>VISUAL WALKTHROUGH</b></div>
        <ProjectGallery gallery={project.gallery} projectId={project.id} projectTitle={project.title} />
      </section>

      <section className="next-game" data-reveal>
        <div><p>GAME COMPLETE / AUTO SAVE</p><h2>弹出当前卡带，<br />载入下一款游戏。</h2></div>
        <Link href={`/work/${next.slug}`} style={{ '--next-color': next.color } as React.CSSProperties}>
          <div className="next-cart"><img src={next.image} alt="" /><span>{next.id}</span></div>
          <div><small>NEXT GAME</small><strong>{next.title}</strong><span>{next.subtitle}</span></div>
          <b>LOAD →</b>
        </Link>
      </section>
    </main>
  );
}
