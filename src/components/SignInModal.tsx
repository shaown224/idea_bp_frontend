'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Shield, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DIVISIONS } from '@/constants';

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

const SignInModal = () => {
  const { isSignInModalOpen, closeSignInModal } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [resendTimer, setResendTimer] = useState(0);

  // Signup form fields
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    division: '',
    district: '',
    address: ''
  });

  // Districts for each division
  const districtsByDivision: Record<string, string[]> = {
    'Dhaka': ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
    'Chittagong': ['Chittagong', 'Bandarban', 'Brahmanbaria', 'Chandpur', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
    'Sylhet': ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
    'Rajshahi': ['Rajshahi', 'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Sirajganj'],
    'Khulna': ['Khulna', 'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
    'Barisal': ['Barisal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrakona', 'Sherpur']
  };

  // Reset state when modal opens
  const resetModal = () => {
    setStep('phone');
    setMode('signin');
    setPhone('');
    setSignupData({
      name: '',
      email: '',
      division: '',
      district: '',
      address: ''
    });
    setError('');
    setResendTimer(0);
  };

  const handleClose = () => {
    resetModal();
    closeSignInModal();
  };

  const validateSignupForm = () => {
    if (mode === 'signup') {
      if (!signupData.name.trim()) {
        setError(language === 'en' ? 'Please enter your name' : 'আপনার নাম লিখুন');
        return false;
      }
      if (!signupData.email.trim() || !signupData.email.includes('@')) {
        setError(language === 'en' ? 'Please enter a valid email' : 'একটি বৈধ ইমেইল দিন');
        return false;
      }
      if (!signupData.division) {
        setError(language === 'en' ? 'Please select your division' : 'আপনার বিভাগ নির্বাচন করুন');
        return false;
      }
      if (!signupData.district) {
        setError(language === 'en' ? 'Please select your district' : 'আপনার জেলা নির্বাচন করুন');
        return false;
      }
      if (!signupData.address.trim()) {
        setError(language === 'en' ? 'Please enter your address' : 'আপনার ঠিকানা লিখুন');
        return false;
      }
    }
    return true;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!phone || phone.length < 11) {
      setError(language === 'en' ? 'Please enter a valid phone number' : 'একটি বৈধ ফোন নম্বর দিন');
      return;
    }

    // Validate signup form if in signup mode
    if (!validateSignupForm()) {
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
    } catch {
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
          handleClose();
        }, 2000);
      } else {
        setError(language === 'en' ? 'Invalid OTP. Please try again.' : 'ভুল OTP। আবার চেষ্টা করুন।');
      }
    } catch {
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
    } catch {
      setError(language === 'en' ? 'Failed to resend OTP' : 'OTP পুনরায় পাঠাতে ব্যর্থ');
    } finally {
      setLoading(false);
    }
  };

  if (!isSignInModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Success Step */}
        {step === 'success' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {mode === 'signup' 
                  ? (language === 'en' ? 'Account Created Successfully!' : 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!')
                  : (language === 'en' ? 'Welcome Back!' : 'আবার স্বাগতম!')
                }
              </h2>
              <p className="text-gray-600">
                {mode === 'signup'
                  ? (language === 'en' 
                      ? 'You have successfully created your account!' 
                      : 'আপনি সফলভাবে আপনার অ্যাকাউন্ট তৈরি করেছেন!'
                    )
                  : (language === 'en' 
                      ? 'You have successfully signed in!' 
                      : 'আপনি সফলভাবে সাইন ইন করেছেন!'
                    )
                }
              </p>
            </div>
          </div>
        )}

        {/* Phone/OTP Steps */}
        {step !== 'success' && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                {step === 'phone' ? (
                  <Phone className="h-12 w-12 text-green-500 mx-auto" />
                ) : (
                  <Shield className="h-12 w-12 text-green-500 mx-auto" />
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 'phone' 
                  ? (mode === 'signin'
                      ? (language === 'en' ? 'Sign In to Bachelor Point' : 'Bachelor Point এ সাইন ইন করুন')
                      : (language === 'en' ? 'Create Your Account' : 'আপনার অ্যাকাউন্ট তৈরি করুন')
                    )
                  : (language === 'en' ? 'Verify Your Number' : 'আপনার নম্বর যাচাই করুন')
                }
              </h1>
              
              <p className="text-gray-600">
                {step === 'phone' 
                  ? (mode === 'signin'
                      ? (language === 'en' 
                          ? 'Enter your phone number to sign in'
                          : 'সাইন ইন করতে আপনার ফোন নম্বর দিন'
                        )
                      : (language === 'en' 
                          ? 'Fill in your details to create an account'
                          : 'অ্যাকাউন্ট তৈরি করতে আপনার তথ্য দিন'
                        )
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
                {/* Mode Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      mode === 'signin' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {language === 'en' ? 'Sign In' : 'সাইন ইন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      mode === 'signup' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {language === 'en' ? 'Create Account' : 'অ্যাকাউন্ট তৈরি'}
                  </button>
                </div>

                {/* Signup Fields */}
                {mode === 'signup' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Full Name' : 'পূর্ণ নাম'}
                      </label>
                      <Input
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        placeholder={language === 'en' ? 'Enter your full name' : 'আপনার পূর্ণ নাম লিখুন'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'}
                      </label>
                      <Input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        placeholder={language === 'en' ? 'Enter your email' : 'আপনার ইমেইল লিখুন'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Division' : 'বিভাগ'}
                      </label>
                      <select
                        value={signupData.division}
                        onChange={(e) => setSignupData({...signupData, division: e.target.value, district: ''})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">
                          {language === 'en' ? 'Select Division' : 'বিভাগ নির্বাচন করুন'}
                        </option>
                        {DIVISIONS.map((division) => (
                          <option key={division} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'District' : 'জেলা'}
                      </label>
                      <select
                        value={signupData.district}
                        onChange={(e) => setSignupData({...signupData, district: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        disabled={!signupData.division}
                      >
                        <option value="">
                          {language === 'en' ? 'Select District' : 'জেলা নির্বাচন করুন'}
                        </option>
                        {signupData.division && districtsByDivision[signupData.division]?.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Address' : 'ঠিকানা'}
                      </label>
                      <Input
                        type="text"
                        value={signupData.address}
                        onChange={(e) => setSignupData({...signupData, address: e.target.value})}
                        placeholder={language === 'en' ? 'Enter your address' : 'আপনার ঠিকানা লিখুন'}
                        required
                      />
                    </div>
                  </div>
                )}

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
                    : (mode === 'signup'
                        ? (language === 'en' ? 'Create Account & Send OTP' : 'অ্যাকাউন্ট তৈরি করুন ও OTP পাঠান')
                        : (language === 'en' ? 'Send OTP' : 'OTP পাঠান')
                      )
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
                {mode === 'signup' 
                  ? (language === 'en' 
                      ? 'By creating an account, you agree to our Terms of Service and Privacy Policy'
                      : 'অ্যাকাউন্ট তৈরি করে আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন'
                    )
                  : (language === 'en' 
                      ? 'By signing in, you agree to our Terms of Service and Privacy Policy'
                      : 'সাইন ইন করে আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন'
                    )
                }
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInModal;