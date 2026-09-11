'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { AgeGroup, Occupation } from '../../types';
import { AGE_CURRICULUM_DATA } from '../../data/ageCurriculumData';
import {
  User,
  Settings,
  Sparkles,
  Zap,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

const AGE_OPTIONS: AgeGroup[] = ['13-17', '18-24', '25-34', '35+'];
const OCCUPATION_OPTIONS: { id: Occupation; label: string }[] = [
  { id: 'student', label: 'Student' },
  { id: 'working', label: 'Working Professional' },
  { id: 'entrepreneur', label: 'Entrepreneur / Freelancer' },
  { id: 'other', label: 'Other' },
];

export default function ProfilePage() {
  const { profile, progress, updateProfile, setAgeGroup, resetAllData } = useUserState();

  const [name, setName] = useState(profile.name);
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(profile.ageGroup);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation>(profile.occupation);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activeAgeConfig = AGE_CURRICULUM_DATA[selectedAge];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      ageGroup: selectedAge,
      occupation: selectedOccupation,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    setName('Aarav');
    setSelectedAge('18-24');
    setSelectedOccupation('student');
    setSavedSuccess(true);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Account & Preferences
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Profile & Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Customize your learning cohort, manage profile details, and review statistics.
            </p>
          </div>

          {savedSuccess && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved!</span>
            </div>
          )}
        </div>

        {/* User Stats Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center font-bold text-slate-950 text-2xl shadow-lg shadow-emerald-500/20">
                {profile.name ? profile.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="capitalize">{profile.occupation}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    Age Group {profile.ageGroup}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                {progress.levelTitle}
              </span>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-xl font-mono">
                <Zap className="w-4 h-4 fill-emerald-400" />
                <span>{progress.xp}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Total XP</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-xl font-mono">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{progress.streakDays}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Streak Days</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-teal-400 font-extrabold text-xl font-mono">
                <BookOpen className="w-4 h-4" />
                <span>{progress.completedLessonIds.length}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Lessons Done</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 font-extrabold text-xl font-mono">
                <Award className="w-4 h-4" />
                <span>{progress.achievements.length}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Badges Earned</p>
            </div>
          </div>
        </div>

        {/* Edit Settings Form */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Learning & Demographic Settings</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjusting your age group automatically personalizes the learning topics and examples on your dashboard.
            </p>
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* 1. AGE-BASED PERSONALIZATION SWITCHER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                What&apos;s your age group? (Personalization Cohort)
              </label>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                Currently: {selectedAge}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AGE_OPTIONS.map((range) => {
                const isSelected = selectedAge === range;
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedAge(range)}
                    className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{range}</span>
                    <span className="text-[10px] font-normal text-slate-500">
                      {range === '13-17'
                        ? 'Teen/Student'
                        : range === '18-24'
                        ? 'Young Adult'
                        : range === '25-34'
                        ? 'Early Career'
                        : 'Capital Mastery'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Age cohort focus preview banner */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{activeAgeConfig.title}:</span>
                <span className="text-slate-400">{activeAgeConfig.tagline}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeAgeConfig.focusTopics.map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Occupation Status</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {OCCUPATION_OPTIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setSelectedOccupation(occ.id)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    selectedOccupation === occ.id
                      ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Save Changes
          </button>
        </form>

        {/* Development & Reset Data Area */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-200">Local Data Storage</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                All progress, virtual trading portfolio, and quiz answers are saved locally.
              </p>
            </div>

            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3.5 py-1.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/15 transition-colors font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
