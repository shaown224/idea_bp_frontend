'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, MessageCircle, MapPin, Globe, Coins } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [userPoints, setUserPoints] = useState(5);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const { openSignInModal } = useAuth();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser({ name: '', email: '' });
    setShowProfileDropdown(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <header className="bg-[#CFFFE2] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="gradient-primary p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bachelor Point</h1>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Find Your Perfect Stay' : 'আপনার আদর্শ থাকার জায়গা খুঁজুন'}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-gray-600 hover:text-gray-900 hover:bg-green-50 px-3 py-2 rounded-md transition-all duration-300">
              {language === 'en' ? 'Find Home' : 'বাড়ি খুঁজুন'}
            </Link>
            <Link href="/post-rent" className="text-gray-600 hover:text-gray-900 hover:bg-green-50 px-3 py-2 rounded-md transition-all duration-300">
              {language === 'en' ? 'Post Rent' : 'ভাড়া দিন'}
            </Link>
            <a href="#features" className="text-gray-600 hover:text-gray-900 hover:bg-green-50 px-3 py-2 rounded-md transition-all duration-300">
              {language === 'en' ? 'How it Works' : 'কীভাবে কাজ করে'}
            </a>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 hover:bg-green-50 px-3 py-2 rounded-md transition-all duration-300">
              {language === 'en' ? 'Pricing' : 'মূল্য'}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-200">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{userPoints}</span>
              <span className="text-sm">{language === 'en' ? 'Points' : 'পয়েন্ট'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1 hover:bg-gray-100 transition-all duration-300"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'বাং' : 'ENG'}</span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-all duration-300">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-all duration-300">
              <Heart className="h-4 w-4" />
            </Button>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                      <Link
                        href="/dashboard/rent-posts"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a2 2 0 00-2-2v0a2 2 0 00-2 2v9m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12" />
                        </svg>
                        {language === 'en' ? 'My Rent Posts' : 'আমার ভাড়ার পোস্ট'}
                      </Link>
                      <Link
                        href="/profile/edit"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {language === 'en' ? 'Edit Profile' : 'প্রোফাইল এডিট'}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {language === 'en' ? 'Sign Out' : 'সাইন আউট'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openSignInModal()}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                {language === 'en' ? 'Sign In' : 'সাইন ইন'}
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/search" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-300">
                {language === 'en' ? 'Find Your First Home' : 'ব্যাচেলর বাড়ি খুঁজুন'}
              </Link>
              <Link href="/post-rent" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-300">
                {language === 'en' ? 'Post Rent' : 'ভাড়া দিন'}
              </Link>
              <a href="#features" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-300">
                {language === 'en' ? 'How it Works' : 'কীভাবে কাজ করে'}
              </a>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-300">
                {language === 'en' ? 'Pricing' : 'মূল্য'}
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-1 bg-green-100 text-green-800 px-3 py-2 rounded-full border border-green-200">
                  <Coins className="h-4 w-4" />
                  <span className="font-semibold">{userPoints}</span>
                  <span className="text-sm">{language === 'en' ? 'Points' : 'পয়েন্ট'}</span>
                </div>
                
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-md">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard/rent-posts"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-9a2 2 0 00-2-2v0a2 2 0 00-2 2v9m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12" />
                      </svg>
                      {language === 'en' ? 'My Rent Posts' : 'আমার ভাড়ার পোস্ট'}
                    </Link>
                    <Link
                      href="/profile/edit"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {language === 'en' ? 'Edit Profile' : 'প্রোফাইল এডিট'}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {language === 'en' ? 'Sign Out' : 'সাইন আউট'}
                    </button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => openSignInModal()}
                  >
                    {language === 'en' ? 'Sign In' : 'সাইন ইন'}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
