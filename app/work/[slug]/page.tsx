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
  const next = project.slug === 'spring-duck'
    ? projects.find((item) => item.slug === 'weilong') ?? projects[(index + 1) % projects.length]
    : projects[(index + 1) % projects.length];
  const objectiveCards = project.objectives ?? [
    { title: '强化视觉识别', description: '建立清晰的核心符号与色彩记忆，让项目在不同媒介中保持一致。' },
    { title: '提升传播效率', description: '优化内容层级和阅读路径，让受众快速理解项目主题与主要卖点。' },
    { title: '支持场景延展', description: '形成可持续应用的视觉系统，适配线上、线下及后续衍生内容。' },
  ];
  const palette = project.palette ?? [
    { hex: '#09090B', label: 'INK', text: 'light' as const },
    { hex: project.color.toUpperCase(), label: 'PRIMARY', text: 'dark' as const },
    { hex: '#8E8E92', label: 'NEUTRAL', text: 'light' as const },
    { hex: '#F2F0E9', label: 'PAPER', text: 'dark' as const },
  ];

  return (
    <main className={`manual-page manual-page--${project.slug}`} style={{ '--project-color': project.color } as React.CSSProperties}>
      <nav className="detail-nav">
        <Link href="/#work">← 返回上一级</Link>
        <span>{project.id} / {String(projects.length).padStart(2, '0')}</span>
        <Link href="/#contact">CONTACT</Link>
      </nav>

      <header className="manual-hero" data-reveal>
        <div className="manual-title">
          <div className="manual-eyebrow">
            <p>PORTFOLIO CASE / {project.category}</p>
            <span>YANGTING / {project.year}</span>
          </div>
          <div className="manual-heading-row">
            <div className="manual-primary-copy">
              <h1>{project.title}</h1>
              <h2>{project.english}</h2>
              <div className="manual-intro-copy">
                <small>PROJECT OVERVIEW</small>
                <p className="manual-summary">{project.summary}</p>
              </div>
              <div className="manual-hero-tags" aria-label="项目关键词">
                <span>{project.category}</span>
                <span>{project.role.split(' / ')[0]}</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="manual-media-column">
              <figure className="manual-cover-card">
                <img className="manual-hero-image" src={project.image} alt={`${project.title}主视觉`} />
              </figure>
            </div>
          </div>
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
            <h2>{project.backgroundTitle ?? <>从项目背景出发，<br />找到设计的核心问题。</>}</h2>
            <p>{project.summary}</p>
          </div>
          <div className="problem-solution">
            <article><span>PROBLEM / 问题</span><h3>设计挑战</h3><p>{project.challenge}</p></article>
            <article><span>SOLUTION / 解法</span><h3>设计方案</h3><p>{project.approach}</p></article>
          </div>
        </div>
      </section>

      {!project.hideObjectives && <section className="manual-objectives" data-reveal>
        <div className="chapter-label"><span>02 / 设计目标</span><b>DESIGN OBJECTIVES</b></div>
        <div className="objective-intro">
          <div><h2>{project.objectiveTitle ?? '明确目标，建立统一且有记忆点的视觉表达。'}</h2></div>
          <p>{project.objectiveSummary ?? '围绕品牌识别、内容传播与实际应用三个维度展开，让设计兼具视觉吸引力、信息效率与延展能力。'}</p>
        </div>
        <div className="objective-grid">
          {objectiveCards.map((objective, objectiveIndex) => (
            <article key={objective.title}>
              <b>{String(objectiveIndex + 1).padStart(2, '0')}</b>
              <span>核心目标{['一', '二', '三'][objectiveIndex] ?? objectiveIndex + 1}</span>
              <h3>{objective.title}</h3>
              <p>{objective.description}</p>
            </article>
          ))}
        </div>
        <div className="objective-outcome"><span>FINAL OUTCOME / 设计成果</span><p>{project.outcome}</p></div>
      </section>}

      <section className="manual-visual-showcase" data-reveal>
        <div className="chapter-label"><span>03 / 视觉展示</span><b>VISUAL SHOWCASE</b></div>
        <figure className="showcase-hero-image">
          <img src={project.image} alt={`${project.title}主视觉展示`} />
        </figure>
        <div className="color-system">
          <div><small>COLOR COLLECTION</small><h2>项目视觉配色</h2></div>
          <div className="color-swatches" aria-label="项目配色">
            {palette.map((swatch) => (
              <span key={swatch.hex} style={{ backgroundColor: swatch.hex, color: swatch.text === 'light' ? '#fff' : '#111' }}>
                <b>{swatch.hex.toUpperCase()}</b><small>{swatch.label}</small>
              </span>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && <section className="manual-detail-showcase">
        <div className="chapter-label"><span>04 / 细节展示</span><b>DETAIL SHOWCASE</b></div>
        {project.video && (
          <div className="project-video-frame">
            <video controls playsInline preload="metadata" poster={project.image}>
              <source src={project.video} type="video/mp4" />
              你的浏览器暂不支持视频播放。
            </video>
          </div>
        )}
        <ProjectGallery gallery={project.gallery} projectId={project.id} projectTitle={project.title} />
      </section>}

      <section className="next-game" data-reveal>
        <div><p>PROJECT COMPLETE / NEXT CASE</p><h2>继续浏览<br />下一个作品</h2></div>
        <Link href={`/work/${next.slug}/`} style={{ '--next-color': next.color } as React.CSSProperties}>
          <div className="next-cart"><img src={next.image} alt="" /><span>{next.id}</span></div>
          <div><strong>{next.title}</strong><span>{next.english}</span></div>
          <b>VIEW →</b>
        </Link>
      </section>
    </main>
  );
}
