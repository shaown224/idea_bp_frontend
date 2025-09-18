'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { 
  Upload, 
  X, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed,
  Wifi,
  Car,
  Shield,
  Coffee,
  Dumbbell,
  Wind,
  Camera,
  Video
} from 'lucide-react';

interface FormData {
  // Basic Information
  title: string;
  description: string;
  propertyType: string;
  roomType: string;
  
  // Location
  division: string;
  district: string;
  area: string;
  address: string;
  
  // Property Details
  bedrooms: number;
  bathrooms: number;
  maxOccupancy: number;
  totalArea: number;
  floor: number;
  totalFloors: number;
  furnished: boolean;
  
  // Pricing
  monthlyRent: number;
  securityDeposit: number;
  electricityIncluded: boolean;
  gasIncluded: boolean;
  waterIncluded: boolean;
  
  // Amenities
  amenities: string[];
  
  // Contact
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  
  // Media
  images: File[];
  videos: File[];
}

const initialFormData: FormData = {
  title: '',
  description: '',
  propertyType: '',
  roomType: '',
  division: '',
  district: '',
  area: '',
  address: '',
  bedrooms: 1,
  bathrooms: 1,
  maxOccupancy: 1,
  totalArea: 0,
  floor: 1,
  totalFloors: 1,
  furnished: false,
  monthlyRent: 0,
  securityDeposit: 0,
  electricityIncluded: false,
  gasIncluded: false,
  waterIncluded: false,
  amenities: [],
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  images: [],
  videos: []
};

const bangladeshDivisions = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 
  'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

const propertyTypes = [
  'Apartment', 'House', 'Room', 'Studio', 'Hostel'
];

const roomTypes = [
  { value: 'single', label: 'Single Room' },
  { value: 'shared', label: 'Shared Room' },
  { value: 'family', label: 'Family Room' }
];

const availableAmenities = [
  { id: 'wifi', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
  { id: 'ac', label: 'Air Conditioning', icon: <Wind className="h-4 w-4" /> },
  { id: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> },
  { id: 'security', label: '24/7 Security', icon: <Shield className="h-4 w-4" /> },
  { id: 'kitchen', label: 'Kitchen Access', icon: <Coffee className="h-4 w-4" /> },
  { id: 'gym', label: 'Gym', icon: <Dumbbell className="h-4 w-4" /> },
  { id: 'laundry', label: 'Laundry', icon: null },
  { id: 'balcony', label: 'Balcony', icon: null },
  { id: 'elevator', label: 'Elevator', icon: null },
  { id: 'generator', label: 'Generator', icon: null }
];

export default function PostRentPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const handleInputChange = (field: keyof FormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleFileUpload = (field: 'images' | 'videos', files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ...fileArray]
    }));
  };

  const removeFile = (field: 'images' | 'videos', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Property posted successfully!');
    setIsSubmitting(false);
    // Reset form or redirect
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Home className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-600">Tell us about your property</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <Input
                  placeholder="e.g., Cozy Single Room in Dhanmondi"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type *
                </label>
                <Select value={formData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  className="w-full min-h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your property, its features, and what makes it special..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
              <p className="text-gray-600">Where is your property located?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <Select value={formData.division} onValueChange={(value) => handleInputChange('division', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {bangladeshDivisions.map((division) => (
                      <SelectItem key={division} value={division.toLowerCase()}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <Input
                  placeholder="e.g., Dhaka"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <Input
                  placeholder="e.g., Dhanmondi"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor / Total Floors
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Floor"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', parseInt(e.target.value) || 1)}
                  />
                  <span className="flex items-center text-gray-500">/</span>
                  <Input
                    type="number"
                    placeholder="Total"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address *
                </label>
                <textarea
                  className="w-full min-h-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter complete address with landmarks..."
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Bed className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
              <p className="text-gray-600">Specify the property features</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Occupancy *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.maxOccupancy}
                  onChange={(e) => handleInputChange('maxOccupancy', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Area (sqft)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.totalArea}
                  onChange={(e) => handleInputChange('totalArea', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnished Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="furnished"
                      checked={formData.furnished}
                      onChange={() => handleInputChange('furnished', true)}
                      className="mr-2"
                    />
                    Furnished
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="furnished"
                      checked={!formData.furnished}
                      onChange={() => handleInputChange('furnished', false)}
                      className="mr-2"
                    />
                    Unfurnished
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity.id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.amenities.includes(amenity.id)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      className="sr-only"
                    />
                    {amenity.icon}
                    <span className="text-sm">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Pricing & Utilities</h2>
              <p className="text-gray-600">Set your rental terms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent (৳) *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 8000"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Deposit (৳) *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 16000"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Utilities Included
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Electricity Bill</span>
                    <input
                      type="checkbox"
                      checked={formData.electricityIncluded}
                      onChange={(e) => handleInputChange('electricityIncluded', e.target.checked)}
                      className="h-4 w-4 text-green-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Gas Bill</span>
                    <input
                      type="checkbox"
                      checked={formData.gasIncluded}
                      onChange={(e) => handleInputChange('gasIncluded', e.target.checked)}
                      className="h-4 w-4 text-green-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Water Bill</span>
                    <input
                      type="checkbox"
                      checked={formData.waterIncluded}
                      onChange={(e) => handleInputChange('waterIncluded', e.target.checked)}
                      className="h-4 w-4 text-green-600"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <Input
                    placeholder="Your full name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="+880-xxx-xxx-xxx"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Photos & Videos</h2>
              <p className="text-gray-600">Add media to showcase your property</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Property Photos * (Max 10 images)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop photos here or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('images', e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Choose Photos
                  </Button>
                </label>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('images', index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Property Videos (Optional, Max 2 videos)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Add video tours of your property
                </p>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileUpload('videos', e.target.files)}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Choose Videos
                  </Button>
                </label>
              </div>

              {/* Video Preview */}
              {formData.videos.length > 0 && (
                <div className="space-y-4 mt-4">
                  {formData.videos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('videos', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Your Rental Property
          </h1>
          <p className="text-gray-600">
            List your property and connect with verified tenants
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                  step === currentStep
                    ? 'bg-green-600 text-white'
                    : step < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Posting...' : 'Post Property'}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}