'use client';

import { useCallback, useEffect, useState, type PointerEvent } from 'react';
import { featuredProjects, projects, type Project } from './projects';

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

const projectGroups = [
  { id: '01', title: '品牌与营销视觉', english: 'BRAND / CAMPAIGN', projects: projects.slice(0, 3) },
  { id: '02', title: '商业 IP 与空间', english: 'COMMERCIAL IP', projects: projects.slice(3, 4) },
  { id: '03', title: '原创角色世界', english: 'ORIGINAL IP', projects: projects.slice(4) },
];

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const [fanOpen, setFanOpen] = useState(false);
  const [isChinese, setIsChinese] = useState(false);
  const [archiveActive, setArchiveActive] = useState(projects[0].slug);
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
          <span className="nav-monogram">YT</span>
          <span className="nav-role">{isChinese ? '视觉设计' : 'VISUAL'}</span>
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

      <section className="project-index" id="work" aria-labelledby="project-index-title" data-reveal>
        <div className="section-index"><span>02 / PROJECT ARCHIVE</span><span>HOVER TO PREVIEW — 2024/2025</span></div>
        <div className="project-index-intro">
          <p>SELECTED WORKS</p>
          <h2 id="project-index-title">按创作类型，<br />浏览全部项目。</h2>
          <span>将鼠标停在项目上即可展开详情；点击绿色按钮进入完整项目页面。</span>
        </div>

        <div className="project-groups">
          {projectGroups.map((group) => (
            <div className="project-group" key={group.id}>
              <div className="project-group-heading"><span>{group.id}</span><h3>{group.title}</h3><small>{group.english}</small></div>
              <div className="project-rows">
                {group.projects.map((project) => {
                  const isOpen = archiveActive === project.slug;
                  return (
                    <article
                      className={`project-row ${isOpen ? 'is-open' : ''}`}
                      key={project.id}
                      style={{ '--project-row-color': project.color } as React.CSSProperties}
                      onMouseEnter={() => setArchiveActive(project.slug)}
                      onFocusCapture={() => setArchiveActive(project.slug)}
                    >
                      <button className="project-row-trigger" type="button" onClick={() => setArchiveActive(project.slug)} aria-expanded={isOpen}>
                        <span>{project.id}</span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                        <em>{project.year}</em>
                        <i aria-hidden="true">↗</i>
                      </button>
                      <div className="project-row-detail">
                        <div>
                          <a className="project-row-image" href={`/work/${project.slug}`} aria-label={`查看${project.title}完整项目`}>
                            <img src={project.image} alt={`${project.title}项目预览`} />
                            <span>{project.english}</span>
                          </a>
                          <div className="project-row-copy">
                            <p>{project.summary}</p>
                            <dl><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>TYPE</dt><dd>{project.subtitle}</dd></div></dl>
                            <a href={`/work/${project.slug}`}>VIEW PROJECT <b>→</b></a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title" data-reveal>
        <div className="section-index"><span>03 / VISUAL GALLERY</span><span>SELECTED FRAMES — 2024/2025</span></div>
        <div className="gallery-heading">
          <div><p>GALLERY</p><h2 id="gallery-title">视觉作品一览</h2></div>
          <span>从品牌活动、IP 衍生到原创角色设计，快速浏览四个代表项目。</span>
        </div>
        <div className="gallery-grid">
          {featuredProjects.map((project, index) => (
            <a
              className="gallery-card"
              href={`/work/${project.slug}`}
              key={project.id}
              style={{ '--gallery-color': project.color } as React.CSSProperties}
              aria-label={`查看${project.title}项目`}
            >
              <img src={project.image} alt={`${project.title}作品画面`} />
              <span><small>0{index + 1}</small><b>{project.title}</b><i>↗</i></span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title" data-reveal>
        <div className="profile-card">
          <div className="profile-head"><span>PLAYER PROFILE</span><span>01</span></div>
          <div className="profile-main">
            <div className="avatar"><strong>杨</strong><i>ONLINE</i></div>
            <div><p>VISUAL DESIGNER</p><h2 id="about-title">杨婷</h2><span>工业设计背景 / 视觉设计实践</span></div>
          </div>
          <div className="stat-list">
            <div><span>BRAND VISUAL</span><i><b style={{width:'92%'}} /></i><em>92</em></div>
            <div><span>IP DESIGN</span><i><b style={{width:'88%'}} /></i><em>88</em></div>
            <div><span>3D VISUAL</span><i><b style={{width:'84%'}} /></i><em>84</em></div>
            <div><span>CAMPAIGN</span><i><b style={{width:'90%'}} /></i><em>90</em></div>
          </div>
        </div>
        <div className="about-copy">
          <p>ABOUT THE PLAYER</p>
          <h3>从品牌活动到原创 IP，<br />让视觉成为可进入的世界。</h3>
          <p className="about-body">拥有品牌营销、IP 衍生与空间视觉经验，能够独立完成从概念构思、主视觉到多触点落地的完整设计流程。关注角色、商品与消费场景之间的一致体验。</p>
          <div className="experience"><span>2025—2026</span><p><b>广州灵动创想科技有限公司</b>平面设计师</p></div>
          <div className="experience"><span>2023—2025</span><p><b>广州昌邻餐饮管理有限公司</b>平面设计师</p></div>
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

