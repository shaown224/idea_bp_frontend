'use client';

import { Search, Users, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import heroRoom from '@/assets/landing_pic.jpg';

const Hero = () => {
  const router = useRouter();

  const handleSearchNavigation = () => {
    router.push('/search');
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-x-4 inset-y-0 md:inset-x-8 lg:inset-x-12">
        <Image 
          src={heroRoom}
          alt="Bachelor accommodation"
          fill
          className="object-cover rounded-3xl"
          priority
        />
        <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Verified Properties</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5" />
              <span className="text-sm">10,000+ Students</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm">4.8/5 Rating</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight bg-green-600 px-4 py-2 rounded-lg inline-block">
            <span className="block">
               Home for Bachelors
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            This platform helps you find affordable accommodation. Start with 5 free points!
          </p>

          {/* Search Section */}
          <div className="flex justify-center mb-8">
            <Button 
              variant="secondary" 
              size="xl" 
              className="h-14 px-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-green-600 hover:bg-green-700 flex items-center cursor-pointer"
              onClick={handleSearchNavigation}
            >
              <Search className="h-6 w-6 mr-3 text-white" />
              <span className="text-white">
              Find Your First Bachelor Home
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;