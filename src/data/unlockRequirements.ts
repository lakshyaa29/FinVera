import { LessonLevel, Lesson } from '../types';

export interface LevelInfo {
  level: LessonLevel;
  name: string;
  badge: string;
  icon: string;
  accentColor: string;
  requiredCompletedCount: number;
  description: string;
}

export const LEVELS_CONFIG: LevelInfo[] = [
  {
    level: 1,
    name: 'Money Basics',
    badge: 'LEVEL 1',
    icon: '💰',
    accentColor: 'emerald',
    requiredCompletedCount: 0, // Always unlocked
    description: 'Foundational money concepts: currency, value, cash flow, and budgeting.',
  },
  {
    level: 2,
    name: 'Saving',
    badge: 'LEVEL 2',
    icon: '🏦',
    accentColor: 'blue',
    requiredCompletedCount: 2, // 2 completed lessons
    description: 'Emergency funds, simple & compound interest, inflation defense.',
  },
  {
    level: 3,
    name: 'Banking',
    badge: 'LEVEL 3',
    icon: '🏛️',
    accentColor: 'indigo',
    requiredCompletedCount: 4, // 4 total completed lessons
    description: 'Modern accounts, UPI, KYC, fixed deposits, and avoiding bank charges.',
  },
  {
    level: 4,
    name: 'Credit',
    badge: 'LEVEL 4',
    icon: '💳',
    accentColor: 'amber',
    requiredCompletedCount: 6, // 6 total completed lessons
    description: 'CIBIL scores, credit cards, loans, EMIs, and debt traps.',
  },
  {
    level: 5,
    name: 'Investing',
    badge: 'LEVEL 5',
    icon: '📈',
    accentColor: 'teal',
    requiredCompletedCount: 8, // 8 total completed lessons
    description: 'Stocks, mutual funds, SIPs, ETFs, NAV, and long-term equities.',
  },
  {
    level: 6,
    name: 'Wealth Building',
    badge: 'LEVEL 6',
    icon: '💎',
    accentColor: 'purple',
    requiredCompletedCount: 12, // 12 total completed lessons
    description: 'Asset allocation, tax planning, insurance shields, and retirement.',
  },
];

export interface LevelUnlockState {
  level: LessonLevel;
  name: string;
  isUnlocked: boolean;
  totalCompleted: number;
  requiredTotal: number;
  remainingLessons: number;
  progressPercent: number; // For lessons inside this level
  completedInThisLevel: number;
  totalInThisLevel: number;
  statusText: string;
}

export function evaluateLevelUnlock(
  level: LessonLevel,
  completedLessonIds: string[],
  lessons: Lesson[]
): LevelUnlockState {
  const config = LEVELS_CONFIG.find((l) => l.level === level) || LEVELS_CONFIG[0];
  const totalCompleted = completedLessonIds.length;

  const lessonsInThisLevel = lessons.filter((l) => l.level === level);
  const totalInThisLevel = lessonsInThisLevel.length || 5;
  const completedInThisLevel = lessonsInThisLevel.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  let isUnlocked = false;
  let remaining = 0;

  if (level === 1) {
    isUnlocked = true;
    remaining = 0;
  } else if (level === 2) {
    // Requires at least 2 Level 1 lessons completed
    const level1Completed = lessons
      .filter((l) => l.level === 1)
      .filter((l) => completedLessonIds.includes(l.id)).length;
    isUnlocked = level1Completed >= 2;
    remaining = Math.max(0, 2 - level1Completed);
  } else {
    isUnlocked = totalCompleted >= config.requiredCompletedCount;
    remaining = Math.max(0, config.requiredCompletedCount - totalCompleted);
  }

  const levelProgress =
    totalInThisLevel > 0 ? Math.round((completedInThisLevel / totalInThisLevel) * 100) : 0;

  let statusText = '';
  if (isUnlocked) {
    if (completedInThisLevel === totalInThisLevel && totalInThisLevel > 0) {
      statusText = 'Completed';
    } else {
      statusText = `${completedInThisLevel}/${totalInThisLevel} Lessons`;
    }
  } else {
    statusText = `Complete ${remaining} more ${remaining === 1 ? 'lesson' : 'lessons'} to unlock`;
  }

  return {
    level,
    name: config.name,
    isUnlocked,
    totalCompleted,
    requiredTotal: config.requiredCompletedCount,
    remainingLessons: remaining,
    progressPercent: levelProgress,
    completedInThisLevel,
    totalInThisLevel,
    statusText,
  };
}
