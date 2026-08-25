import type { Metadata } from 'next';
import './globals.css';
import SiteEffects from './site-effects';

const siteUrl = process.env.GITHUB_PAGES === 'true'
  ? 'https://captionfanshu-pixel.github.io'
  : 'https://yangting-game-portfolio.captionfanshu.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '杨婷｜视觉设计作品集',
  description: '杨婷的品牌视觉、IP 衍生与原创角色设计作品集。选择一张卡带，开始浏览。',
  openGraph: {
    title: '杨婷｜视觉设计作品集',
    description: '选择一张卡带，浏览杨婷的品牌视觉、IP 衍生与原创角色设计。',
    images: [{ url: '/og.png', width: 1728, height: 910, alt: '杨婷视觉设计作品集' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '杨婷｜视觉设计作品集',
    description: '选择一张卡带，浏览杨婷的品牌视觉、IP 衍生与原创角色设计。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteEffects />{children}</body></html>;
}
