export type DailyProject = {
  id: string;
  title: string;
  image: string;
  color: string;
  lift: string;
  rotate: string;
};

export const dailyPracticeCards: DailyProject[] = [
  { id: '01', title: 'DAILY 01', image: '/daily/01-v2.png', color: '#e9bd50', lift: '18px', rotate: '-6deg' },
  { id: '02', title: 'DAILY 02', image: '/daily/02-v2.png', color: '#7bc9ca', lift: '2px', rotate: '-3deg' },
  { id: '03', title: 'DAILY 03', image: '/daily/03-v2.png', color: '#66a9d5', lift: '-8px', rotate: '3deg' },
  { id: '04', title: 'DAILY 04', image: '/daily/04-v2.png', color: '#70cf69', lift: '7px', rotate: '-2deg' },
  { id: '05', title: 'DAILY 05', image: '/daily/05-v2.png', color: '#ef91bf', lift: '-2px', rotate: '5deg' },
  { id: '06', title: 'DAILY 06', image: '/daily/06-v2.png', color: '#76bde7', lift: '20px', rotate: '7deg' },
];

