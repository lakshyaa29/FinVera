'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  UserProfile,
  UserProgress,
  SimulatedPortfolio,
  AgeGroup,
  LessonLevel,
} from '../types';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../lib/storage';
import { ALL_LESSONS } from '../data/lessonsData';
import { evaluateLevelUnlock } from '../data/unlockRequirements';

export function getLevelTitleForXP(xp: number): string {
  if (xp >= 4500) return 'Wealth Builder';
  if (xp >= 2800) return 'FinVera';
  if (xp >= 1500) return 'Investing Explorer';
  if (xp >= 700) return 'Finance Learner';
  if (xp >= 250) return 'Money Explorer';
  return 'Money Beginner';
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Aarav',
  ageGroup: '18-24',
  occupation: 'student',
  knowledgeLevel: 'beginner',
  learningGoals: ['Money Basics', 'Investing', 'Mutual Funds & SIP'],
  riskComfort: 'balanced',
  onboarded: true,
  createdAt: new Date().toISOString(),
};

const DEFAULT_PROGRESS: UserProgress = {
  xp: 150,
  levelTitle: 'Money Beginner',
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['money-101'],
  unlockedLevels: [1],
  completedMissions: [],
  exploredCalculators: ['compound-interest'],
  achievements: ['first-lesson'],
  weeklyActivity: [true, true, true, true, true, false, false],
};

const DEFAULT_PORTFOLIO: SimulatedPortfolio = {
  virtualCash: 100000, // ₹1,00,000 initial virtual capital
  holdings: {},
  transactions: [],
};

const DEFAULT_HEALTH_SCORES: Record<string, number> = {
  'hq-1': 10,
  'hq-2': 18,
  'hq-3': 17,
  'hq-4': 18,
  'hq-5': 10,
};

interface UserStateContextType {
  profile: UserProfile;
  progress: UserProgress;
  portfolio: SimulatedPortfolio;
  healthScores: Record<string, number>;
  isLoaded: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setAgeGroup: (age: AgeGroup) => void;
  completeLesson: (lessonId: string, xpEarned: number) => { newAchievements: string[] };
  completeMission: (missionId: string, xpEarned: number) => void;
  exploreCalculator: (calcId: string) => void;
  recordQuizPass: () => void;
  buyAsset: (assetId: string, symbol: string, name: string, units: number, price: number) => { success: boolean; message: string };
  sellAsset: (assetId: string, units: number, price: number) => { success: boolean; message: string };
  setHealthScore: (questionId: string, points: number) => void;
  resetAllData: () => void;
}

const UserStateContext = createContext<UserStateContextType | undefined>(undefined);

