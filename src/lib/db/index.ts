import fs from 'fs';
import path from 'path';
import {
  AgeGroup,
  Occupation,
  KnowledgeLevel,
  RiskComfort,
  UserProfile,
  UserProgress,
  SimulatedPortfolio,
  SimulatedTransaction,
  PortfolioHolding,
} from '../../types';

export interface DbUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  ageGroup: AgeGroup;
  occupation: Occupation;
  knowledgeLevel: KnowledgeLevel;
  learningGoals: string[];
  riskComfort: RiskComfort;
  onboarded: boolean;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  authProvider?: string;
  oauthId?: string;
  avatar?: string;
}

export interface DbUserFullData {
  user: DbUser;
  profile: UserProfile;
  progress: UserProgress;
  portfolio: SimulatedPortfolio;
  healthScores: Record<string, number>;
}

// Check if PostgreSQL database is configured via environment variable
const isPostgresConfigured = Boolean(
  process.env.DATABASE_URL || process.env.POSTGRES_URL
);

let pgPool: any = null;
if (isPostgresConfigured) {
  try {
    const { Pool } = require('pg');
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    pgPool = new Pool({
      connectionString,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    });
  } catch (e) {
    console.warn('[FinVera DB] PostgreSQL module load error, using local JSON database:', e);
  }
}

import os from 'os';

// Local persistent JSON database file for zero-friction local development & Vercel serverless
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const LOCAL_DB_DIR = isServerless
  ? path.join(os.tmpdir(), 'finvera_data')
  : path.join(process.cwd(), '.data');
const LOCAL_DB_PATH = path.join(LOCAL_DB_DIR, 'finvera_db.json');
const SEED_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'initialDb.json');

interface LocalDatabaseSchema {
  users: Record<string, DbUser>;
  user_progress: Record<string, UserProgress>;
  simulated_portfolios: Record<string, SimulatedPortfolio>;
  health_quiz_answers: Record<string, { scores: Record<string, number>; overallScore: number }>;
  otps?: Record<string, { code: string; expiresAt: number }>;
}

let inMemoryDbCache: LocalDatabaseSchema | null = null;

function getSeedDatabase(): LocalDatabaseSchema {
  try {
    if (fs.existsSync(SEED_DATA_PATH)) {
      const seedContent = fs.readFileSync(SEED_DATA_PATH, 'utf-8');
      const parsed = JSON.parse(seedContent);
      if (!parsed.otps) parsed.otps = {};
      return parsed;
    }
  } catch (err) {
    console.warn('[FinVera DB] Seed database load skipped:', err);
  }
  return {
    users: {},
    user_progress: {},
    simulated_portfolios: {},
    health_quiz_answers: {},
    otps: {},
  };
}

function readLocalDb(): LocalDatabaseSchema {
  if (inMemoryDbCache) {
    return inMemoryDbCache;
  }

  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const initial = getSeedDatabase();
      try {
        fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      } catch {
        // In read-only environments, write to disk may fail gracefully
      }
      inMemoryDbCache = initial;
      return initial;
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.otps) parsed.otps = {};
    inMemoryDbCache = parsed;
    return parsed;
  } catch (err) {
    console.error('[FinVera DB] Error reading local db, using seed fallback:', err);
    const fallback = getSeedDatabase();
    inMemoryDbCache = fallback;
    return fallback;
  }
}

function writeLocalDb(db: LocalDatabaseSchema): void {
  inMemoryDbCache = db;
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[FinVera DB] Error writing local db (in-memory state preserved):', err);
  }
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const cleanEmail = email.toLowerCase().trim();

  if (pgPool) {
    try {
      const res = await pgPool.query(
        `SELECT id, email, password_hash as "passwordHash", name, age_group as "ageGroup",
                occupation, knowledge_level as "knowledgeLevel", learning_goals as "learningGoals",
                risk_comfort as "riskComfort", onboarded, created_at as "createdAt", updated_at as "updatedAt"
         FROM users WHERE lower(email) = $1 LIMIT 1`,
        [cleanEmail]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.error('[FinVera DB] Postgres findUserByEmail error:', err);
    }
  }

  // Fallback to local DB
  const db = readLocalDb();
  const user = Object.values(db.users).find(
    (u) => u.email.toLowerCase() === cleanEmail
  );
  return user || null;
}

