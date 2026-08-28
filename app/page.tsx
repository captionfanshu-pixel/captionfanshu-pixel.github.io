'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { featuredProjects, type Project } from './projects';

const fanPositions = [
  { x: 'clamp(-340px, -27vw, -210px)', y: 'clamp(-150px, -12vw, -92px)', r: '-8deg' },
  { x: 'clamp(255px, 27vw, 340px)', y: 'clamp(145px, 14vw, 190px)', r: '20deg' },
  { x: 'clamp(255px, 27vw, 340px)', y: 'clamp(-150px, -12vw, -92px)', r: '16deg' },
  { x: 'clamp(-340px, -28vw, -220px)', y: 'clamp(145px, 14vw, 190px)', r: '-26deg' },
];

const cartridgeImages = [
  '/cartridges/ip.webp',
  '/cartridges/practice.webp',
  '/cartridges/linlee.webp',
  '/cartridges/ldcx.webp',
];

const cartridgeGlows = ['#f3a46f', '#63d8f4', '#8bea68', '#ff646b'];

const cartridgeScreenImages = [
  '/screen-composites/orange.webp',
  '/screen-composites/blue.webp',
  '/screen-composites/green.webp',
  '/screen-composites/red.webp',
];

const workPlaceholders = [
  { id: '01', key: 'work-01', title: 'PROJECT NAME 01', category: 'VISUAL DESIGN', year: '2024—2025', color: '#b8ff49' },
  { id: '02', key: 'work-02', title: 'PROJECT NAME 02', category: 'BRAND DESIGN', year: '2024—2025', color: '#63d8f4' },
  { id: '03', key: 'work-03', title: 'PROJECT NAME 03', category: 'IP DESIGN', year: '2024—2025', color: '#ff6f91' },
  { id: '04', key: 'work-04', title: 'PROJECT NAME 04', category: '3D VISUAL', year: '2024—2025', color: '#f3a46f' },
  { id: '05', key: 'work-05', title: 'PROJECT NAME 05', category: 'EXPERIMENT', year: '2024—2025', color: '#8c77ff' },
];

