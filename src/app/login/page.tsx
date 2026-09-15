'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  TrendingUp,
  Zap,
} from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', length: 10 },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', length: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', length: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', length: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', length: 8 },
];

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  // Auth Method Tab: 'otp' | 'email'
  const [authMethod, setAuthMethod] = useState<'otp' | 'email'>('otp');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Mobile OTP States
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [sandboxOtp, setSandboxOtp] = useState<string | null>(null);

  // Email & Password States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // General States
  const [isLoading, setIsLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Refs for 6 OTP input boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown effect for OTP resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Handle Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode);
    const expectedLen = selectedCountry ? selectedCountry.length : 10;

    if (!cleanNumber || cleanNumber.length < expectedLen) {
      setError(`Please enter a valid ${expectedLen}-digit mobile number.`);
      return;
    }

    setIsLoading(true);
    const fullPhone = `${countryCode}${cleanNumber}`;

    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to send OTP. Please try again.');
        setIsLoading(false);
        return;
      }

      setOtpSent(true);
      setCountdown(30);
      if (data.devOtp) {
        setSandboxOtp(data.devOtp);
      }
      setSuccessMessage(`OTP sent to ${fullPhone}`);
      setIsLoading(false);

      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      console.error('OTP Send error:', err);
      setError('Network error while requesting OTP. Please check your connection.');
      setIsLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const numericVal = val.replace(/\D/g, '');
    const newDigits = [...otpDigits];

    if (!numericVal) {
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    newDigits[index] = numericVal.slice(-1);
    setOtpDigits(newDigits);

    if (index < 5 && numericVal) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setOtpDigits(newDigits);

    const nextIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = otpDigits.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const fullPhone = `${countryCode}${cleanNumber}`;

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid OTP code. Please check and try again.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Verified successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 400);
    } catch (err) {
      console.error('OTP Verify error:', err);
      setError('Network error while verifying OTP.');
      setIsLoading(false);
    }
  };

  // Handle Email & Password
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
      const bodyPayload = isRegisterMode ? { name: name || 'Investor', email, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || (isRegisterMode ? 'Registration failed.' : 'Invalid email or password.'));
        setIsLoading(false);
        return;
      }

      setSuccessMessage(isRegisterMode ? 'Account created! Redirecting...' : 'Welcome back! Logging you in...');
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 400);
    } catch (err) {
      console.error('Email auth error:', err);
      setError('A network error occurred. Please check your connection.');
      setIsLoading(false);
    }
  };

  // Instant Guest / Demo Login
  const handleGuestLogin = async () => {
    setError(null);
    setGuestLoading(true);

    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Guest session creation failed.');
        setGuestLoading(false);
        return;
      }

      setSuccessMessage('Demo Account Loaded! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 400);
    } catch (err) {
      console.error('Guest login error:', err);
      setError('Unable to initialize guest session.');
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F3] text-[#171717] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: BRAND HERO & HIGHLIGHTS                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#70E000] border-3 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center font-black text-[#171717] text-2xl">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-space-grotesk tracking-tight text-[#171717]">
                  FINVERA
                </span>
                <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717]">
                  PRO EDU
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Financial Learning & Investing OS
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] leading-tight">
              Master Money & Investing by Doing.
            </h1>
            <p className="text-sm font-medium text-[#171717]/80 leading-relaxed max-w-md">
              Step into interactive financial simulations, 25+ playable concepts, portfolio risk sandboxes, and real-time Indian market mastery.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#FFD84D] border border-[#171717] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-[#171717]" />
              </span>
              <div>
                <p className="text-xs font-black font-space-grotesk text-[#171717]">₹1,00,000</p>
                <p className="text-[10px] text-[#6B6B6B] font-bold">Virtual Capital</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#70E000] border border-[#171717] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#171717]" />
              </span>
              <div>
                <p className="text-xs font-black font-space-grotesk text-[#171717]">25+ Playables</p>
                <p className="text-[10px] text-[#6B6B6B] font-bold">Interactive Nodes</p>
              </div>
            </div>
          </div>

          {/* 1-Click Demo Callout */}
          <div className="p-4 rounded-xl bg-[#FFF9E6] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#171717] fill-[#FFD84D]" />
              <span className="text-xs font-black font-space-grotesk uppercase">Just Exploring?</span>
            </div>
            <p className="text-xs text-[#171717]/80 font-medium">
              You can jump straight into the full FinVera experience without typing any credentials.
            </p>
            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={guestLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hover:bg-[#FFD84D] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black font-space-grotesk text-[#171717] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {guestLoading ? (
                <span>INITIALIZING DEMO ACCOUNT...</span>
              ) : (
                <>
                  <span>INSTANT 1-CLICK DEMO LOGIN</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: INTERACTIVE AUTH CARD                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6">
          <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl shadow-[6px_6px_0px_#171717] p-6 sm:p-8 space-y-6">
            {/* Header / Tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717]">
                  {authMethod === 'otp' ? 'Instant OTP Sign In' : isRegisterMode ? 'Create New Account' : 'Welcome Back'}
                </h2>
                <span className="w-8 h-8 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex items-center justify-center text-[#171717]">
                  {authMethod === 'otp' ? <Smartphone className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </span>
              </div>

              {/* Method Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#F8F8F3] border-2 border-[#171717]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('otp');
                    setError(null);
                  }}
                  className={`py-2 rounded text-xs font-space-grotesk font-black transition-all cursor-pointer ${
                    authMethod === 'otp'
                      ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  📱 MOBILE OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('email');
                    setError(null);
                  }}
                  className={`py-2 rounded text-xs font-space-grotesk font-black transition-all cursor-pointer ${
                    authMethod === 'email'
                      ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  ✉️ EMAIL & PASSWORD
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-[#FFD4DF] border-2 border-[#171717] text-xs font-bold text-[#171717] flex items-center gap-2 shadow-[2px_2px_0px_#171717]">
                <AlertCircle className="w-4 h-4 text-[#171717] shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 rounded-lg bg-[#E7F9D1] border-2 border-[#171717] text-xs font-bold text-[#171717] flex items-center gap-2 shadow-[2px_2px_0px_#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#171717] shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* OTP FLOW */}
            {authMethod === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="text-xs font-black font-mono text-[#171717] block mb-1.5 uppercase">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-[#FFFFFF] border-2 border-[#171717] px-2 py-2.5 rounded-lg text-xs font-bold font-mono text-[#171717] shadow-[2px_2px_0px_#171717] focus:outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="98765 43210"
                          className="flex-1 bg-[#FFFFFF] border-2 border-[#171717] px-3.5 py-2.5 rounded-lg text-sm font-mono font-bold text-[#171717] placeholder-[#6B6B6B] shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hover:bg-[#FFD84D] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black font-space-grotesk text-[#171717] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? <span>SENDING OTP...</span> : <span>SEND VERIFICATION OTP</span>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    {/* Sandbox OTP Callout */}
                    {sandboxOtp && (
                      <div className="p-3 rounded-lg bg-[#FFD84D] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-xs space-y-1">
                        <p className="font-mono font-black uppercase text-[10px]">🛠️ Sandbox Environment Code:</p>
                        <p className="font-mono font-black text-base tracking-widest text-[#171717]">
                          {sandboxOtp}
                        </p>
                        <p className="text-[10px] text-[#171717]/80">Use this instant code to complete login.</p>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-black font-mono text-[#171717] block mb-2 uppercase">
                        Enter 6-Digit OTP Code
                      </label>
                      <div className="flex justify-between gap-1.5 sm:gap-2" onPaste={handleOtpPaste}>
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpInputRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-11 h-12 text-center text-lg font-mono font-black rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-[#171717] shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6]"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setSandboxOtp(null);
                        }}
                        className="text-[#6B6B6B] hover:text-[#171717] underline cursor-pointer"
                      >
                        Change Number
                      </button>

                      {countdown > 0 ? (
                        <span className="text-[#6B6B6B]">Resend in {countdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className="text-[#171717] underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hover:bg-[#FFD84D] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black font-space-grotesk text-[#171717] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? <span>VERIFYING...</span> : <span>VERIFY & ENTER FINVERA</span>}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* EMAIL FLOW */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isRegisterMode && (
                  <div>
                    <label className="text-xs font-black font-mono text-[#171717] block mb-1 uppercase">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-[#FFFFFF] border-2 border-[#171717] px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#171717] placeholder-[#6B6B6B] shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-black font-mono text-[#171717] block mb-1 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FFFFFF] border-2 border-[#171717] px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#171717] placeholder-[#6B6B6B] shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black font-mono text-[#171717] block mb-1 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FFFFFF] border-2 border-[#171717] pl-3.5 pr-10 py-2.5 rounded-lg text-sm font-medium text-[#171717] placeholder-[#6B6B6B] shadow-[2px_2px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#171717] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hover:bg-[#FFD84D] active:translate-x-0.5 active:translate-y-0.5 text-xs font-black font-space-grotesk text-[#171717] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <span>{isRegisterMode ? 'CREATE ACCOUNT' : 'SIGN IN WITH EMAIL'}</span>
                  )}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(!isRegisterMode);
                      setError(null);
                    }}
                    className="text-xs font-mono font-bold text-[#171717] hover:underline cursor-pointer"
                  >
                    {isRegisterMode
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Create one"}
                  </button>
                </div>
              </form>
            )}

            {/* Privacy note */}
            <div className="pt-2 border-t-2 border-[#171717] text-center text-[10px] font-mono text-[#6B6B6B]">
              <p>FinVera Educational Sandbox • Bank-grade simulated security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-[#171717] font-mono text-sm p-8">Loading FinVera Login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
