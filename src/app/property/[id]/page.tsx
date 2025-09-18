'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle,
  Wifi,
  Car,
  Shield,
  Coffee,
  Dumbbell,
  Wind,
  ArrowLeft,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import property1 from '@/assets/property1.jpg';
import property2 from '@/assets/property2.jpg';
import property3 from '@/assets/property3.jpg';

interface PropertyDetails {
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
  ownerName: string;
  ownerPhone: string;
  ownerImage?: string;
  postedDate: string;
  propertyType: string;
  floor: number;
  totalFloors: number;
  area: number; // in sqft
  furnished: boolean;
  deposit: number;
  electricityIncluded: boolean;
  gasIncluded: boolean;
  waterIncluded: boolean;
  nearbyPlaces: string[];
}

// Mock property data - in real app this would come from API
const mockProperty: PropertyDetails = {
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
  images: [property1, property2, property3],
  description: 'Comfortable single room perfect for students. Close to university and well-connected to public transport. The room is fully furnished with modern amenities and provides a peaceful environment for studying.',
  amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen Access', 'Parking', 'Security', 'Gym', 'Balcony'],
  available: true,
  ownerName: 'Mohammed Rahman',
  ownerPhone: '+880-123-456-789',
  postedDate: '2024-01-15',
  propertyType: 'Apartment',
  floor: 3,
  totalFloors: 5,
  area: 200,
  furnished: true,
  deposit: 16000,
  electricityIncluded: false,
  gasIncluded: true,
  waterIncluded: true,
  nearbyPlaces: ['Dhaka University - 2km', 'Dhanmondi Metro - 500m', 'City Hospital - 1km', 'Grocery Store - 200m']
};

import React from 'react';

const amenityIcons: { [key: string]: React.ReactElement } = {
  'WiFi': <Wifi className="h-5 w-5" />,
  'AC': <Wind className="h-5 w-5" />,
  'Parking': <Car className="h-5 w-5" />,
  'Security': <Shield className="h-5 w-5" />,
  'Kitchen Access': <Coffee className="h-5 w-5" />,
  'Gym': <Dumbbell className="h-5 w-5" />,
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In real app, fetch property data based on params.id
  const property = mockProperty;
  
  // Use params.id for API calls in real implementation
  console.log('Property ID:', params.id);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/search" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  <Camera className="h-3 w-3 inline mr-1" />
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              {/* Image Thumbnails */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Property ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{property.rating} ({property.reviews} reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{property.propertyType}</span>
                    <span>•</span>
                    <span>Floor {property.floor}/{property.totalFloors}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    ৳{property.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
                <div className="text-center">
                  <Bed className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                  <div className="font-semibold">{property.maxOccupancy}</div>
                  <div className="text-sm text-gray-600">Max People</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{property.area} sqft</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
              </div>

              {/* Description */}
              <div className="py-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      {amenityIcons[amenity] || <div className="h-5 w-5 bg-gray-300 rounded-full" />}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Furnished:</span>
                    <span className="ml-2 font-medium">{property.furnished ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Security Deposit:</span>
                    <span className="ml-2 font-medium">৳{property.deposit.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Electricity:</span>
                    <span className="ml-2 font-medium">{property.electricityIncluded ? 'Included' : 'Separate'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Gas:</span>
                    <span className="ml-2 font-medium">{property.gasIncluded ? 'Included' : 'Separate'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Water:</span>
                    <span className="ml-2 font-medium">{property.waterIncluded ? 'Included' : 'Separate'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Posted:</span>
                    <span className="ml-2 font-medium">{new Date(property.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="py-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Nearby Places</h3>
                <div className="space-y-2">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Contact Owner</h3>
              
              {/* Owner Info */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-lg">
                    {property.ownerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{property.ownerName}</div>
                  <div className="text-sm text-gray-600">Property Owner</div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now (1 Point)
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Availability Status */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Available Now</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Ready for immediate move-in
                </p>
              </div>

              {/* Safety Notice */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Safety Tips</div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Always visit the property in person before making any payment. Verify owner identity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Report */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Report this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}