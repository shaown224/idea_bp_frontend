'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  MapPin, 
  Users, 
  Calendar,
  TrendingUp,
  Heart,
  MessageCircle,
  MoreVertical,
  Filter,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import property1 from '@/assets/property1.jpg';
import property2 from '@/assets/property2.jpg';
import property3 from '@/assets/property3.jpg';

interface RentPost {
  id: string;
  title: string;
  description: string;
  location: string;
  division: string;
  district: string;
  rent: number;
  roomType: 'single' | 'shared' | 'family';
  images: StaticImageData[];
  amenities: string[];
  status: 'active' | 'paused' | 'rented';
  createdAt: string;
  views: number;
  favorites: number;
  messages: number;
  isPromoted: boolean;
}

const RentPostsPage = () => {
  const [language, setLanguage] = useState('en');
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'rented'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for user's rent posts
  const [rentPosts] = useState<RentPost[]>([
    {
      id: '1',
      title: 'Spacious Single Room in Dhanmondi',
      description: 'Beautiful single room with attached bathroom, balcony access, and all modern amenities.',
      location: 'Dhanmondi 15, Dhaka',
      division: 'Dhaka',
      district: 'Dhaka',
      rent: 12000,
      roomType: 'single',
      images: [property1, property2],
      amenities: ['wifi', 'ac', 'parking', 'security'],
      status: 'active',
      createdAt: '2024-01-15',
      views: 125,
      favorites: 18,
      messages: 7,
      isPromoted: true
    },
    {
      id: '2',
      title: 'Shared Room for Students',
      description: 'Affordable shared accommodation perfect for students near universities.',
      location: 'Mohammadpur, Dhaka',
      division: 'Dhaka',
      district: 'Dhaka',
      rent: 6000,
      roomType: 'shared',
      images: [property2, property3],
      amenities: ['wifi', 'kitchen', 'laundry'],
      status: 'active',
      createdAt: '2024-01-10',
      views: 89,
      favorites: 12,
      messages: 3,
      isPromoted: false
    },
    {
      id: '3',
      title: 'Family Apartment in Uttara',
      description: 'Spacious 2-bedroom apartment suitable for small families.',
      location: 'Uttara Sector 7, Dhaka',
      division: 'Dhaka',
      district: 'Dhaka',
      rent: 25000,
      roomType: 'family',
      images: [property3, property1],
      amenities: ['wifi', 'ac', 'parking', 'security', 'gym'],
      status: 'rented',
      createdAt: '2023-12-20',
      views: 200,
      favorites: 35,
      messages: 15,
      isPromoted: false
    }
  ]);

  const getStatusBadge = (status: RentPost['status']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
          {language === 'en' ? 'Active' : 'সক্রিয়'}
        </span>;
      case 'paused':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-50 text-yellow-700 border-yellow-200">
          {language === 'en' ? 'Paused' : 'বিরতি'}
        </span>;
      case 'rented':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">
          {language === 'en' ? 'Rented' : 'ভাড়া দেওয়া'}
        </span>;
      default:
        return null;
    }
  };

  const getRoomTypeLabel = (type: RentPost['roomType']) => {
    switch (type) {
      case 'single':
        return language === 'en' ? 'Single Room' : 'একক রুম';
      case 'shared':
        return language === 'en' ? 'Shared Room' : 'শেয়ার্ড রুম';
      case 'family':
        return language === 'en' ? 'Family Room' : 'পারিবারিক রুম';
      default:
        return type;
    }
  };

  const filteredPosts = rentPosts.filter(post => {
    const matchesFilter = filter === 'all' || post.status === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CFFFE2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'My Rent Posts' : 'আমার ভাড়ার পোস্ট'}
              </h1>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Manage your rental property listings'
                  : 'আপনার ভাড়ার সম্পত্তির তালিকা পরিচালনা করুন'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="bg-white"
              >
                {language === 'en' ? 'বাং' : 'Eng'}
              </Button>
              <Link href="/post-rent">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Post New Property' : 'নতুন প্রপার্টি পোস্ট'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Total Posts' : 'মোট পোস্ট'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{rentPosts.length}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Active Posts' : 'সক্রিয় পোস্ট'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {rentPosts.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Total Views' : 'মোট ভিউ'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rentPosts.reduce((sum, post) => sum + post.views, 0)}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Messages' : 'মেসেজ'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rentPosts.reduce((sum, post) => sum + post.messages, 0)}
                  </p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                {(['all', 'active', 'paused', 'rented'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                      filter === status
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {status === 'all' ? (language === 'en' ? 'All' : 'সব') :
                     status === 'active' ? (language === 'en' ? 'Active' : 'সক্রিয়') :
                     status === 'paused' ? (language === 'en' ? 'Paused' : 'বিরতি') :
                     (language === 'en' ? 'Rented' : 'ভাড়া দেওয়া')}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search posts...' : 'পোস্ট খুঁজুন...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(post.status)}
                </div>
                <div className="absolute top-3 right-3">
                  {post.isPromoted && (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-orange-500 text-white">
                      {language === 'en' ? 'Promoted' : 'প্রমোটেড'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {post.location}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {getRoomTypeLabel(post.roomType)}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">৳{post.rent.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'en' ? 'per month' : 'প্রতি মাসে'}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>

                {/* Analytics */}
                <div className="flex items-center justify-between mb-4 py-3 bg-gray-50 rounded-lg px-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.favorites}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.messages}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link href={`/property/${post.id}`}>
                      <Button variant="outline" size="sm" className="bg-white">
                        <Eye className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'View' : 'দেখুন'}
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="bg-white">
                      <Edit className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Edit' : 'এডিট'}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 bg-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Delete' : 'ডিলিট'}
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'en' ? 'No posts found' : 'কোন পোস্ট পাওয়া যায়নি'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Try adjusting your filters or create your first rental post'
                : 'আপনার ফিল্টার সামঞ্জস্য করুন বা আপনার প্রথম ভাড়ার পোস্ট তৈরি করুন'
              }
            </p>
            <Link href="/post-rent">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Post Your First Property' : 'আপনার প্রথম প্রপার্টি পোস্ট করুন'}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentPostsPage;