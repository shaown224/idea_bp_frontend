'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, Bed, Bath, Users, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Image, { StaticImageData } from 'next/image';
import property1 from '@/assets/property1.jpg';
import property2 from '@/assets/property2.jpg';
import property3 from '@/assets/property3.jpg';

interface RentalPost {
  id: string;
  title: string;
  location: string;
  division: string;
  price: number;
  roomType: string;
  bedrooms: number;
  bathrooms: number;
  maxOccupancy: number;
  rating: number;
  reviews: number;
  images: (string | StaticImageData)[];
  description: string;
  amenities: string[];
  available: boolean;
}

// Mock data for rental posts
const mockRentalPosts: RentalPost[] = [
  {
    id: '1',
    title: 'Cozy Single Room in Dhanmondi',
    location: 'Dhanmondi 15, Dhaka',
    division: 'dhaka',
    price: 8000,
    roomType: 'single',
    bedrooms: 1,
    bathrooms: 1,
    maxOccupancy: 1,
    rating: 4.5,
    reviews: 23,
    images: [property1],
    description: 'Comfortable single room perfect for students. Close to university.',
    amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen Access'],
    available: true
  },
  {
    id: '2',
    title: 'Shared Room for Students',
    location: 'Mohammadpur, Dhaka',
    division: 'dhaka',
    price: 5000,
    roomType: 'shared',
    bedrooms: 1,
    bathrooms: 1,
    maxOccupancy: 2,
    rating: 4.2,
    reviews: 15,
    images: [property2],
    description: 'Affordable shared accommodation with all basic facilities.',
    amenities: ['WiFi', 'Common Kitchen', 'Study Area'],
    available: true
  },
  {
    id: '3',
    title: 'Family Apartment in Uttara',
    location: 'Uttara Sector 10, Dhaka',
    division: 'dhaka',
    price: 15000,
    roomType: 'family',
    bedrooms: 2,
    bathrooms: 2,
    maxOccupancy: 4,
    rating: 4.8,
    reviews: 42,
    images: [property3],
    description: 'Spacious family apartment with modern amenities.',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Balcony'],
    available: true
  }
];

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<RentalPost[]>(mockRentalPosts);
  const [filteredPosts, setFilteredPosts] = useState<RentalPost[]>(mockRentalPosts);
  const [showFilters, setShowFilters] = useState(false);
  
  // Search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);

  const bangladeshDivisions = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 
    'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
  ];

  const roomTypes = [
    { value: 'single', label: 'Single Room' },
    { value: 'shared', label: 'Shared Room' },
    { value: 'family', label: 'Family Room' }
  ];

  useEffect(() => {
    // Get initial search parameters from URL
    const division = searchParams.get('division');
    const area = searchParams.get('area');
    
    if (division) {
      setSelectedDivision(division);
    }
    
    if (area) {
      setSearchQuery(area);
    }
  }, [searchParams]);

  useEffect(() => {
    // Filter posts based on search criteria
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDivision) {
      filtered = filtered.filter(post => 
        post.division === selectedDivision.toLowerCase()
      );
    }

    if (selectedRoomType) {
      filtered = filtered.filter(post => post.roomType === selectedRoomType);
    }

    filtered = filtered.filter(post => 
      post.price >= priceRange[0] && post.price <= priceRange[1]
    );

    if (minRating > 0) {
      filtered = filtered.filter(post => post.rating >= minRating);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedDivision, selectedRoomType, priceRange, minRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDivision('');
    setSelectedRoomType('');
    setPriceRange([0, 50000]);
    setMinRating(0);
  };

  const RentalCard = ({ post }: { post: RentalPost }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={post.images[0]}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        {!post.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Not Available
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {post.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{post.rating}</span>
            <span>({post.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{post.location}</span>
        </div>
        
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{post.bedrooms} Bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{post.bathrooms} Bath</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{post.maxOccupancy} People</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          {post.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {post.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{post.amenities.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ৳{post.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-600">/month</span>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Main Search */}
            <div className="flex-1">
              <Input
                placeholder="Search by area, landmark, university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger className="h-12 w-full sm:w-40">
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  {bangladeshDivisions.map((division) => (
                    <SelectItem key={division} value={division.toLowerCase()}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger className="h-12 w-full sm:w-40">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                className="h-12 px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (৳)
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>৳{priceRange[0].toLocaleString()}</span>
                    <span>৳{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <RentalCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;