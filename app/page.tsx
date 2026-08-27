'use client';

import { useCallback, useEffect, useState, type PointerEvent } from 'react';
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
  { id: '01', title: 'DAILY 01', color: '#4f907d', lift: '18px', rotate: '-6deg' },
  { id: '02', title: 'DAILY 02', color: '#7192f2', lift: '2px', rotate: '-3deg' },
  { id: '03', title: 'DAILY 03', color: '#ff724d', lift: '-8px', rotate: '3deg' },
  { id: '04', title: 'DAILY 04', color: '#a72e58', lift: '7px', rotate: '-2deg' },
  { id: '05', title: 'DAILY 05', color: '#d995ef', lift: '-2px', rotate: '5deg' },
  { id: '06', title: 'DAILY 06', color: '#d8e66f', lift: '20px', rotate: '7deg' },
];

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const [fanOpen, setFanOpen] = useState(false);
  const [isChinese, setIsChinese] = useState(false);
  const [archiveActive, setArchiveActive] = useState(workPlaceholders[0].key);
  const [dailyActive, setDailyActive] = useState(2);
  const activeCartridgeIndex = active ? featuredProjects.findIndex((project) => project.id === active.id) : -1;
  const activeScreenImage = activeCartridgeIndex >= 0 ? cartridgeScreenImages[activeCartridgeIndex] : null;

  const loadProject = useCallback((project: Project) => {
    setActive(project);
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
            <img className="console-render" src="/console-wumi.webp" alt="WUMI 紫色掌上游戏机" />
            {active && (
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
          <span>01 / WORK INDEX</span>
          <span>HOVER TO PREVIEW — CONTENT COMING SOON</span>
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
                        <span>IMAGE PLACEHOLDER</span>
                        <b>{project.id}</b>
                      </div>
                      <div className="project-row-copy work-placeholder-copy">
                        <p>项目名称、封面图片与详细内容将在素材确认后替换。</p>
                        <dl><div><dt>STATUS</dt><dd>CONTENT PENDING</dd></div><div><dt>TYPE</dt><dd>{project.category}</dd></div></dl>
                        <span className="placeholder-status">WAITING FOR CONTENT <b>→</b></span>
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
        <div className="section-index"><span>03 / DAILY GALLERY</span><span>06 PRACTICE CARDS — IMAGES COMING SOON</span></div>
        <div className="gallery-heading">
          <div><p>VISUAL NOTES</p><h2 id="gallery-title">some daily practice</h2></div>
          <span>点击任意卡片即可将它弹出。当前图片使用占位符，后续可直接替换为日常练习作品。</span>
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
                <span className="daily-placeholder">
                  <small>IMAGE PLACEHOLDER</small>
                  <b>{card.id}</b>
                  <i>ARTWORK TO BE ADDED</i>
                </span>
                <span className="daily-card-copy">
                  <small>DAILY PRACTICE / {card.id}</small>
                  <strong>{card.title}</strong>
                  <i aria-hidden="true">↗</i>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title" data-reveal>
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
            <h3>NAME <span>/ 姓名</span></h3>
            <b>VISUAL DESIGNER</b>
            <p>ROLE / SPECIALITY PLACEHOLDER</p>
          </div>
          <div className="about-contact-placeholder">
            <div><span>LOCATION</span><b>CITY / 城市</b></div>
            <div><span>EDUCATION</span><b>SCHOOL / MAJOR</b></div>
            <div><span>E-MAIL</span><b>EMAIL PLACEHOLDER</b></div>
            <div><span>SOCIAL</span><b>ACCOUNT PLACEHOLDER</b></div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-title-row">
            <h2 id="about-title">ABOUT ME</h2>
            <i aria-hidden="true">✦</i>
          </div>
          <div className="about-intro-label"><span>DESIGNER PROFILE</span><i /></div>
          <p className="about-placeholder-copy">个人简介内容将在资料确认后补充。这里将用于介绍设计背景、项目经验、擅长领域，以及个人的视觉表达方向与工作方式。</p>
          <div className="about-skill-tags" aria-label="专业能力占位">
            <span>SKILL 01</span><span>SKILL 02</span><span>SKILL 03</span>
            <span>SKILL 04</span><span>SKILL 05</span><span>SKILL 06</span>
          </div>
          <div className="about-experience-block">
            <h3><b>01</b> EXPERIENCE <i aria-hidden="true">✣</i></h3>
            <div className="about-timeline">
              <article>
                <time>20XX.XX — 20XX.XX</time>
                <div><h4>COMPANY NAME / 公司名称</h4><b>JOB TITLE · ROLE PLACEHOLDER</b><p>工作内容与项目经历将在资料确认后补充。</p></div>
              </article>
              <article>
                <time>20XX.XX — 20XX.XX</time>
                <div><h4>COMPANY NAME / 公司名称</h4><b>JOB TITLE · ROLE PLACEHOLDER</b><p>工作内容与项目经历将在资料确认后补充。</p></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
        <div className="contact-copy"><p>READY TO CONNECT?</p><h2 id="contact-title">添加我的<br /><span>FRIEND CODE</span></h2><small>期待新的工作机会与创意合作。</small></div>
        <div className="friend-card">
          <div className="friend-top"><span>PLAYER 01</span><i>● ONLINE</i></div>
          <div className="friend-name"><small>VISUAL DESIGNER</small><strong>杨 婷</strong><span>YANG TING</span></div>
          <div className="contact-list">
            <a href="mailto:310919644@qq.com"><span>EMAIL</span><b>310919644@qq.com</b></a>
            <a href="tel:19124373925"><span>PHONE</span><b>191 2437 3925</b></a>
            <div><span>WECHAT</span><b>188 1389 3925</b></div>
            <button type="button" disabled><span>RESUME</span><b>COMING SOON</b></button>
          </div>
          <div className="friend-footer"><span>NO. 3109 1964 4</span><span>PRESS START TO SAY HELLO</span></div>
        </div>
      </section>

      <footer><span>© 2026 YANG TING · TYPEFACE MISANS</span><a href="#top">BACK TO START ↑</a><span>GAME SAVED</span></footer>
    </main>
  );
}
