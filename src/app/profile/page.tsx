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
  Check,
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
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#171717]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
                <Settings className="w-3.5 h-3.5 text-[#171717]" />
                ACCOUNT & PREFERENCES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Profile & Learning Path
            </h1>
            <p className="text-sm font-medium text-[#171717]/75 mt-1 max-w-2xl">
              Manage your profile, tailor your curriculum cohort, and track overall milestone achievements.
            </p>
          </div>

          {savedSuccess && (
            <div className="px-4 py-2 rounded-lg bg-[#70E000] border-2 border-[#171717] text-[#171717] text-xs font-black flex items-center gap-1.5 animate-in fade-in shadow-[3px_3px_0px_#171717]">
              <CheckCircle2 className="w-4 h-4 text-[#171717]" />
              <span>Preferences Saved Successfully!</span>
            </div>
          )}
        </div>

        {/* User Stats Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[5px_5px_0px_#171717]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#171717]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#70E000] border-2 border-[#171717] flex items-center justify-center font-black text-[#171717] text-2xl shadow-[3px_3px_0px_#171717]">
                {profile.name ? profile.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
                  {profile.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#171717]/75 mt-0.5 font-bold">
                  <span className="capitalize">{profile.occupation}</span>
                  <span>•</span>
                  <span className="text-[#171717] bg-[#FFF9D2] px-2 py-0.5 rounded border border-[#171717]">
                    Age Cohort: {profile.ageGroup}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3.5 py-1.5 rounded bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] uppercase tracking-wider">
                {progress.levelTitle}
              </span>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6">
            <div className="p-4 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] text-center shadow-[2px_2px_0px_#171717]">
              <div className="flex items-center justify-center gap-1 text-[#171717] font-black text-xl font-space-grotesk">
                <Zap className="w-4 h-4 fill-[#70E000] text-[#171717]" />
                <span>{progress.xp}</span>
              </div>
              <p className="text-[11px] text-[#171717]/70 mt-0.5 font-black uppercase tracking-wider">Knowledge XP</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] text-center shadow-[2px_2px_0px_#171717]">
              <div className="flex items-center justify-center gap-1 text-[#171717] font-black text-xl font-space-grotesk">
                <Flame className="w-4 h-4 fill-[#FF5C35] text-[#171717]" />
                <span>{progress.streakDays}</span>
              </div>
              <p className="text-[11px] text-[#171717]/70 mt-0.5 font-black uppercase tracking-wider">Streak Days</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] text-center shadow-[2px_2px_0px_#171717]">
              <div className="flex items-center justify-center gap-1 text-[#171717] font-black text-xl font-space-grotesk">
                <BookOpen className="w-4 h-4 text-[#171717]" />
                <span>{progress.completedLessonIds.length}</span>
              </div>
              <p className="text-[11px] text-[#171717]/70 mt-0.5 font-black uppercase tracking-wider">Lessons Done</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] text-center shadow-[2px_2px_0px_#171717]">
              <div className="flex items-center justify-center gap-1 text-[#171717] font-black text-xl font-space-grotesk">
                <Award className="w-4 h-4 text-[#171717]" />
                <span>{progress.achievements.length}</span>
              </div>
              <p className="text-[11px] text-[#171717]/70 mt-0.5 font-black uppercase tracking-wider">Badges Won</p>
            </div>
          </div>
        </div>

        {/* Edit Settings Form */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[5px_5px_0px_#171717] space-y-6"
        >
          <div className="pb-4 border-b-2 border-[#171717]">
            <h3 className="text-lg font-black font-space-grotesk text-[#171717] tracking-tight flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#171717]" />
              <span>Learning & Cohort Settings</span>
            </h3>
            <p className="text-xs text-[#171717]/75 font-medium mt-0.5">
              Selecting your life stage recalibrates your customized dashboard tracks and simulator scenarios.
            </p>
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#171717]">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAFAF7] border-2 border-[#171717] px-4 py-2.5 rounded-lg text-sm text-[#171717] font-bold shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9D2]"
              required
            />
          </div>

          {/* AGE-BASED PERSONALIZATION SWITCHER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#171717]">
                Target Age Group Cohort
              </label>
              <span className="text-xs text-[#171717] font-mono font-bold bg-[#70E000] px-2 py-0.5 rounded border border-[#171717]">
                Active: {selectedAge}
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
                    className={`py-3 px-4 rounded-xl border-2 border-[#171717] text-sm font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-[#70E000] text-[#171717] shadow-[3px_3px_0px_#171717] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-[#FAFAF7] text-[#171717] hover:bg-[#FFF9D2] shadow-[2px_2px_0px_#171717]'
                    }`}
                  >
                    <span className="font-space-grotesk">{range}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717]/70">
                      {range === '13-17'
                        ? 'Teen/Student'
                        : range === '18-24'
                        ? 'Young Adult'
                        : range === '25-34'
                        ? 'Early Career'
                        : 'Wealth Builder'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Age cohort focus preview banner */}
            <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] space-y-2 shadow-[2px_2px_0px_#171717]">
              <div className="flex items-center gap-2">
                <span className="font-black text-[#171717]">{activeAgeConfig.title}:</span>
                <span className="text-[#171717]/80 font-medium">{activeAgeConfig.tagline}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeAgeConfig.focusTopics.map((topic) => (
                  <span
                    key={topic}
                    className="text-[11px] font-black px-2.5 py-0.5 rounded bg-[#FFFFFF] border border-[#171717] text-[#171717]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#171717]">Primary Occupation</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {OCCUPATION_OPTIONS.map((occ) => {
                const isSelected = selectedOccupation === occ.id;
                return (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setSelectedOccupation(occ.id)}
                    className={`p-3.5 rounded-lg border-2 border-[#171717] text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#70E000] text-[#171717] shadow-[2px_2px_0px_#171717]'
                        : 'bg-[#FAFAF7] text-[#171717] hover:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]'
                    }`}
                  >
                    <span>{occ.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#171717] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="nb-btn nb-btn-primary w-full py-3.5 px-5 text-sm font-black"
          >
            Save Preference Changes
          </button>
        </form>

        {/* Local Data Storage Area */}
        <div className="p-6 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] text-xs text-[#171717]/75 space-y-4 shadow-[3px_3px_0px_#171717]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-[#171717]">Local Cache & Storage</h4>
              <p className="text-xs text-[#171717]/70 mt-0.5 font-medium">
                All course progress, simulated trades, and test scores persist on your device.
              </p>
            </div>

            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-lg border-2 border-[#171717] bg-[#FF5C35] text-[#FFFFFF] hover:opacity-90 transition-all font-black text-xs shadow-[2px_2px_0px_#171717] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Reset All Progress</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-[#FF5C35] text-white border-2 border-[#171717] font-black text-xs shadow-[2px_2px_0px_#171717] cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-[#FAFAF7] text-[#171717] border-2 border-[#171717] font-bold text-xs hover:bg-[#FFF9D2] cursor-pointer"
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
