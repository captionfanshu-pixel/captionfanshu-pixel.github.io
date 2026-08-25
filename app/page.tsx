'use client';

import { useCallback, useEffect, useState, type PointerEvent } from 'react';
import { featuredProjects, projects, type Project } from './projects';

const fanPositions = [
  { x: 'clamp(-370px, -31vw, -230px)', y: 'clamp(-170px, -14vw, -110px)', r: '-9deg' },
  { x: 'clamp(230px, 31vw, 370px)', y: 'clamp(-170px, -14vw, -110px)', r: '9deg' },
  { x: 'clamp(-400px, -33vw, -245px)', y: 'clamp(120px, 14vw, 165px)', r: '7deg' },
  { x: 'clamp(245px, 33vw, 400px)', y: 'clamp(120px, 14vw, 160px)', r: '-7deg' },
];

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [fanOpen, setFanOpen] = useState(false);

  const loadProject = useCallback((project: Project) => {
    setActive(project);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 520);
  }, []);

  const moveSelection = useCallback((direction: number) => {
    const currentIndex = active ? featuredProjects.findIndex((item) => item.id === active.id) : -1;
    const nextIndex = (currentIndex + direction + featuredProjects.length) % featuredProjects.length;
    loadProject(featuredProjects[nextIndex]);
  }, [active, loadProject]);

  const revealNearbyCartridges = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const consoleElement = event.currentTarget.querySelector<HTMLElement>('.console-stage');
    if (!consoleElement) return;
    const bounds = consoleElement.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    setFanOpen(distance < Math.max(520, bounds.width * 1.25));
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveSelection(-1);
      if (event.key === 'ArrowRight') moveSelection(1);
      if (event.key === 'Enter' && active && !loading) window.location.href = `/work/${active.slug}`;
      if (event.key.toLowerCase() === 'b') setActive(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, loading, moveSelection]);

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="杨婷作品集首页"><span className="power-dot" />YANG TING / PORTFOLIO</a>
        <div className="nav-links"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a></div>
        <span className="nav-year">2023—2026</span>
      </nav>

      <section
        className={`hero ${fanOpen ? 'is-fan-open' : ''}`}
        id="top"
        onPointerMove={revealNearbyCartridges}
        onPointerLeave={() => setFanOpen(false)}
        onFocusCapture={() => setFanOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFanOpen(false);
        }}
      >
        <div className="hero-copy" data-reveal>
          <p className="pixel-kicker">VISUAL DESIGNER / PLAYER 01</p>
          <h1>选择一张卡带，<span>开始浏览我的作品。</span></h1>
        </div>

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
              } as React.CSSProperties}
              type="button"
              onClick={() => loadProject(project)}
              aria-label={`载入项目：${project.title}`}
              aria-pressed={active?.id === project.id}
            >
              <span className="fan-grip" />
              <span className="fan-cover"><img src={project.image} alt="" /></span>
              <span className="fan-meta"><small>{project.id}</small><strong>{project.title}</strong></span>
              <span className="fan-contacts"><i /><i /><i /><i /><i /></span>
            </button>
          ))}
        </div>

        <div className="console-stage" aria-label="互动作品游戏机" data-reveal="scale">
          <div className="stage-glow" /><div className="console-shadow" />
          <div className={`console ${active ? 'has-cartridge' : ''}`}>
            <div className="console-highlight" />
            <div className="cartridge-slot" aria-hidden="true" />
            {active && <div className="inserted-cartridge" key={active.id}><img src={active.image} alt="" /><span>{active.id}</span></div>}
            <div className="screen-bezel">
              <div className={`screen ${loading ? 'is-loading' : ''}`}>
                <div className="scanlines" />
                {loading ? (
                  <div className="loading-screen"><span>LOADING CARTRIDGE</span><i /></div>
                ) : active ? (
                  <div className="project-preview">
                    <img src={active.image} alt={`${active.title}项目预览`} />
                    <div className="preview-meta"><span>{active.id}</span><strong>{active.title}</strong><small>{active.category} / {active.year}</small><a href={`/work/${active.slug}`}>A · ENTER PROJECT →</a></div>
                  </div>
                ) : (
                  <div className="boot-screen"><span className="boot-brand">YANG TING</span><strong>PORTFOLIO</strong><p>INSERT A PROJECT</p><i>PRESS START</i></div>
                )}
              </div>
              <div className="screen-labels"><span>DOT MATRIX WITH STEREO SOUND</span><span>BATTERY ●</span></div>
            </div>

            <div className="console-controls" aria-label="游戏机辅助控制">
              <div className="dpad">
                <i /><b /><span />
                <button className="dpad-left" type="button" onClick={() => moveSelection(-1)} aria-label="上一个项目">‹</button>
                <button className="dpad-right" type="button" onClick={() => moveSelection(1)} aria-label="下一个项目">›</button>
              </div>
              <div className="system-buttons"><button type="button" onClick={() => setActive(null)} /><button type="button" onClick={() => loadProject(active ?? featuredProjects[0])} /><span>SELECT</span><span>START</span></div>
              <div className="action-buttons">
                <a className={!active || loading ? 'is-disabled' : ''} href={active && !loading ? `/work/${active.slug}` : '#work'} aria-label="进入当前项目">A</a>
                <button type="button" onClick={() => setActive(null)} aria-label="退出当前项目">B</button>
              </div>
            </div>
            <div className="speaker" aria-hidden="true">{Array.from({ length: 6 }).map((_, index) => <i key={index} />)}</div>
          </div>
        </div>

        <div className="hero-aside" data-reveal><span>靠近游戏机 · 弹出卡带</span><p>品牌视觉 / IP 衍生 / 原创角色</p><small>HOVER TO REVEAL · CLICK TO LOAD</small></div>
      </section>

      <section className="cartridge-dock" id="work" aria-labelledby="dock-title" data-reveal>
        <div className="dock-heading"><p id="dock-title">SELECTED GAME LIBRARY</p><span>04 CARTRIDGES</span></div>
        <div className="cartridge-list">
          {featuredProjects.map((project) => (
            <button key={project.id} className={`cartridge ${active?.id === project.id ? 'is-active' : ''}`} style={{ '--cart-color': project.color } as React.CSSProperties} type="button" onClick={() => loadProject(project)} aria-label={`载入项目：${project.title}`} aria-pressed={active?.id === project.id}>
              <span className="cartridge-shell">
                <span className="cart-grip" />
                <span className="cart-label"><img src={project.image} alt="" /><span className="cart-overlay"><small>{project.id}</small><strong>{project.title}</strong></span></span>
                <span className="cart-board"><i /><i /><i /><i /><i /></span>
              </span>
              <span className="cartridge-caption"><b>{project.title}</b><small>{project.subtitle}</small></span>
            </button>
          ))}
        </div>
      </section>

      <section className="library-section" aria-labelledby="library-title" data-reveal>
        <div className="section-index"><span>02 / GAME LIBRARY</span><span>ALL RELEASES — 2023/2026</span></div>
        <div className="library-intro">
          <p>COMPLETE COLLECTION</p>
          <h2 id="library-title">还有两款隐藏游戏，<br />等待解锁。</h2>
          <span>精选项目之外，收藏库保留两个完整的原创 IP 世界。</span>
        </div>
        <div className="bonus-grid">
          {projects.slice(4).map((project) => (
            <a key={project.id} className="bonus-game" href={`/work/${project.slug}`} style={{ '--cart-color': project.color } as React.CSSProperties}>
              <div className="bonus-slot-bar"><span>EXPANSION SLOT / {project.id}</span><b>READY ●</b></div>
              <div className="bonus-image"><img src={project.image} alt={`${project.title}项目封面`} /><span>{project.id}</span></div>
              <div><small>{project.category} / {project.year}</small><h3>{project.title}</h3><p>{project.subtitle}</p></div>
              <i>INSERT / UNLOCK →</i>
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

      <footer><span>© 2026 YANG TING</span><a href="#top">BACK TO START ↑</a><span>GAME SAVED</span></footer>
    </main>
  );
}

