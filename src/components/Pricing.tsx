'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  nameLocal: string;
  points: number;
  price: number;
  currency: string;
  icon: React.ReactNode;
  features: string[];
  featuresLocal: string[];
  popular?: boolean;
  description: string;
  descriptionLocal: string;
}

const Pricing = () => {
  const [language, setLanguage] = useState('en');

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      nameLocal: 'স্টার্টার প্যাক',
      points: 5,
      price: 50,
      currency: '৳',
      icon: <Zap className="h-6 w-6" />,
      description: 'Perfect for finding your first place',
      descriptionLocal: 'আপনার প্রথম জায়গা খুঁজে নেওয়ার জন্য পারফেক্ট',
      features: [
        'Contact 5 property owners',
        'View detailed property info',
        'Save favorites',
        'Basic support'
      ],
      featuresLocal: [
        '৫ জন বাড়িওয়ালার সাথে যোগাযোগ',
        'বিস্তারিত সম্পত্তির তথ্য দেখুন',
        'পছন্দের তালিকা সংরক্ষণ',
        'বেসিক সাপোর্ট'
      ]
    },
    {
      id: 'popular',
      name: 'Popular Pack',
      nameLocal: 'পপুলার প্যাক',
      points: 10,
      price: 80,
      currency: '৳',
      icon: <Star className="h-6 w-6" />,
      description: 'Most chosen by students',
      descriptionLocal: 'ছাত্রছাত্রীদের মধ্যে সবচেয়ে জনপ্রিয়',
      popular: true,
      features: [
        'Contact 10 property owners',
        'Priority listing placement',
        'Advanced search filters',
        'Email notifications',
        'Priority support'
      ],
      featuresLocal: [
        '১০ জন বাড়িওয়ালার সাথে যোগাযোগ',
        'অগ্রাধিকার ভিত্তিক লিস্টিং',
        'উন্নত সার্চ ফিল্টার',
        'ইমেইল নোটিফিকেশন',
        'অগ্রাধিকার সাপোর্ট'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      nameLocal: 'প্রিমিয়াম প্যাক',
      points: 20,
      price: 150,
      currency: '৳',
      icon: <Crown className="h-6 w-6" />,
      description: 'Best value for serious searchers',
      descriptionLocal: 'গুরুত্বপূর্ণ খোজার জন্য সেরা মূল্য',
      features: [
        'Contact 20 property owners',
        'Featured listing badge',
        'Unlimited saved searches',
        'WhatsApp & phone support',
        'Property viewing assistance',
        'Negotiation tips'
      ],
      featuresLocal: [
        '২০ জন বাড়িওয়ালার সাথে যোগাযোগ',
        'ফিচার্ড লিস্টিং ব্যাজ',
        'আনলিমিটেড সেভ করা সার্চ',
        'হোয়াটসঅ্যাপ ও ফোন সাপোর্ট',
        'সম্পত্তি দেখার সহায়তা',
        'দামাদামির পরামর্শ'
      ]
    }
  ];

  const PricingCard = ({ plan }: { plan: PricingPlan }) => (
    <div 
      className={`relative rounded-2xl p-8 ${
        plan.popular 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 shadow-xl scale-105' 
          : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            {language === 'en' ? 'Most Popular' : 'সবচেয়ে জনপ্রিয়'}
          </span>
        </div>
      )}
      
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          plan.popular ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {plan.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'en' ? plan.name : plan.nameLocal}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {language === 'en' ? plan.description : plan.descriptionLocal}
        </p>
        
        <div className="mb-8">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-gray-900">{plan.currency}{plan.price}</span>
            <span className="text-gray-600 ml-2">
              / {plan.points} {language === 'en' ? 'points' : 'পয়েন্ট'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {language === 'en' 
              ? `${plan.currency}${(plan.price / plan.points).toFixed(1)} per point`
              : `প্রতি পয়েন্ট ${plan.currency}${(plan.price / plan.points).toFixed(1)}`
            }
          </p>
        </div>
        
        <Button 
          className={`w-full mb-8 ${
            plan.popular 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          size="lg"
        >
          {language === 'en' ? 'Choose Plan' : 'প্ল্যান বেছে নিন'}
        </Button>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'What\'s included:' : 'যা অন্তর্ভুক্ত:'}
        </h4>
        {(language === 'en' ? plan.features : plan.featuresLocal).map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Package Pricing' : 'সহজ, স্বচ্ছ মূল্য'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Choose the perfect plan for your accommodation search. Pay only for what you need with our point-based system.'
              : 'আপনার বাসস্থান খোঁজার জন্য পারফেক্ট প্ল্যান বেছে নিন। আমাদের পয়েন্ট-ভিত্তিক সিস্টেমে শুধু প্রয়োজনীয় অংশের জন্য অর্থ প্রদান করুন।'
            }
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  language === 'bn' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'en' ? 'Frequently Asked Questions' : 'প্রায়শই জিজ্ঞাসিত প্রশ্ন'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'How do points work?' : 'পয়েন্ট কীভাবে কাজ করে?'}
              </h4>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Each point allows you to contact one property owner directly. Points are deducted only when you successfully make contact.'
                  : 'প্রতিটি পয়েন্ট আপনাকে একজন বাড়িওয়ালার সাথে সরাসরি যোগাযোগ করতে দেয়। শুধুমাত্র সফল যোগাযোগের সময় পয়েন্ট কাটা হয়।'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Do points expire?' : 'পয়েন্টের মেয়াদ শেষ হয়?'}
              </h4>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Points are valid for 6 months from purchase date. You can use them anytime within this period.'
                  : 'পয়েন্ট ক্রয়ের তারিখ থেকে ৬ মাস পর্যন্ত বৈধ। এই সময়ের মধ্যে যেকোনো সময় ব্যবহার করতে পারবেন।'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Can I upgrade my plan?' : 'আমি কি প্ল্যান আপগ্রেড করতে পারি?'}
              </h4>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Yes! You can purchase additional points anytime. Your existing points will remain valid.'
                  : 'হ্যাঁ! আপনি যেকোনো সময় অতিরিক্ত পয়েন্ট ক্রয় করতে পারেন। আপনার বিদ্যমান পয়েন্ট বৈধ থাকবে।'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'What payment methods do you accept?' : 'কী কী পেমেন্ট পদ্ধতি গ্রহণ করেন?'}
              </h4>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We accept bKash, Nagad, Rocket, and all major credit/debit cards for your convenience.'
                  : 'আপনার সুবিধার জন্য আমরা বিকাশ, নগদ, রকেট এবং সব ধরনের ক্রেডিট/ডেবিট কার্ড গ্রহণ করি।'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;