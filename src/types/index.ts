export type AgeGroup = '13-17' | '18-24' | '25-34' | '35+';

export type Occupation = 'student' | 'working' | 'entrepreneur' | 'other';

export type KnowledgeLevel = 'beginner' | 'intermediate' | 'advanced';

export type RiskComfort = 'cautious' | 'balanced' | 'growth';

export interface UserProfile {
  name: string;
  ageGroup: AgeGroup;
  occupation: Occupation;
  knowledgeLevel: KnowledgeLevel;
  learningGoals: string[];
  riskComfort: RiskComfort;
  onboarded: boolean;
  createdAt: string;
  phone?: string;
  email?: string;
  authProvider?: string;
  avatar?: string;
}

export type LessonLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ExplainSimplyData {
  technical: string;
  simple: string;
  analogy: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContentSection {
  title: string;
  body: string;
  keyTakeaways?: string[];
  visualHint?: string;
}

export interface ScenarioChoice {
  text: string;
  explanation: string;
  isOptimal?: boolean;
}

export interface RealLifeScenario {
  title: string;
  scenario: string;
  choices: ScenarioChoice[];
}

export interface Lesson {
  id: string;
  level: LessonLevel;
  levelName: string;
  order: number;
  title: string;
  shortDescription: string;
  xpReward: number;
  estimatedMinutes: number;
  concept: string;
  explainSimply: ExplainSimplyData;
  interactiveType:
    | 'compound-interest'
    | 'sip'
    | 'inflation'
    | 'emi'
    | 'savings-goal'
    | 'needs-vs-wants'
    | 'interactive-budget'
    | 'quiz-only';
  interactivePrompt?: string;
  interactiveInitialValues?: Record<string, number>;
  contentSections: LessonContentSection[];
  realLifeScenario: RealLifeScenario;
  quiz: QuizQuestion[];
}

export interface UserProgress {
  xp: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  unlockedLevels: number[];
  completedMissions: string[];
  exploredCalculators: string[];
  achievements: string[];
  weeklyActivity: boolean[]; // 7 days (Sun-Sat or Mon-Sun)
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface SimulatedAsset {
  id: string;
  symbol: string;
  name: string;
  category: 'Index Fund' | 'Equity' | 'ETF' | 'Commodity' | 'Debt';
  currentPrice: number;
  changePercent: number;
  description: string;
  risk: 'Low' | 'Moderate' | 'High';
  navOrPe: string;
  historicalGrowth: number[]; // 7 price points for mini sparkline
}

export interface PortfolioHolding {
  assetId: string;
  units: number;
  avgBuyPrice: number;
  totalInvested: number;
}

export interface SimulatedTransaction {
  id: string;
  timestamp: string;
  assetId: string;
  assetSymbol: string;
  assetName: string;
  type: 'BUY' | 'SELL';
  units: number;
  price: number;
  totalAmount: number;
}

export interface SimulatedPortfolio {
  virtualCash: number;
  holdings: Record<string, PortfolioHolding>;
  transactions: SimulatedTransaction[];
}

export type GlossaryCategory =
  | 'Money Basics'
  | 'Banking'
  | 'Credit'
  | 'Investing'
  | 'Markets'
  | 'Risk'
  | 'Taxes'
  | 'Wealth';

export type ConceptMasteryStatus = 'locked' | 'learning' | 'practicing' | 'tested' | 'mastered';

export interface PlayableConcept {
  id: string;
  term: string;
  category: GlossaryCategory;
  categoryIcon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  simpleOneLiner: string;
  definition: string;
  simpleExplanation: string;
  example: string;
  explanations: {
    beginner: string;
    normal: string;
    deepDive: string;
  };
  characterScenario: {
    name: string;
    avatar: string;
    story: string;
    takeaway: string;
  };
  visualDemo: {
    type:
      | 'inflation'
      | 'compounding'
      | 'diversification'
      | 'stock'
      | 'sip'
      | 'repo-rate'
      | 'bull-bear'
      | 'cibil-score'
      | 'emergency-fund'
      | 'generic';
    title: string;
    subtitle: string;
    explanation: string;
  };
  interactiveWidget: {
    type:
      | 'inflation-slider'
      | 'compound-sandbox'
      | 'diversify-basket'
      | 'sip-planner'
      | 'repo-toggle'
      | 'cibil-simulator'
      | 'budget-503020'
      | 'generic';
    title: string;
    instruction: string;
    defaultValues?: Record<string, number>;
  };
  quiz: {
    question: string;
    scenario: string;
    options: { text: string; isCorrect: boolean; explanation: string }[];
  };
  stillConfused: string;
  searchKeywords: string[];
  relatedFeature?: {
    label: string;
    href: string;
    iconName?: string;
  };
  relatedLessonId?: string;
  relatedCalculator?: string;
  order: number;
  prerequisiteId?: string;
}

// Backward-compatible alias
export type GlossaryTerm = PlayableConcept;

export interface ConceptComparison {
  id: string;
  title: string;
  badge: string;
  conceptA: {
    name: string;
    tag: string;
    description: string;
    bestFor: string;
    risk: string;
    example: string;
  };
  conceptB: {
    name: string;
    tag: string;
    description: string;
    bestFor: string;
    risk: string;
    example: string;
  };
  verdict: string;
}

export interface DailyFinanceChallenge {
  id: string;
  title: string;
  question: string;
  context: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  xpReward: number;
}

export interface MoneyMission {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  prompt: string;
  context: string;
  options: {
    id: string;
    label: string;
    feedback: string;
    isRecommended?: boolean;
  }[];
}

export interface HealthAssessmentAnswer {
  questionId: string;
  score: number; // 0 to 20
}

export interface LevelUnlockRequirement {
  level: LessonLevel;
  title: string;
  icon: string;
  color: string;
  requiredLessons: number;
  isUnlockedByDefault: boolean;
  description: string;
}
