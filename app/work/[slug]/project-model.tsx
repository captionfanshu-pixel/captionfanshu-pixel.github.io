'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './project-model.module.css';

type ModelElement = HTMLElement & { cameraOrbit: string; cameraTarget: string; jumpCameraToGoal: () => void };
let viewerScript: Promise<void> | undefined;

function loadViewer() {
  if (customElements.get('model-viewer')) return Promise.resolve();
  if (!viewerScript) {
    viewerScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      const timer = window.setTimeout(fail, 30000);
      function fail() {
        window.clearTimeout(timer);
        script.remove();
        viewerScript = undefined;
        reject(new Error('Viewer could not load'));
      }
      script.type = 'module';
      script.src = '/vendor/model-viewer.min.js';
      script.onerror = fail;
      script.onload = () => {
        window.clearTimeout(timer);
        if (customElements.get('model-viewer')) resolve();
        else fail();
      };
      document.head.appendChild(script);
    });
  }
  return viewerScript;
}

export default function ProjectModel({ poster }: { poster: string }) {
  const host = useRef<HTMLDivElement>(null);
  const model = useRef<ModelElement | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'poster' | 'loading' | 'ready' | 'error'>('poster');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!attempt) return;
    let cancelled = false;
    let element: ModelElement | undefined;
    const timeout = window.setTimeout(() => {
      cancelled = true;
      element?.remove();
      setStatus('error');
    }, 90000);
    const failed = () => {
      window.clearTimeout(timeout);
      if (!cancelled) setStatus('error');
    };
    void loadViewer().then(() => {
      if (cancelled || !host.current) return;
      const viewerClass = customElements.get('model-viewer') as CustomElementConstructor & { dracoDecoderLocation: string };
      viewerClass.dracoDecoderLocation = '/vendor/draco/';
      element = document.createElement('model-viewer') as ModelElement;
      const attributes = {
        src: '/models/xiya-exhibition.glb',
        alt: '西雅展快闪空间三维模型，可拖动旋转、缩放查看',
        'camera-controls': '',
        'camera-orbit': '0deg 80deg auto',
        'camera-target': 'auto auto auto',
        'touch-action': 'pan-y',
        'shadow-intensity': '0.6',
        exposure: '1',
        loading: 'eager',
        'interaction-prompt': 'none',
      };
      Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
      element.className = styles.viewer;
      element.addEventListener('load', () => {
        window.clearTimeout(timeout);
        if (!cancelled) setStatus('ready');
      });
      element.addEventListener('error', failed);
      element.addEventListener('progress', (event) => {
        if (!cancelled && event instanceof CustomEvent) setProgress(Math.round(event.detail.totalProgress * 100));
      });
      host.current.replaceChildren(element);
      model.current = element;
    }).catch(failed);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      element?.remove();
      model.current = null;
    };
  }, [attempt]);

  function start() {
    setProgress(0);
    setStatus('loading');
    setAttempt((value) => value + 1);
  }

  return (
    <figure className={`showcase-hero-image ${styles.frame}`}>
      <div className={styles.stage} aria-busy={status === 'loading'}>
        <div ref={host} className={styles.host} />
        {status !== 'ready' && <img className={styles.poster} src={poster} alt="西雅展快闪设计主视觉" />}
        {status !== 'ready' && <div className={styles.overlay}>
          <span className={styles.tag}>XIYA EXHIBITION / 3D</span>
          {status === 'loading' ? <p role="status">模型加载中 · {progress}%</p> : <>
            {status === 'error' && <p role="alert">暂时无法加载模型，请检查网络或换个浏览器重试。</p>}
            <button type="button" onClick={start}>{status === 'error' ? '重新加载模型' : '查看 3D 模型'} <span aria-hidden="true">↗</span></button>
            <small>点击加载 · 约 5.8 MB</small>
          </>}
        </div>}
      </div>
      <figcaption className={styles.toolbar}>
        <div><strong>西雅展 · 快闪空间</strong><span>{status === 'ready' ? '拖动旋转 · 滚轮 / 双指缩放' : '交互式三维展示'}</span></div>
        {status === 'ready' && <button type="button" onClick={() => {
          if (!model.current) return;
          model.current.cameraOrbit = '0deg 80deg auto';
          model.current.cameraTarget = 'auto auto auto';
          model.current.jumpCameraToGoal();
        }}>重置视角</button>}
      </figcaption>
    </figure>
  );
}