const dailyPracticeCards = [
  { id: '01', title: 'DAILY 01', image: '/daily/01.png', color: '#70cf69', lift: '18px', rotate: '-6deg' },
  { id: '02', title: 'DAILY 02', image: '/daily/02.png', color: '#ef91bf', lift: '2px', rotate: '-3deg' },
  { id: '03', title: 'DAILY 03', image: '/daily/03.png', color: '#76bde7', lift: '-8px', rotate: '3deg' },
  { id: '04', title: 'DAILY 04', image: '/daily/04.png', color: '#7bc9ca', lift: '7px', rotate: '-2deg' },
  { id: '05', title: 'DAILY 05', image: '/daily/05.png', color: '#66a9d5', lift: '-2px', rotate: '5deg' },
  { id: '06', title: 'DAILY 06', image: '/daily/06.png', color: '#e9bd50', lift: '20px', rotate: '7deg' },
];

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const [fanOpen, setFanOpen] = useState(false);
  const [isChinese, setIsChinese] = useState(false);
  const [archiveActive, setArchiveActive] = useState(workPlaceholders[0].key);
  const [dailyActive, setDailyActive] = useState(2);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const screenLoadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCartridgeIndex = active ? featuredProjects.findIndex((project) => project.id === active.id) : -1;
  const activeScreenImage = activeCartridgeIndex >= 0 ? cartridgeScreenImages[activeCartridgeIndex] : null;

  const loadProject = useCallback((project: Project) => {
    if (screenLoadTimer.current) clearTimeout(screenLoadTimer.current);
    setActive(project);
    setIsScreenLoading(true);
    screenLoadTimer.current = setTimeout(() => {
      setIsScreenLoading(false);
      screenLoadTimer.current = null;
    }, 760);
  }, []);

  const moveSelection = useCallback((direction: number) => {
    const currentIndex = active ? featuredProjects.findIndex((item) => item.id === active.id) : -1;
    const nextIndex = (currentIndex + direction + featuredProjects.length) % featuredProjects.length;
    loadProject(featuredProjects[nextIndex]);
  }, [active, loadProject]);

  const revealNearbyCartridges = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const heroElement = event.currentTarget;
    const consoleElement = heroElement.querySelector<HTMLElement>('.console-stage');
    if (!consoleElement) return;
    const heroBounds = heroElement.getBoundingClientRect();
    const bounds = consoleElement.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const followX = Math.max(-1, Math.min(1, (event.clientX - (heroBounds.left + heroBounds.width / 2)) / (heroBounds.width / 2)));
    const followY = Math.max(-1, Math.min(1, (event.clientY - (heroBounds.top + heroBounds.height / 2)) / (heroBounds.height / 2)));

    heroElement.style.setProperty('--follow-x', `${followX * 14}px`);
    heroElement.style.setProperty('--follow-y', `${followY * 10}px`);
    heroElement.style.setProperty('--follow-rotate-x', `${followY * -2.4}deg`);
    heroElement.style.setProperty('--follow-rotate-y', `${followX * 3.2}deg`);
    heroElement.classList.add('is-pointer-tracking');

    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    setFanOpen(distance < Math.max(520, bounds.width * 1.25));
  };

  const resetConsoleFollow = (event: PointerEvent<HTMLElement>) => {
    const heroElement = event.currentTarget;
    heroElement.style.setProperty('--follow-x', '0px');
    heroElement.style.setProperty('--follow-y', '0px');
    heroElement.style.setProperty('--follow-rotate-x', '0deg');
    heroElement.style.setProperty('--follow-rotate-y', '0deg');
    heroElement.classList.remove('is-pointer-tracking');
    setFanOpen(false);
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveSelection(-1);
      if (event.key === 'ArrowRight') moveSelection(1);
      if (event.key === 'Enter' && active) window.location.href = `/work/${active.slug}`;
      if (event.key.toLowerCase() === 'b') setActive(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, moveSelection]);

  useEffect(() => {
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  }, [isChinese]);

  useEffect(() => () => {
    if (screenLoadTimer.current) clearTimeout(screenLoadTimer.current);
  }, []);

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="杨婷作品集首页">
          <span className="nav-brand-name">WUMI</span>
          <span className="nav-brand-dot" aria-hidden="true" />
        </a>
        <div className="nav-links">
          <a href="#top">{isChinese ? '首页' : 'Home'}</a>
          <a href="#work">{isChinese ? '作品' : 'Work'}</a>
          <a href="#gallery">{isChinese ? '图集' : 'Gallery'}</a>
          <a href="#about">{isChinese ? '关于' : 'About'}</a>
          <a href="#contact">{isChinese ? '联系' : 'Contact'}</a>
        </div>
        <button
          className="nav-language"
          type="button"
          onClick={() => setIsChinese((current) => !current)}
          aria-label={isChinese ? 'Switch to English' : '翻译成中文'}
          aria-pressed={isChinese}
        >
          {isChinese ? 'EN' : '中'}
        </button>
      </nav>

      <section
        className={`hero ${fanOpen ? 'is-fan-open' : ''}`}
        id="top"
        onPointerMove={revealNearbyCartridges}
        onPointerLeave={resetConsoleFollow}
        onFocusCapture={() => setFanOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFanOpen(false);
        }}
      >
        <div className="hero-backdrop-word" aria-hidden="true">PORTFOLIO</div>
        <div className={`hero-cartridge-fan ${fanOpen ? 'is-open' : ''}`} aria-label="靠近游戏机后出现的项目卡带">
          {featuredProjects.map((project, index) => (
            <button
              key={project.id}
              className={`fan-cartridge ${active?.id === project.id ? 'is-active' : ''}`}
              style={{
                '--cart-color': project.color,
                '--fan-x': fanPositions[index].x,
                '--fan-y': fanPositions[index].y,
                '--fan-r': fanPositions[index].r,
                '--fan-delay': `${index * 55}ms`,
                '--cart-glow': cartridgeGlows[index],
              } as React.CSSProperties}
              type="button"
              onClick={() => loadProject(project)}
              aria-label={`载入项目：${project.title}`}
              aria-pressed={active?.id === project.id}
            >
              <img className="fan-art" src={cartridgeImages[index]} alt="" />
            </button>
          ))}
        </div>

        <div className="console-stage" aria-label="互动作品游戏机" data-reveal="scale">
          <div className="stage-glow" /><div className="console-shadow" />
          <div className={`console-render-wrap ${active ? 'has-project' : ''}`}>
            <img
              className="console-render"
              src={isScreenLoading ? '/console-loading.webp' : '/console-wumi.webp'}
              alt={isScreenLoading ? 'WUMI 掌上游戏机正在载入项目' : 'WUMI 紫色掌上游戏机'}
            />
            {active && !isScreenLoading && (
              <div className="render-screen-overlay" key={active.id}>
                <a className="render-project" href={`/work/${active.slug}`} aria-label={`进入${active.title}项目`}>
                  <img src={activeScreenImage ?? active.image} alt={`${active.title}项目预览`} />
                </a>
              </div>
            )}
            <button className="render-prev" type="button" onClick={() => moveSelection(-1)} aria-label="上一个项目">PREV</button>
            <button className="render-next" type="button" onClick={() => moveSelection(1)} aria-label="下一个项目">NEXT</button>
            <button className="render-reset" type="button" onClick={() => setActive(null)} aria-label="返回待机画面">RESET</button>
          </div>
        </div>

      </section>

      <section className="project-index" id="work" aria-label="项目分类" data-reveal>
        <div className="work-placeholder-heading">
          <span>01 / WORK PROJECT</span>
          <span>Welcome to view my portfolio.</span>
        </div>
        <div className="project-rows work-placeholder-list">
          {workPlaceholders.map((project) => {
            const isOpen = archiveActive === project.key;
            return (
              <article
                className={`project-row work-placeholder-row ${isOpen ? 'is-open' : ''}`}
                key={project.key}
                style={{ '--project-row-color': project.color } as React.CSSProperties}
                onMouseEnter={() => setArchiveActive(project.key)}
                onFocusCapture={() => setArchiveActive(project.key)}
              >
                <button className="project-row-trigger" type="button" onClick={() => setArchiveActive(project.key)} aria-expanded={isOpen}>
                  <span>{project.id}</span>
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                  <em>{project.year}</em>
                  <i aria-hidden="true">↗</i>
                </button>
                <div className="project-row-detail">
                  <div>
                    <div>
                      <div className="project-row-image work-placeholder-image" aria-label={`${project.title}图片占位`}>
                        <b>{project.id}</b>
                        <span className="placeholder-status">WAITING FOR CONTENT <b>→</b></span>
                      </div>
                      <div className="project-row-copy work-placeholder-copy">
                        <p>项目名称、封面图片与详细内容将在素材确认后替换。</p>
                        <dl><div><dt>STATUS</dt><dd>CONTENT PENDING</dd></div><div><dt>TYPE</dt><dd>{project.category}</dd></div></dl>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title" data-reveal>
        <div className="section-index"><span>02 / DAILY GALLERY</span><span>Welcome to view my portfolio.</span></div>
        <div className="gallery-heading">
          <div><p>VISUAL NOTES</p><h2 id="gallery-title">DAILY PRACTICE</h2></div>
          <span>modeling &amp; AI art. Hope you enjoy! More works to come stay tuned.</span>
        </div>
        <div className="daily-gallery-shell">
          <div className="daily-glass-panel" aria-hidden="true">
            <span>WUMI / DAILY ARCHIVE</span>
            <b>CLICK A CARD TO PREVIEW</b>
            <i>06</i>
          </div>
          <div className="daily-card-stage" role="list" aria-label="日常练习卡片">
            {dailyPracticeCards.map((card, index) => (
              <button
                className={`daily-practice-card ${dailyActive === index ? 'is-active' : ''}`}
                key={card.id}
                type="button"
                role="listitem"
                aria-pressed={dailyActive === index}
                aria-label={`弹出${card.title}`}
                onClick={() => setDailyActive(index)}
                style={{
                  '--daily-color': card.color,
                  '--daily-lift': card.lift,
                  '--daily-rotate': card.rotate,
                  '--daily-index': index,
                } as React.CSSProperties}
              >
                <img className="daily-card-art" src={card.image} alt={`${card.title} 练习作品`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title" data-reveal>
        <div className="about-index-heading">
          <span>03 / ABOUT PROFILE</span>
          <span>DESIGNER PROFILE — YANGTING / 2026</span>
        </div>
        <div className="about-profile-card">
          <div className="about-card-head">
            <div><b>PROFILE FILE</b><span>VISUAL DESIGNER</span></div>
            <strong>001</strong>
          </div>
          <div className="about-portrait-placeholder" role="img" aria-label="个人形象照片占位">
            <span>PORTRAIT</span>
            <b>IMAGE<br />PLACEHOLDER</b>
            <i>PHOTO TO BE ADDED</i>
          </div>
          <div className="about-identity">
            <h3>YANGTING <span>/ 杨婷</span></h3>
            <b>VISUAL DESIGNER</b>
            <p>BRAND VISUAL · IP COMMERCIAL DESIGN</p>
          </div>
          <div className="about-contact-placeholder">
            <div><span>LOCATION</span><b>GUANGZHOU / 广州</b></div>
            <div><span>EDUCATION</span><b>工业设计 / 2018—2022</b></div>
            <div><span>E-MAIL</span><b>310919644@qq.com</b></div>
            <div><span>WECHAT</span><b>18813893925</b></div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-title-row">
            <h2 id="about-title">ABOUT ME</h2>
          </div>
          <div className="about-intro-label"><span>个人简介</span><i /></div>
          <p className="about-placeholder-copy">具备品牌视觉设计与 IP 商业化项目经验，熟悉从创意概念、视觉策略到设计落地的完整流程。参与新消费品牌、正版 IP 联名、食玩盲盒及线下展陈等项目，能够结合品牌定位与用户需求进行视觉表达与方案输出。擅长品牌视觉体系搭建、电商视觉设计、IP 角色延展及商业场景应用，具备较强的视觉整合能力与项目推进能力，能够在团队协作中高效完成设计方案落地。</p>
          <div className="about-experience-block">
            <h3>工作经历</h3>
            <div className="about-timeline">
              <article>
                <div className="about-job"><div className="about-job-heading"><h4>广州灵动创想科技有限公司</h4><b>平面设计师</b></div><p className="about-job-summary">负责食玩项目线上线下视觉、产品详情与宣传物料设计，并参与展会快闪、终端陈列及包装印刷落地，持续维护 IP 衍生产品视觉一致性。</p></div>
                <time>2025.12 — 2026.05</time>
              </article>
              <article>
                <div className="about-job"><div className="about-job-heading"><h4>广州昌邻餐饮管理有限公司</h4><b>平面设计师</b></div><p className="about-job-summary">负责品牌新品上市与日常营销视觉、海报及 Banner 等物料设计，参与周边包装从概念到印刷落地，并持续维护品牌视觉一致性。</p></div>
                <time>2023.03 — 2025.06</time>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
        <h2 id="contact-title">THANK <span>YOU</span></h2>
        <p className="contact-message">感谢浏览我的作品集。<br />无论是项目合作、全职机会，还是一次设计交流，都期待与你取得联系。</p>
        <div className="contact-card-grid">
          <a className="contact-method-card" href="mailto:310919644@qq.com" aria-label="发送邮件给杨婷">
            <i className="contact-method-icon" aria-hidden="true">✉</i>
            <strong>Email</strong>
            <span>310919644@qq.com</span>
          </a>
          <div className="contact-method-card">
            <i className="contact-method-icon contact-method-wechat" aria-hidden="true">••</i>
            <strong>WeChat</strong>
            <span>188 1389 3925</span>
          </div>
          <a className="contact-method-card" href="tel:19124373925" aria-label="拨打杨婷的电话">
            <i className="contact-method-icon" aria-hidden="true">☎</i>
            <strong>Phone</strong>
            <span>191 2437 3925</span>
          </a>
        </div>
      </section>

      <footer><span>© 2026 YANG TING · TYPEFACE MISANS</span><a href="#top">BACK TO START ↑</a><span>GAME SAVED</span></footer>
    </main>
  );
}

