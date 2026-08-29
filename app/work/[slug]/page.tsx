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
        <span>{project.id} / {String(projects.length).padStart(2, '0')}</span>
        <Link href="/#contact">CONTACT</Link>
      </nav>

      <header className="manual-hero" data-reveal>
        <div className="manual-title">
          <div className="manual-eyebrow">
            <p>PORTFOLIO CASE / {project.category}</p>
            <span>{project.id} · {project.year}</span>
          </div>
          <div className="manual-heading-row">
            <div>
              <h1>{project.title}</h1>
              <h2>{project.english}</h2>
            </div>
            <div className="manual-intro-copy">
              <small>PROJECT OVERVIEW</small>
              <p className="manual-summary">{project.summary}</p>
              <a href="#chapter-one">VIEW CASE STUDY ↓</a>
            </div>
          </div>
        </div>
        <div className="manual-cover">
          <img src={project.image} alt={`${project.title}主视觉`} />
          <span>KEY VISUAL / {project.english}</span>
        </div>
      </header>

      <section className="meta-strip" aria-label="项目元数据" data-reveal>
        <div><small>RELEASE</small><b>{project.year}</b></div>
        <div><small>CATEGORY</small><b>{project.category}</b></div>
        <div><small>PLAYER ROLE</small><b>{project.role}</b></div>
        <div><small>STATUS</small><b>COMPLETED ●</b></div>
      </section>

      <section className="manual-chapter" id="chapter-one" data-reveal>
        <div className="chapter-label"><span>01 / 设计背景</span><b>DESIGN BACKGROUND</b></div>
        <div className="chapter-grid">
          <div className="chapter-heading">
            <small>OPERATION DESIGN</small>
            <h2>从问题到方案，<br />建立完整视觉叙事。</h2>
            <p>围绕项目需求梳理挑战、设计思路与成果，让读者快速理解作品背后的判断与方法。</p>
          </div>
          <div className="story-blocks">
            <article><span>01 / CHALLENGE</span><h3>设计挑战</h3><p>{project.challenge}</p></article>
            <article><span>02 / APPROACH</span><h3>创意方案</h3><p>{project.approach}</p></article>
            <article><span>03 / OUTCOME</span><h3>最终成果</h3><p>{project.outcome}</p></article>
          </div>
        </div>
      </section>

      <section className="manual-color-section" data-reveal>
        <div className="chapter-label"><span>02 / 视觉系统</span><b>VISUAL SYSTEM</b></div>
        <div className="manual-color-grid">
          <div>
            <small>COLOR COLLECTION</small>
            <h2>用主色建立<br />项目视觉记忆。</h2>
            <p>以项目主色为视觉锚点，搭配深色与暖白中性色，让内容、图片与信息层级保持统一。</p>
          </div>
          <div className="color-swatches" aria-label="项目配色">
            <span className="swatch-primary"><b>{project.color.toUpperCase()}</b><small>PRIMARY</small></span>
            <span className="swatch-dark"><b>#09090B</b><small>INK</small></span>
            <span className="swatch-mid"><b>#8E8E92</b><small>NEUTRAL</small></span>
            <span className="swatch-light"><b>#F2F0E9</b><small>PAPER</small></span>
          </div>
        </div>
      </section>

      <section className="visual-chapter" data-reveal>
        <div className="chapter-label"><span>03 / 细节展示</span><b>VISUAL WALKTHROUGH</b></div>
        <ProjectGallery gallery={project.gallery} projectId={project.id} projectTitle={project.title} />
      </section>

      <section className="next-game" data-reveal>
        <div><p>PROJECT COMPLETE / NEXT CASE</p><h2>继续浏览<br />下一项作品。</h2></div>
        <Link href={`/work/${next.slug}`} style={{ '--next-color': next.color } as React.CSSProperties}>
          <div className="next-cart"><img src={next.image} alt="" /><span>{next.id}</span></div>
          <div><small>NEXT PROJECT</small><strong>{next.title}</strong><span>{next.subtitle}</span></div>
          <b>VIEW →</b>
        </Link>
      </section>
    </main>
  );
}

