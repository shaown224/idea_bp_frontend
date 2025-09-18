'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Phone, Shield, Check } from 'lucide-react';
import Link from 'next/link';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

const OTPInput = ({ length, onComplete, disabled }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }

    // Check if OTP is complete
    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const previousInput = e.currentTarget.previousSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-12 h-12 border-2 rounded-lg text-center text-xl font-bold focus:border-green-500 focus:outline-none disabled:bg-gray-100"
        />
      ))}
    </div>
  );
};

const SignIn = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [resendTimer, setResendTimer] = useState(0);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!phone || phone.length < 11) {
      setError(language === 'en' ? 'Please enter a valid phone number' : 'একটি বৈধ ফোন নম্বর দিন');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('otp');
      setResendTimer(60);
      
      // Start countdown
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError(language === 'en' ? 'Failed to send OTP. Please try again.' : 'OTP পাঠাতে ব্যর্থ। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPComplete = async (otp: string) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6) {
        setStep('success');
        setTimeout(() => {
          // Redirect to dashboard or home
          window.location.href = '/';
        }, 2000);
      } else {
        setError(language === 'en' ? 'Invalid OTP. Please try again.' : 'ভুল OTP। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      setError(language === 'en' ? 'Failed to verify OTP. Please try again.' : 'OTP যাচাই করতে ব্যর্থ। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(60);
      
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError(language === 'en' ? 'Failed to resend OTP' : 'OTP পুনরায় পাঠাতে ব্যর্থ');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Welcome to Bachelor Point!' : 'Bachelor Point এ স্বাগতম!'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'You have successfully signed in. Redirecting...' 
                : 'আপনি সফলভাবে সাইন ইন করেছেন। পুনর্নিদেশ করা হচ্ছে...'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Back to Home' : 'হোমে ফিরে যান'}
          </Link>
          
          <div className="mb-4">
            {step === 'phone' ? (
              <Phone className="h-12 w-12 text-green-500 mx-auto" />
            ) : (
              <Shield className="h-12 w-12 text-green-500 mx-auto" />
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone' 
              ? (language === 'en' ? 'Sign in' : 'সাইন ইন করুন')
              : (language === 'en' ? 'Verify Your Number' : 'আপনার নম্বর যাচাই করুন')
            }
          </h1>
          
          <p className="text-gray-600">
            {step === 'phone' 
              ? (language === 'en' 
                  ? 'Enter your phone number to get started'
                  : 'শুরু করতে আপনার ফোন নম্বর দিন'
                )
              : (language === 'en' 
                  ? `We sent a verification code to ${phone}`
                  : `আমরা ${phone} নম্বরে একটি যাচাইকরণ কোড পাঠিয়েছি`
                )
            }
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                language === 'bn' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* Phone Number Step */}
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Phone Number' : 'ফোন নম্বর'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  +880
                </span>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder={language === 'en' ? '1xxxxxxxxx' : '১xxxxxxxxx'}
                  className="pl-16 text-lg"
                  maxLength={11}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'en' 
                  ? 'Enter your 11-digit mobile number'
                  : 'আপনার ১১ সংখ্যার মোবাইল নম্বর দিন'
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              disabled={loading || !phone}
            >
              {loading 
                ? (language === 'en' ? 'Sending OTP...' : 'OTP পাঠানো হচ্ছে...')
                : (language === 'en' ? 'Send OTP' : 'OTP পাঠান')
              }
            </Button>
          </form>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                {language === 'en' ? 'Enter 6-digit code' : '৬ সংখ্যার কোড দিন'}
              </label>
              <OTPInput 
                length={6} 
                onComplete={handleOTPComplete}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' ? "Didn't receive the code?" : 'কোড পাননি?'}
              </p>
              
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  {language === 'en' 
                    ? `Resend in ${resendTimer}s`
                    : `${resendTimer}সে পুনরায় পাঠান`
                  }
                </p>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  {language === 'en' ? 'Resend OTP' : 'OTP পুনরায় পাঠান'}
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setStep('phone')}
              className="w-full"
            >
              {language === 'en' ? 'Change Phone Number' : 'ফোন নম্বর পরিবর্তন করুন'}
            </Button>
          </div>
        )}

        {/* Terms */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            {language === 'en' 
              ? 'By signing in, you agree to our Terms of Service and Privacy Policy'
              : 'সাইন ইন করে আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;