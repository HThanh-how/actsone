"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaThumbsUp, FaComment, FaShare, FaInstagram, } from 'react-icons/fa';

export default function SocialContentPage() {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Social Media Content Management
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Search by campaign, brand..."
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select 
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-500"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
            </select>
            <select 
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="engagement">Sort by Engagement</option>
              <option value="commission">Sort by Commission</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48">
              <Image
                src="/placeholder.jpg"
                alt="Post thumbnail"
                fill
                className="object-cover cursor-pointer"
              />
              <div className="absolute top-2 right-2">
                <FaInstagram className="text-2xl text-white" />
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Image
                  src="/avatar.jpg"
                  alt="Influencer avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <h3 className="font-semibold dark:text-white text-gray-900">Influencer Name</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-400 ">Campaign ABC</p>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="flex items-center">
                  <FaEye className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm dark:text-white text-gray-500 ">1.2K</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsUp className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm dark:text-white text-gray-500">500</span>
                </div>
                <div className="flex items-center">
                  <FaComment className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm dark:text-white text-gray-500">100</span>
                </div>
                <div className="flex items-center">
                  <FaShare className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm dark:text-white text-gray-500">50</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-3 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold dark:text-white text-gray-500">GMV:</span>
                  <span className="text-sm dark:text-white text-gray-500">1,000,000 VND</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold dark:text-white text-gray-500">Products Sold:</span>
                  <span className="text-sm dark:text-white text-gray-500">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold dark:text-white text-gray-500">Commission:</span>
                  <span className="text-sm dark:text-white text-gray-500">10%</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Commercial
                </span>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Posted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
