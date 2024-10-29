"use client";
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaChartLine,
  
  
  FaSearch,
  
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import CampaignStats from './components/dashboard/CampaignStats';
import CampaignMetrics from './components/dashboard/CampaignMetrics'; 
import RecentActivity from './components/dashboard/RecentActivity'; // Import new component
import CampaignChart from "./components/dashboard/CampaignChart";

// Sample data
interface CampaignObjectives {
  totalReviews: number;
  achievedReviews: number; // Achieved metric
  totalInfluencers: number;
  achievedInfluencers: number; // Achieved metric
  totalInteractions: number;
  achievedInteractions: number; // Achieved metric
}

interface CampaignStock {
  total: number;
  used: number;
  remaining: number;
}

interface CampaignInfluencers {
  contacted: number;
  targetContacts: number;
  agreementRate: number;
  status: {
    notContacted: number;
    contacting: number;
    agreed: number;
    received: number;
    posted: number;
  };
}

interface CampaignPosts {
  completed: number;
  target: number;
  platforms: {
    instagram: number;
    facebook: number;
    tiktok: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

interface CampaignInvestment {
  cost: number;
  revenue: number;
}

interface CampaignData {
  name: string;
  objectives: CampaignObjectives;
  stock: CampaignStock;
  influencers: CampaignInfluencers;
  posts: CampaignPosts;
  investment: CampaignInvestment;
  progress: number; // Campaign progress (%)
}

// Sample data
const campaignData: CampaignData = {
  name: "Summer Collection 2024",
  objectives: {
    totalReviews: 800,
    achievedReviews: 640, // Achieved metric
    totalInfluencers: 100,
    achievedInfluencers: 80, // Achieved metric
    totalInteractions: 900,
    achievedInteractions: 810, // Achieved metric
  },
  stock: {
    total: 100,
    used: 50,
    remaining: 50,
  },
  influencers: {
    contacted: 50,
    targetContacts: 100,
    agreementRate: 20,
    status: {
      notContacted: 20,
      contacting: 10,
      agreed: 10,
      received: 10,
      posted: 10,
    },
  },
  posts: {
    completed: 10,
    target: 50,
    platforms: {
      instagram: 40,
      facebook: 35,
      tiktok: 25,
    },
    engagement: {
      likes: 5000,
      comments: 1000,
      shares: 800,
      views: 50000,
    },
  },
  investment: {
    cost: 1000000,
    revenue: 1200000,
  },
  progress: 60,
};

// Add interfaces
interface FilterOption {
  label: string;
  value: string;
}

// Add interface for category
interface FilterCategory {
  label: string;
  value: string;
  options: FilterOption[];
}

// Organize filter options by category
const filterCategories: FilterCategory[] = [
  {
    label: "Status",
    value: "status",
    options: [
      { label: "Not Contacted", value: "not_contacted" },
      { label: "Contacting", value: "contacting" },
      { label: "Agreed", value: "agreed" },
      { label: "Received Product", value: "received" },
      { label: "Posted", value: "posted" },
    ],
  },
  {
    label: "Stock",
    value: "stock",
    options: [
      { label: "0-25%", value: "stock_0_25" },
      { label: "26-50%", value: "stock_26_50" },
      { label: "51-75%", value: "stock_51_75" },
      { label: "76-100%", value: "stock_76_100" },
    ],
  },
  {
    label: "Performance",
    value: "performance",
    options: [
      { label: "High", value: "high_performance" },
      { label: "Medium", value: "medium_performance" },
      { label: "Low", value: "low_performance" },
    ],
  },
];

// Sample data
const activities = [
  { id: 1, description: 'Campaign "Holiday Sale" has started with 10 influencers.', time: '3 minutes ago', likes: 323, comments: 32, shares: 32 },
  { id: 2, description: 'Budget update: $50,000 has been allocated for December.', time: '1 minute ago', likes: 1, comments: 2, shares: 2 },
  { id: 3, description: 'New post: Influencer A - "Holiday Promotion"', time: 'Just now', likes: 500, comments: 50, shares: 10 },
  { id: 4, description: 'Product update: 20 new items have been added to stock for "Winter Campaign".', time: '2 hours ago', likes: 1, comments: 3, shares: 5 },
  { id: 5, description: 'Campaign report completed.', time: '1 day ago', likes: 66, comments: 43, shares:12 },
];

export default function Dashboard() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // Add default state
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Initialize with all filters selected
  useEffect(() => {
    const allFilters = filterCategories.flatMap((cat) =>
      cat.options.map((opt) => opt.value)
    );
    setSelectedFilters(allFilters);
  }, []);

  // Handle select all in a category
  const handleSelectAllCategory = (category: FilterCategory) => {
    const categoryValues = category.options.map((opt) => opt.value);
    const otherFilters = selectedFilters.filter(
      (f) => !categoryValues.includes(f)
    );
    setSelectedFilters([...otherFilters, ...categoryValues]);
  };

  // Handle unselect all in a category
  const handleUnselectAllCategory = (category: FilterCategory) => {
    const categoryValues = category.options.map((opt) => opt.value);
    setSelectedFilters(
      selectedFilters.filter((f) => !categoryValues.includes(f))
    );
  };

  // Sort options with default state
  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Name A-Z", value: "name_asc" },
    { label: "Name Z-A", value: "name_desc" },
    { label: "Status: New → Old", value: "status_asc" },
    { label: "Status: Old → New", value: "status_desc" },
    { label: "Performance: High → Low", value: "performance_desc" },
    { label: "Performance: Low → High", value: "performance_asc" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Campaign Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {campaignData.name}
          </h1>

          {/* Objectives Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reviews Target */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                <FaChartLine className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reviews Target
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {campaignData.objectives.achievedReviews} / {campaignData.objectives.totalReviews}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${(campaignData.objectives.achievedReviews / campaignData.objectives.totalReviews) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Influencers Target */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                <FaUsers className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Influencers Target
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {campaignData.objectives.achievedInfluencers} / {campaignData.objectives.totalInfluencers}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${(campaignData.objectives.achievedInfluencers / campaignData.objectives.totalInfluencers) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Interactions Target */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                <FaChartLine className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interactions Target
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {campaignData.objectives.achievedInteractions} / {campaignData.objectives.totalInteractions}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{
                      width: `${(campaignData.objectives.achievedInteractions / campaignData.objectives.totalInteractions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter and Sort Row */}
            <div className="flex items-center gap-4">
              {/* Filter Categories */}
              <div className="flex gap-4">
                {filterCategories.map((category) => (
                  <div key={category.value} className="relative">
                    <button
                      onClick={() =>
                        setOpenCategory(
                          openCategory === category.value ? null : category.value
                        )
                      }
                      className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {category.label}
                    </button>

                    {/* Dropdown Menu */}
                    {openCategory === category.value && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[200px]">
                        {/* Header with "Select All" */}
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <button
                            onClick={() => {
                              const categoryValues = category.options.map(
                                (opt) => opt.value
                              );
                              const allSelected = categoryValues.every((value) =>
                                selectedFilters.includes(value)
                              );
                              if (allSelected) {
                                handleUnselectAllCategory(category);
                              } else {
                                handleSelectAllCategory(category);
                              }
                            }}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            Select All
                          </button>
                        </div>

                        {/* Options */}
                        <div className="py-1">
                          {category.options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                if (selectedFilters.includes(option.value)) {
                                  setSelectedFilters(
                                    selectedFilters.filter(
                                      (f) => f !== option.value
                                    )
                                  );
                                } else {
                                  setSelectedFilters([
                                    ...selectedFilters,
                                    option.value,
                                  ]);
                                }
                              }}
                              className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                            >
                              <span className="w-5">
                                {selectedFilters.includes(option.value) && (
                                  <FaCheck className="text-blue-500" />
                                )}
                              </span>
                              {option.label}
                            </button>
                          ))}
                        </div>

                        {/* Footer with "Done" button */}
                        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                          <button
                            onClick={() => setOpenCategory(null)}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="mr-1">
                    {sortBy === "default"
                      ? "Sort by"
                      : sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[180px] z-20">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                      >
                        <span className="w-5">
                          {sortBy === option.value && (
                            <FaCheck className="text-blue-500" />
                          )}
                        </span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Selected Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => {
                    const option = filterCategories
                      .flatMap((cat) => cat.options)
                      .find((opt) => opt.value === filter);

                    return (
                      option && (
                        <span
                          key={filter}
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 rounded-full"
                        >
                          {option.label}
                          <button
                            onClick={() =>
                              setSelectedFilters(
                                selectedFilters.filter((f) => f !== filter)
                              )
                            }
                            className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            ×
                          </button>
                        </span>
                      )
                    );
                  })}
                  <button
                    onClick={() => setSelectedFilters([])}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Stats */}
        <CampaignStats data={campaignData} />
        <CampaignMetrics campaignData={campaignData} />
        <CampaignChart data={campaignData} /> {/* Add the chart here */}
          {/* Recent Activity Section */}
          <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
