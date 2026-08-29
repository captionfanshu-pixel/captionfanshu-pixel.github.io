import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../projects';

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
            <small>OPERATION DESIGN</small>
            <h2>从项目背景出发，<br />找到设计的<br />核心问题。</h2>
            <p>{project.summary}</p>
          </div>
          <div className="problem-solution">
            <article><span>PROBLEM / 问题</span><h3>设计挑战</h3><p>{project.challenge}</p></article>
            <article><span>SOLUTION / 解法</span><h3>设计方案</h3><p>{project.approach}</p></article>
          </div>
        </div>
      </section>

      <section className="manual-objectives" data-reveal>
        <div className="chapter-label"><span>02 / 设计目标</span><b>DESIGN OBJECTIVES</b></div>
        <div className="objective-intro">
          <div><small>DESIGN DIRECTION</small><h2>明确目标，建立统一且有记忆点的视觉表达。</h2></div>
          <p>围绕品牌识别、内容传播与实际应用三个维度展开，让设计兼具视觉吸引力、信息效率与延展能力。</p>
        </div>
        <div className="objective-grid">
          <article><b>01</b><span>核心目标一</span><h3>强化视觉识别</h3><p>建立清晰的核心符号与色彩记忆，让项目在不同媒介中保持一致。</p></article>
          <article><b>02</b><span>核心目标二</span><h3>提升传播效率</h3><p>优化内容层级和阅读路径，让受众快速理解项目主题与主要卖点。</p></article>
          <article><b>03</b><span>核心目标三</span><h3>支持场景延展</h3><p>形成可持续应用的视觉系统，适配线上、线下及后续衍生内容。</p></article>
        </div>
        <div className="objective-outcome"><span>FINAL OUTCOME / 设计成果</span><p>{project.outcome}</p></div>
      </section>

      <section className="manual-visual-showcase" data-reveal>
        <div className="chapter-label"><span>03 / 视觉展示</span><b>VISUAL SHOWCASE</b></div>
        <div className="showcase-hero-placeholder">
          <span>KEY VISUAL</span><b>主视觉图片待补充</b><small>IMAGE PLACEHOLDER / 16:9</small>
        </div>
        <div className="color-system">
          <div><small>COLOR COLLECTION</small><h2>项目视觉配色</h2></div>
          <div className="color-swatches" aria-label="项目配色">
            <span className="swatch-dark"><b>#09090B</b><small>INK</small></span>
            <span className="swatch-primary"><b>{project.color.toUpperCase()}</b><small>PRIMARY</small></span>
            <span className="swatch-mid"><b>#8E8E92</b><small>NEUTRAL</small></span>
            <span className="swatch-light"><b>#F2F0E9</b><small>PAPER</small></span>
          </div>
        </div>
      </section>

      <section className="manual-detail-showcase" data-reveal>
        <div className="chapter-label"><span>04 / 细节展示</span><b>DETAIL SHOWCASE</b></div>
        <div className="detail-placeholder-grid">
          <div className="detail-placeholder detail-placeholder-wide"><span>DETAIL 01</span><b>横版细节图待补充</b></div>
          <div className="detail-placeholder detail-placeholder-tall"><span>DETAIL 02</span><b>竖版细节图待补充</b></div>
          <div className="detail-placeholder detail-placeholder-tall"><span>DETAIL 03</span><b>竖版细节图待补充</b></div>
          <div className="detail-placeholder"><span>DETAIL 04</span><b>局部细节图待补充</b></div>
          <div className="detail-placeholder"><span>DETAIL 05</span><b>局部细节图待补充</b></div>
          <div className="detail-placeholder"><span>DETAIL 06</span><b>局部细节图待补充</b></div>
        </div>
      </section>

      <section className="next-game" data-reveal>
        <div><p>PROJECT COMPLETE / NEXT CASE</p><h2>继续浏览<br />下一个作品</h2></div>
        <Link href={`/work/${next.slug}`} style={{ '--next-color': next.color } as React.CSSProperties}>
          <div className="next-cart"><img src={next.image} alt="" /><span>{next.id}</span></div>
          <div><strong>{next.title}</strong><span>{next.english}</span></div>
          <b>VIEW →</b>
        </Link>
      </section>
    </main>
  );
}