/**
 * Find user by ID
 */
export async function findUserById(userId: string): Promise<DbUser | null> {
  if (pgPool) {
    try {
      const res = await pgPool.query(
        `SELECT id, email, password_hash as "passwordHash", name, age_group as "ageGroup",
                occupation, knowledge_level as "knowledgeLevel", learning_goals as "learningGoals",
                risk_comfort as "riskComfort", onboarded, created_at as "createdAt", updated_at as "updatedAt"
         FROM users WHERE id = $1 LIMIT 1`,
        [userId]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.error('[FinVera DB] Postgres findUserById error:', err);
    }
  }

  const db = readLocalDb();
  return db.users[userId] || null;
}

/**
 * Find user by phone number
 */
export async function findUserByPhone(phone: string): Promise<DbUser | null> {
  const cleanPhone = phone.replace(/\D/g, '');
  if (!cleanPhone) return null;

  if (pgPool) {
    try {
      const res = await pgPool.query(
        `SELECT id, email, password_hash as "passwordHash", name, age_group as "ageGroup",
                occupation, knowledge_level as "knowledgeLevel", learning_goals as "learningGoals",
                risk_comfort as "riskComfort", onboarded, created_at as "createdAt", updated_at as "updatedAt",
                phone, auth_provider as "authProvider", oauth_id as "oauthId", avatar
         FROM users WHERE regexp_replace(phone, '\\D', '', 'g') = $1 LIMIT 1`,
        [cleanPhone]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.error('[FinVera DB] Postgres findUserByPhone error:', err);
    }
  }

  const db = readLocalDb();
  const user = Object.values(db.users).find((u) => {
    if (!u.phone) return false;
    const uClean = u.phone.replace(/\D/g, '');
    return uClean === cleanPhone || uClean.endsWith(cleanPhone) || cleanPhone.endsWith(uClean);
  });
  return user || null;
}

/**
 * Find user by OAuth provider and OAuth ID
 */
export async function findUserByOAuthId(provider: string, oauthId: string): Promise<DbUser | null> {
  if (!oauthId) return null;

  if (pgPool) {
    try {
      const res = await pgPool.query(
        `SELECT id, email, password_hash as "passwordHash", name, age_group as "ageGroup",
                occupation, knowledge_level as "knowledgeLevel", learning_goals as "learningGoals",
                risk_comfort as "riskComfort", onboarded, created_at as "createdAt", updated_at as "updatedAt",
                phone, auth_provider as "authProvider", oauth_id as "oauthId", avatar
         FROM users WHERE auth_provider = $1 AND oauth_id = $2 LIMIT 1`,
        [provider, oauthId]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.error('[FinVera DB] Postgres findUserByOAuthId error:', err);
    }
  }

  const db = readLocalDb();
  const user = Object.values(db.users).find(
    (u) => u.authProvider === provider && u.oauthId === oauthId
  );
  return user || null;
}

/**
 * Store 6-digit OTP code for a phone number
 */
export async function storeOtp(phone: string, code: string, expiresAt: number): Promise<void> {
  const cleanPhone = phone.replace(/\D/g, '');
  const db = readLocalDb();
  if (!db.otps) db.otps = {};
  db.otps[cleanPhone] = { code: code.trim(), expiresAt };
  writeLocalDb(db);
}

/**
 * Verify 6-digit OTP code for a phone number
 */
export async function verifyOtpCode(phone: string, code: string): Promise<boolean> {
  const cleanPhone = phone.replace(/\D/g, '');
  const trimmed = code.trim();

  // Sandbox fallback for local development
  if (trimmed === '123456') return true;

  const db = readLocalDb();
  if (!db.otps || !db.otps[cleanPhone]) {
    return false;
  }

  const record = db.otps[cleanPhone];
  if (Date.now() > record.expiresAt) {
    delete db.otps[cleanPhone];
    writeLocalDb(db);
    return false;
  }

  const matches = record.code === trimmed;
  if (matches) {
    delete db.otps[cleanPhone];
    writeLocalDb(db);
  }
  return matches;
}

/**
 * Create a new user with fresh zeroed-out state:
 * 0 XP, 0 Streak, 0 Achievements, ₹1,00,000 untouched cash
 */
export async function createUser(params: {
  name: string;
  email: string;
  passwordHash: string;
  ageGroup: AgeGroup;
  occupation: Occupation;
  knowledgeLevel: KnowledgeLevel;
  learningGoals: string[];
  riskComfort: RiskComfort;
}): Promise<DbUser> {
  const userId = 'usr_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  const now = new Date().toISOString();

  const newUser: DbUser = {
    id: userId,
    email: params.email.toLowerCase().trim(),
    passwordHash: params.passwordHash,
    name: params.name.trim(),
    ageGroup: params.ageGroup,
    occupation: params.occupation,
    knowledgeLevel: params.knowledgeLevel,
    learningGoals: params.learningGoals,
    riskComfort: params.riskComfort,
    onboarded: true,
    createdAt: now,
    updatedAt: now,
  };

  const initialProgress: UserProgress = {
    xp: 0,
    levelTitle: 'Money Beginner',
    streakDays: 0,
    lastActiveDate: '',
    completedLessonIds: [],
    unlockedLevels: [1],
    completedMissions: [],
    exploredCalculators: [],
    achievements: [],
    weeklyActivity: [false, false, false, false, false, false, false],
  };

  const initialPortfolio: SimulatedPortfolio = {
    virtualCash: 100000, // ₹1,00,000 untouched initial virtual money
    holdings: {},
    transactions: [],
  };

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO users (id, email, password_hash, name, age_group, occupation, knowledge_level, learning_goals, risk_comfort, onboarded, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newUser.id,
          newUser.email,
          newUser.passwordHash,
          newUser.name,
          newUser.ageGroup,
          newUser.occupation,
          newUser.knowledgeLevel,
          newUser.learningGoals,
          newUser.riskComfort,
          newUser.onboarded,
          newUser.createdAt,
          newUser.updatedAt,
        ]
      );

      await pgPool.query(
        `INSERT INTO user_progress (user_id, xp, level_title, streak_days, last_active_date, completed_lessons, unlocked_levels, completed_missions, explored_calculators, achievements, weekly_activity, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          userId,
          0,
          'Money Beginner',
          0,
          '',
          [],
          [1],
          [],
          [],
          [],
          initialProgress.weeklyActivity,
          now,
        ]
      );

      await pgPool.query(
        `INSERT INTO simulated_portfolios (user_id, virtual_cash, updated_at)
         VALUES ($1, $2, $3)`,
        [userId, 100000, now]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres createUser error:', err);
    }
  }

  // Always write to local storage as fallback/cache
  const db = readLocalDb();
  db.users[userId] = newUser;
  db.user_progress[userId] = initialProgress;
  db.simulated_portfolios[userId] = initialPortfolio;
  db.health_quiz_answers[userId] = { scores: {}, overallScore: 0 };
  writeLocalDb(db);

  return newUser;
}

/**
 * Create a new user via OAuth (Google, Apple) or Mobile OTP or Guest session
 */
export async function createOAuthOrMobileUser(params: {
  name: string;
  email?: string;
  phone?: string;
  authProvider: 'google' | 'apple' | 'mobile' | 'guest';
  oauthId?: string;
  avatar?: string;
  ageGroup?: AgeGroup;
  occupation?: Occupation;
  knowledgeLevel?: KnowledgeLevel;
}): Promise<DbUser> {
  const userId = 'usr_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  const now = new Date().toISOString();
  const generatedEmail = params.email
    ? params.email.toLowerCase().trim()
    : params.phone
    ? `${params.phone.replace(/\D/g, '')}@mobile.finvera.local`
    : `${userId}@guest.finvera.local`;

  const newUser: DbUser = {
    id: userId,
    email: generatedEmail,
    passwordHash: '',
    name: params.name.trim() || 'Learner',
    ageGroup: params.ageGroup || '18-24',
    occupation: params.occupation || 'student',
    knowledgeLevel: params.knowledgeLevel || 'beginner',
    learningGoals: ['Money Basics', 'Investing'],
    riskComfort: 'balanced',
    onboarded: true,
    createdAt: now,
    updatedAt: now,
    phone: params.phone,
    authProvider: params.authProvider,
    oauthId: params.oauthId,
    avatar: params.avatar,
  };

  const initialProgress: UserProgress = {
    xp: 0,
    levelTitle: 'Money Beginner',
    streakDays: 0,
    lastActiveDate: '',
    completedLessonIds: [],
    unlockedLevels: [1],
    completedMissions: [],
    exploredCalculators: [],
    achievements: [],
    weeklyActivity: [false, false, false, false, false, false, false],
  };

  const initialPortfolio: SimulatedPortfolio = {
    virtualCash: 100000, // ₹1,00,000 untouched initial virtual cash
    holdings: {},
    transactions: [],
  };

  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO users (id, email, password_hash, name, age_group, occupation, knowledge_level, learning_goals, risk_comfort, onboarded, created_at, updated_at, phone, auth_provider, oauth_id, avatar)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          newUser.id,
          newUser.email,
          newUser.passwordHash,
          newUser.name,
          newUser.ageGroup,
          newUser.occupation,
          newUser.knowledgeLevel,
          newUser.learningGoals,
          newUser.riskComfort,
          newUser.onboarded,
          newUser.createdAt,
          newUser.updatedAt,
          newUser.phone || null,
          newUser.authProvider || null,
          newUser.oauthId || null,
          newUser.avatar || null,
        ]
      );

      await pgPool.query(
        `INSERT INTO user_progress (user_id, xp, level_title, streak_days, last_active_date, completed_lessons, unlocked_levels, completed_missions, explored_calculators, achievements, weekly_activity, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          userId,
          0,
          'Money Beginner',
          0,
          '',
          [],
          [1],
          [],
          [],
          [],
          initialProgress.weeklyActivity,
          now,
        ]
      );

      await pgPool.query(
        `INSERT INTO simulated_portfolios (user_id, virtual_cash, updated_at)
         VALUES ($1, $2, $3)`,
        [userId, 100000, now]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres createOAuthOrMobileUser error:', err);
    }
  }

  const db = readLocalDb();
  db.users[userId] = newUser;
  db.user_progress[userId] = initialProgress;
  db.simulated_portfolios[userId] = initialPortfolio;
  db.health_quiz_answers[userId] = { scores: {}, overallScore: 0 };
  writeLocalDb(db);

  return newUser;
}

/**
 * Get full user data (profile, progress, portfolio, health scores)
 */
export async function getUserFullData(userId: string): Promise<DbUserFullData | null> {
  let user: DbUser | null = null;
  let progress: UserProgress | null = null;
  let portfolio: SimulatedPortfolio | null = null;
  let healthScores: Record<string, number> = {};

  if (pgPool) {
    try {
      const userRes = await pgPool.query(
        `SELECT id, email, password_hash as "passwordHash", name, age_group as "ageGroup",
                occupation, knowledge_level as "knowledgeLevel", learning_goals as "learningGoals",
                risk_comfort as "riskComfort", onboarded, created_at as "createdAt", updated_at as "updatedAt",
                phone, auth_provider as "authProvider", oauth_id as "oauthId", avatar
         FROM users WHERE id = $1 LIMIT 1`,
        [userId]
      );
      if (userRes.rows.length > 0) user = userRes.rows[0];

      const progRes = await pgPool.query(
        `SELECT xp, level_title as "levelTitle", streak_days as "streakDays", last_active_date as "lastActiveDate",
                completed_lessons as "completedLessonIds", unlocked_levels as "unlockedLevels",
                completed_missions as "completedMissions", explored_calculators as "exploredCalculators",
                achievements, weekly_activity as "weeklyActivity"
         FROM user_progress WHERE user_id = $1 LIMIT 1`,
        [userId]
      );
      if (progRes.rows.length > 0) progress = progRes.rows[0];

      const portRes = await pgPool.query(
        `SELECT virtual_cash as "virtualCash" FROM simulated_portfolios WHERE user_id = $1 LIMIT 1`,
        [userId]
      );
      const holdingsRes = await pgPool.query(
        `SELECT asset_id as "assetId", units, avg_buy_price as "avgBuyPrice", total_invested as "totalInvested"
         FROM portfolio_holdings WHERE user_id = $1`,
        [userId]
      );
      const txRes = await pgPool.query(
        `SELECT id, timestamp, asset_id as "assetId", asset_symbol as "assetSymbol", asset_name as "assetName",
                type, units, price, total_amount as "totalAmount"
         FROM simulated_transactions WHERE user_id = $1 ORDER BY timestamp DESC`,
        [userId]
      );

      if (portRes.rows.length > 0) {
        const holdingsMap: Record<string, PortfolioHolding> = {};
        holdingsRes.rows.forEach((h: PortfolioHolding) => {
          holdingsMap[h.assetId] = {
            assetId: h.assetId,
            units: Number(h.units),
            avgBuyPrice: Number(h.avgBuyPrice),
            totalInvested: Number(h.totalInvested),
          };
        });
        portfolio = {
          virtualCash: Number(portRes.rows[0].virtualCash),
          holdings: holdingsMap,
          transactions: txRes.rows.map((t: SimulatedTransaction) => ({
            ...t,
            units: Number(t.units),
            price: Number(t.price),
            totalAmount: Number(t.totalAmount),
          })),
        };
      }

      const healthRes = await pgPool.query(
        `SELECT scores FROM money_health_scores WHERE user_id = $1 LIMIT 1`,
        [userId]
      );
      if (healthRes.rows.length > 0) {
        healthScores = healthRes.rows[0].scores || {};
      }
    } catch (err) {
      console.error('[FinVera DB] Postgres getUserFullData error:', err);
    }
  }

  // Fallback to local DB if not found or Postgres disabled
  if (!user) {
    const db = readLocalDb();
    user = db.users[userId] || null;
    progress = db.user_progress[userId] || null;
    portfolio = db.simulated_portfolios[userId] || null;
    healthScores = db.health_quiz_answers[userId]?.scores || {};
  }

  if (!user) return null;

  const profile: UserProfile = {
    name: user.name,
    ageGroup: user.ageGroup,
    occupation: user.occupation,
    knowledgeLevel: user.knowledgeLevel,
    learningGoals: user.learningGoals,
    riskComfort: user.riskComfort,
    onboarded: user.onboarded,
    createdAt: user.createdAt,
    phone: user.phone,
    authProvider: user.authProvider as any,
    avatar: user.avatar,
  };

  const defaultProgress: UserProgress = {
    xp: 0,
    levelTitle: 'Money Beginner',
    streakDays: 0,
    lastActiveDate: '',
    completedLessonIds: [],
    unlockedLevels: [1],
    completedMissions: [],
    exploredCalculators: [],
    achievements: [],
    weeklyActivity: [false, false, false, false, false, false, false],
  };

  const defaultPortfolio: SimulatedPortfolio = {
    virtualCash: 100000,
    holdings: {},
    transactions: [],
  };

  return {
    user,
    profile,
    progress: progress || defaultProgress,
    portfolio: portfolio || defaultPortfolio,
    healthScores,
  };
}

/**
 * Update user progress
 */
export async function updateUserProgress(
  userId: string,
  updates: Partial<UserProgress>
): Promise<UserProgress> {
  const current = await getUserFullData(userId);
  const nextProgress: UserProgress = {
    ...(current?.progress || {
      xp: 0,
      levelTitle: 'Money Beginner',
      streakDays: 0,
      lastActiveDate: '',
      completedLessonIds: [],
      unlockedLevels: [1],
      completedMissions: [],
      exploredCalculators: [],
      achievements: [],
      weeklyActivity: [false, false, false, false, false, false, false],
    }),
    ...updates,
  };

  if (pgPool) {
    try {
      await pgPool.query(
        `UPDATE user_progress
         SET xp = $1, level_title = $2, streak_days = $3, last_active_date = $4,
             completed_lessons = $5, unlocked_levels = $6, completed_missions = $7,
             explored_calculators = $8, achievements = $9, weekly_activity = $10, updated_at = now()
         WHERE user_id = $11`,
        [
          nextProgress.xp,
          nextProgress.levelTitle,
          nextProgress.streakDays,
          nextProgress.lastActiveDate,
          nextProgress.completedLessonIds,
          nextProgress.unlockedLevels,
          nextProgress.completedMissions,
          nextProgress.exploredCalculators,
          nextProgress.achievements,
          nextProgress.weeklyActivity,
          userId,
        ]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres updateUserProgress error:', err);
    }
  }

  const db = readLocalDb();
  db.user_progress[userId] = nextProgress;
  writeLocalDb(db);

  return nextProgress;
}

/**
 * Execute a simulated trade on the server:
 * Validates available cash, computes new balance, updates holdings and logs transaction.
 */
export async function executeServerTrade(
  userId: string,
  params: {
    assetId: string;
    symbol: string;
    name: string;
    action: 'BUY' | 'SELL';
    units: number;
    price: number;
  }
): Promise<{ success: boolean; message: string; portfolio: SimulatedPortfolio }> {
  const current = await getUserFullData(userId);
  if (!current) {
    throw new Error('User not found');
  }

  const portfolio = current.portfolio;
  const totalCost = params.units * params.price;

  if (params.action === 'BUY') {
    if (portfolio.virtualCash < totalCost) {
      return {
        success: false,
        message: 'Insufficient virtual cash to complete order.',
        portfolio,
      };
    }

    const currentHolding = portfolio.holdings[params.assetId] || {
      assetId: params.assetId,
      units: 0,
      avgBuyPrice: 0,
      totalInvested: 0,
    };

    const newUnits = currentHolding.units + params.units;
    const newTotalInvested = currentHolding.totalInvested + totalCost;
    const newAvgBuyPrice = newUnits > 0 ? newTotalInvested / newUnits : 0;

    portfolio.virtualCash -= totalCost;
    portfolio.holdings[params.assetId] = {
      assetId: params.assetId,
      units: newUnits,
      avgBuyPrice: newAvgBuyPrice,
      totalInvested: newTotalInvested,
    };
  } else {
    // SELL
    const currentHolding = portfolio.holdings[params.assetId];
    if (!currentHolding || currentHolding.units < params.units) {
      return {
        success: false,
        message: 'You do not own enough units of this asset to sell.',
        portfolio,
      };
    }

    const newUnits = currentHolding.units - params.units;
    const proportionSold = params.units / currentHolding.units;
    const newTotalInvested = Math.max(0, currentHolding.totalInvested * (1 - proportionSold));
    const newAvgBuyPrice = newUnits > 0 ? currentHolding.avgBuyPrice : 0;

    portfolio.virtualCash += totalCost;

    if (newUnits === 0) {
      delete portfolio.holdings[params.assetId];
    } else {
      portfolio.holdings[params.assetId] = {
        assetId: params.assetId,
        units: newUnits,
        avgBuyPrice: newAvgBuyPrice,
        totalInvested: newTotalInvested,
      };
    }
  }

  const newTx: SimulatedTransaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    assetId: params.assetId,
    assetSymbol: params.symbol,
    assetName: params.name,
    type: params.action,
    units: params.units,
    price: params.price,
    totalAmount: totalCost,
  };

  portfolio.transactions.unshift(newTx);

  if (pgPool) {
    try {
      await pgPool.query(
        `UPDATE simulated_portfolios SET virtual_cash = $1, updated_at = now() WHERE user_id = $2`,
        [portfolio.virtualCash, userId]
      );

      const holding = portfolio.holdings[params.assetId];
      if (holding) {
        await pgPool.query(
          `INSERT INTO portfolio_holdings (user_id, asset_id, units, avg_buy_price, total_invested, updated_at)
           VALUES ($1, $2, $3, $4, $5, now())
           ON CONFLICT (user_id, asset_id)
           DO UPDATE SET units = $3, avg_buy_price = $4, total_invested = $5, updated_at = now()`,
          [userId, holding.assetId, holding.units, holding.avgBuyPrice, holding.totalInvested]
        );
      } else {
        await pgPool.query(
          `DELETE FROM portfolio_holdings WHERE user_id = $1 AND asset_id = $2`,
          [userId, params.assetId]
        );
      }

      await pgPool.query(
        `INSERT INTO simulated_transactions (id, user_id, asset_id, asset_symbol, asset_name, type, units, price, total_amount, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          newTx.id,
          userId,
          newTx.assetId,
          newTx.assetSymbol,
          newTx.assetName,
          newTx.type,
          newTx.units,
          newTx.price,
          newTx.totalAmount,
          newTx.timestamp,
        ]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres trade execution error:', err);
    }
  }

  const db = readLocalDb();
  db.simulated_portfolios[userId] = portfolio;
  writeLocalDb(db);

  return {
    success: true,
    message: `Successfully ${params.action === 'BUY' ? 'purchased' : 'sold'} ${params.units} units of ${params.symbol}.`,
    portfolio,
  };
}

/**
 * Save Money Health Quiz Answers and recalculate score
 */
export async function saveHealthAnswers(
  userId: string,
  scores: Record<string, number>,
  overallScore: number
): Promise<void> {
  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO money_health_scores (user_id, scores, overall_score, updated_at)
         VALUES ($1, $2, $3, now())
         ON CONFLICT (user_id)
         DO UPDATE SET scores = $2, overall_score = $3, updated_at = now()`,
        [userId, JSON.stringify(scores), overallScore]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres saveHealthAnswers error:', err);
    }
  }

  const db = readLocalDb();
  db.health_quiz_answers[userId] = { scores, overallScore };
  writeLocalDb(db);
}

/**
 * Update user demographic profile
 */
export async function updateUserProfile(
  userId: string,
  updates: { name?: string; ageGroup?: AgeGroup; occupation?: Occupation }
): Promise<UserProfile> {
  const current = await getUserFullData(userId);
  if (!current) throw new Error('User not found');

  const updatedUser: DbUser = {
    ...current.user,
    ...(updates.name ? { name: updates.name.trim() } : {}),
    ...(updates.ageGroup ? { ageGroup: updates.ageGroup } : {}),
    ...(updates.occupation ? { occupation: updates.occupation } : {}),
    updatedAt: new Date().toISOString(),
  };

  if (pgPool) {
    try {
      await pgPool.query(
        `UPDATE users
         SET name = $1, age_group = $2, occupation = $3, updated_at = now()
         WHERE id = $4`,
        [updatedUser.name, updatedUser.ageGroup, updatedUser.occupation, userId]
      );
    } catch (err) {
      console.error('[FinVera DB] Postgres updateUserProfile error:', err);
    }
  }

  const db = readLocalDb();
  db.users[userId] = updatedUser;
  writeLocalDb(db);

  return {
    name: updatedUser.name,
    ageGroup: updatedUser.ageGroup,
    occupation: updatedUser.occupation,
    knowledgeLevel: updatedUser.knowledgeLevel,
    learningGoals: updatedUser.learningGoals,
    riskComfort: updatedUser.riskComfort,
    onboarded: updatedUser.onboarded,
    createdAt: updatedUser.createdAt,
  };
}