export function UserStateProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [progress, setProgressState] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [portfolio, setPortfolioState] = useState<SimulatedPortfolio>(DEFAULT_PORTFOLIO);
  const [healthScores, setHealthScoresState] = useState<Record<string, number>>(DEFAULT_HEALTH_SCORES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const savedProfile = loadFromStorage<UserProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    const savedProgress = loadFromStorage<UserProgress>(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
    const savedPortfolio = loadFromStorage<SimulatedPortfolio>(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
    const savedHealth = loadFromStorage<Record<string, number>>(STORAGE_KEYS.HEALTH, DEFAULT_HEALTH_SCORES);

    // Update streak if needed
    const today = new Date().toISOString().split('T')[0];
    const lastDate = savedProgress.lastActiveDate;
    let currentStreak = savedProgress.streakDays || 1;

    if (lastDate) {
      const last = new Date(lastDate);
      const curr = new Date(today);
      const diffTime = Math.abs(curr.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Logged in next day, streak continues
        currentStreak += 1;
      } else if (diffDays > 1) {
        // Missed a day
        currentStreak = 1;
      }
    }

    // Refresh unlocked levels
    const unlocked: number[] = [1];
    for (let lvl = 2; lvl <= 6; lvl++) {
      const res = evaluateLevelUnlock(lvl as LessonLevel, savedProgress.completedLessonIds || [], ALL_LESSONS);
      if (res.isUnlocked) {
        unlocked.push(lvl);
      }
    }

    const updatedProgress = {
      ...savedProgress,
      streakDays: currentStreak,
      lastActiveDate: today,
      unlockedLevels: unlocked,
      levelTitle: getLevelTitleForXP(savedProgress.xp || 0),
    };

    setProfileState(savedProfile);
    setProgressState(updatedProgress);
    setPortfolioState(savedPortfolio);
    setHealthScoresState(savedHealth);
    setIsLoaded(true);

    saveToStorage(STORAGE_KEYS.PROGRESS, updatedProgress);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  };

  const setAgeGroup = (age: AgeGroup) => {
    updateProfile({ ageGroup: age });
  };

  const completeLesson = (lessonId: string, xpEarned: number) => {
    const newAchievements: string[] = [];

    setProgressState((prev) => {
      const isAlreadyDone = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isAlreadyDone ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const newXp = isAlreadyDone ? prev.xp : prev.xp + xpEarned;
      const newLevelTitle = getLevelTitleForXP(newXp);

      // Evaluate new level unlocks
      const newUnlocked: number[] = [1];
      for (let lvl = 2; lvl <= 6; lvl++) {
        const res = evaluateLevelUnlock(lvl as LessonLevel, newCompleted, ALL_LESSONS);
        if (res.isUnlocked) {
          newUnlocked.push(lvl);
        }
      }

      // Achievement checks
      const curAchievements = [...prev.achievements];
      const checkAndAward = (achId: string) => {
        if (!curAchievements.includes(achId)) {
          curAchievements.push(achId);
          newAchievements.push(achId);
        }
      };

      if (newCompleted.length >= 1) checkAndAward('first-lesson');
      if (newCompleted.length >= 10) checkAndAward('lessons-10-complete');
      if (newCompleted.length >= 25) checkAndAward('lessons-25-complete');

      // Check level 1 complete
      const level1Lessons = ALL_LESSONS.filter((l) => l.level === 1).map((l) => l.id);
      if (level1Lessons.every((id) => newCompleted.includes(id))) {
        checkAndAward('money-basics-complete');
      }

      if (newUnlocked.includes(3)) checkAndAward('banking-unlocked');
      if (newUnlocked.includes(4)) checkAndAward('credit-unlocked');
      if (newUnlocked.includes(5)) checkAndAward('investing-unlocked');

      const nextProgress: UserProgress = {
        ...prev,
        xp: newXp,
        levelTitle: newLevelTitle,
        completedLessonIds: newCompleted,
        unlockedLevels: newUnlocked,
        achievements: curAchievements,
      };

      saveToStorage(STORAGE_KEYS.PROGRESS, nextProgress);
      return nextProgress;
    });

    return { newAchievements };
  };

  const completeMission = (missionId: string, xpEarned: number) => {
    setProgressState((prev) => {
      if (prev.completedMissions.includes(missionId)) return prev;
      const nextMissions = [...prev.completedMissions, missionId];
      const nextXp = prev.xp + xpEarned;
      const next: UserProgress = {
        ...prev,
        completedMissions: nextMissions,
        xp: nextXp,
        levelTitle: getLevelTitleForXP(nextXp),
      };
      saveToStorage(STORAGE_KEYS.PROGRESS, next);
      return next;
    });
  };

  const exploreCalculator = (calcId: string) => {
    setProgressState((prev) => {
      if (prev.exploredCalculators.includes(calcId)) return prev;
      const nextCalcs = [...prev.exploredCalculators, calcId];
      const nextAchievements = [...prev.achievements];
      let bonusXp = 25;

      if (nextCalcs.length >= 5 && !nextAchievements.includes('calculator-explorer')) {
        nextAchievements.push('calculator-explorer');
        bonusXp += 75;
      }

      const next: UserProgress = {
        ...prev,
        exploredCalculators: nextCalcs,
        achievements: nextAchievements,
        xp: prev.xp + bonusXp,
        levelTitle: getLevelTitleForXP(prev.xp + bonusXp),
      };
      saveToStorage(STORAGE_KEYS.PROGRESS, next);
      return next;
    });
  };

  const recordQuizPass = () => {
    setProgressState((prev) => {
      if (prev.achievements.includes('first-quiz')) return prev;
      const nextAchievements = [...prev.achievements, 'first-quiz'];
      const nextXp = prev.xp + 50;
      const next: UserProgress = {
        ...prev,
        achievements: nextAchievements,
        xp: nextXp,
        levelTitle: getLevelTitleForXP(nextXp),
      };
      saveToStorage(STORAGE_KEYS.PROGRESS, next);
      return next;
    });
  };

  const buyAsset = (assetId: string, symbol: string, name: string, units: number, price: number) => {
    const totalCost = units * price;
    if (portfolio.virtualCash < totalCost) {
      return { success: false, message: 'Insufficient virtual cash to complete order.' };
    }

    setPortfolioState((prev) => {
      const currentHolding = prev.holdings[assetId] || {
        assetId,
        units: 0,
        avgBuyPrice: 0,
        totalInvested: 0,
      };

      const newUnits = currentHolding.units + units;
      const newTotalInvested = currentHolding.totalInvested + totalCost;
      const newAvgBuyPrice = newUnits > 0 ? newTotalInvested / newUnits : 0;

      const newTransaction = {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        assetId,
        assetSymbol: symbol,
        assetName: name,
        type: 'BUY' as const,
        units,
        price,
        totalAmount: totalCost,
      };

      const nextPortfolio: SimulatedPortfolio = {
        virtualCash: prev.virtualCash - totalCost,
        holdings: {
          ...prev.holdings,
          [assetId]: {
            assetId,
            units: newUnits,
            avgBuyPrice: newAvgBuyPrice,
            totalInvested: newTotalInvested,
          },
        },
        transactions: [newTransaction, ...prev.transactions],
      };

      saveToStorage(STORAGE_KEYS.PORTFOLIO, nextPortfolio);
      return nextPortfolio;
    });

    // Check achievement for first trade
    setProgressState((prev) => {
      if (prev.achievements.includes('first-simulation')) return prev;
      const nextAchievements = [...prev.achievements, 'first-simulation'];
      const nextXp = prev.xp + 100;
      const next: UserProgress = {
        ...prev,
        achievements: nextAchievements,
        xp: nextXp,
        levelTitle: getLevelTitleForXP(nextXp),
      };
      saveToStorage(STORAGE_KEYS.PROGRESS, next);
      return next;
    });

    return { success: true, message: `Successfully purchased ${units} units of ${symbol}!` };
  };

  const sellAsset = (assetId: string, units: number, price: number) => {
    const currentHolding = portfolio.holdings[assetId];
    if (!currentHolding || currentHolding.units < units) {
      return { success: false, message: 'You do not own enough units of this asset to sell.' };
    }

    const totalReturn = units * price;

    setPortfolioState((prev) => {
      const newUnits = currentHolding.units - units;
      const proportionSold = units / currentHolding.units;
      const newTotalInvested = Math.max(0, currentHolding.totalInvested * (1 - proportionSold));
      const newAvgBuyPrice = newUnits > 0 ? currentHolding.avgBuyPrice : 0;

      const newHoldings = { ...prev.holdings };
      if (newUnits === 0) {
        delete newHoldings[assetId];
      } else {
        newHoldings[assetId] = {
          assetId,
          units: newUnits,
          avgBuyPrice: newAvgBuyPrice,
          totalInvested: newTotalInvested,
        };
      }

      const newTransaction = {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        assetId,
        assetSymbol: currentHolding.assetId,
        assetName: currentHolding.assetId,
        type: 'SELL' as const,
        units,
        price,
        totalAmount: totalReturn,
      };

      const nextPortfolio: SimulatedPortfolio = {
        virtualCash: prev.virtualCash + totalReturn,
        holdings: newHoldings,
        transactions: [newTransaction, ...prev.transactions],
      };

      saveToStorage(STORAGE_KEYS.PORTFOLIO, nextPortfolio);
      return nextPortfolio;
    });

    return { success: true, message: `Successfully sold ${units} units for ${totalReturn.toLocaleString('en-IN')}.` };
  };

  const setHealthScore = (questionId: string, points: number) => {
    setHealthScoresState((prev) => {
      const next = { ...prev, [questionId]: points };
      saveToStorage(STORAGE_KEYS.HEALTH, next);
      return next;
    });
  };

  const resetAllData = () => {
    setProfileState(DEFAULT_PROFILE);
    setProgressState(DEFAULT_PROGRESS);
    setPortfolioState(DEFAULT_PORTFOLIO);
    setHealthScoresState(DEFAULT_HEALTH_SCORES);
    saveToStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    saveToStorage(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
    saveToStorage(STORAGE_KEYS.PORTFOLIO, DEFAULT_PORTFOLIO);
    saveToStorage(STORAGE_KEYS.HEALTH, DEFAULT_HEALTH_SCORES);
  };

  return (
    <UserStateContext.Provider
      value={{
        profile,
        progress,
        portfolio,
        healthScores,
        isLoaded,
        updateProfile,
        setAgeGroup,
        completeLesson,
        completeMission,
        exploreCalculator,
        recordQuizPass,
        buyAsset,
        sellAsset,
        setHealthScore,
        resetAllData,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }
  return context;
}
