"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaUsers, FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

export default function InfluencerNetwork() {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    // Thay đổi màu nền chính thành gray-100
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      {/* Thêm max-w-7xl để giới hạn độ rộng container */}
      <div className="container max-w-7xl mx-auto px-6">
        {/* Statistics Overview - Thay đổi màu component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          {['Tổng KOLs', 'Newbie', 'Nano', 'Micro', 'Mid-Tier', 'Macro', 'Mega', 'Celebrity'].map((level) => (
            <div key={level} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold mb-2 dark:text-white">{level}</h3>
              <div className="flex items-center">
                <FaUsers className="text-blue-500 mr-2" />
                <span className="text-xl font-bold dark:text-white">0</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Tìm theo tên, số điện thoại..."
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Chọn thành phố</option>
              {/* Add cities */}
            </select>
            <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Chọn kênh chính</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>TikTok</option>
              <option>Youtube</option>
              <option>Threads</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Chọn nghề nghiệp</option>
              {/* Add occupations */}
            </select>
            <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Chọn thể loại nội dung</option>
              {/* Add content genres */}
            </select>
            <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Thời gian hợp tác</option>
              <option>30 ngày</option>
              <option>60 ngày</option>
              <option>90 ngày</option>
            </select>
          </div>
        </div>

        {/* Influencer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Influencer Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center mb-4">
                <Image
                  src="/avatar-placeholder.jpg"
                  alt="Influencer avatar"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <h3 className="font-bold dark:text-white">Tên Influencer</h3>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Micro Influencer
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <a href="tel:+84123456789" className="flex items-center text-sm dark:text-white">
                  <span className="w-24 text-gray-500 dark:text-gray-400">Điện thoại:</span>
                  +84 123 456 789
                </a>
                <a href="mailto:email@example.com" className="flex items-center text-sm dark:text-white">
                  <span className="w-24 text-gray-500 dark:text-gray-400">Email:</span>
                  email@example.com
                </a>
                <div className="flex items-center text-sm dark:text-white">
                  <span className="w-24 text-gray-500 dark:text-gray-400">Địa chỉ:</span>
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="border-t dark:border-gray-700 pt-4 mb-4">
                <h4 className="font-semibold mb-2 dark:text-white">Mạng xã hội</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaInstagram className="text-pink-500 mr-2" />
                    <span className="text-sm dark:text-white">100K</span>
                  </div>
                  <div className="flex items-center">
                    <FaFacebook className="text-blue-500 mr-2" />
                    <span className="text-sm dark:text-white">50K</span>
                  </div>
                  <div className="flex items-center">
                    <FaTiktok className="text-gray-800 dark:text-white mr-2" />
                    <span className="text-sm dark:text-white">200K</span>
                  </div>
                  <div className="flex items-center">
                    <SiThreads className="text-gray-800 dark:text-white mr-2" />
                    <span className="text-sm dark:text-white">30K</span>
                  </div>
                  <div className="flex items-center">
                    <FaYoutube className="text-red-500 mr-2" />
                    <span className="text-sm dark:text-white">75K</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t dark:border-gray-700 pt-4">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 text-sm"
                >
                  {showDetails ? 'Ẩn chi tiết' : 'Xem thêm'}
                </button>
                
                {showDetails && (
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex">
                      <span className="w-24 text-gray-500 dark:text-gray-400">Nghề nghiệp:</span>
                      <span className="dark:text-white">Content Creator</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-500 dark:text-gray-400">Thể loại:</span>
                      <span className="dark:text-white">Beauty, Fashion</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-500 dark:text-gray-400">Agency:</span>
                      <span className="dark:text-white">ABC Agency</span>
                    </div>
                    {/* Only visible to Manager role */}
                    <div className="flex">
                      <span className="w-24 text-gray-500 dark:text-gray-400">STK:</span>
                      <span className="dark:text-white">1234567890</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Update Followers Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
            Cập nhật followers
          </button>
        </div>
      </div>
    </div>
  );
}
