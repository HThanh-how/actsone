"use client";
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaChartLine,
  
  
  FaSearch,
  
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import CampaignStats from '../components/dashboard/CampaignStats';
import CampaignMetrics from '../components/dashboard/CampaignMetrics'; 
import RecentActivity from '../components/dashboard/RecentActivity'; // Import component mới


// Data mẫu
interface CampaignObjectives {
  totalReviews: number;
  achievedReviews: number; // Chỉ số đạt được
  totalInfluencers: number;
  achievedInfluencers: number; // Chỉ số đạt được
  totalInteractions: number;
  achievedInteractions: number; // Chỉ số đạt được
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
  progress: number; // Tiến độ chiến dịch (%)
}

// Data mẫu
const campaignData: CampaignData = {
  name: "Summer Collection 2024",
  objectives: {
    totalReviews: 800,
    achievedReviews: 640, // Chỉ số đạt được
    totalInfluencers: 100,
    achievedInfluencers: 80, // Chỉ số đạt được
    totalInteractions: 900,
    achievedInteractions: 810, // Chỉ số đạt được
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

// Thêm interfaces
interface FilterOption {
  label: string;
  value: string;
}

// Thêm interface cho category
interface FilterCategory {
  label: string;
  value: string;
  options: FilterOption[];
}

// Tổ chức lại filter options theo category
const filterCategories: FilterCategory[] = [
  {
    label: "Trạng thái",
    value: "status",
    options: [
      { label: "Chưa liên hệ", value: "not_contacted" },
      { label: "Đang liên hệ", value: "contacting" },
      { label: "Đã đồng ý", value: "agreed" },
      { label: "Đã nhận sản phẩm", value: "received" },
      { label: "Đã đăng", value: "posted" },
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
    label: "Hiệu quả",
    value: "performance",
    options: [
      { label: "Cao", value: "high_performance" },
      { label: "Trung bình", value: "medium_performance" },
      { label: "Thấp", value: "low_performance" },
    ],
  },
];

// Data mẫu
const activities = [
  { id: 1, description: 'Chiến dịch "Giảm giá ngày lễ" đã bắt đầu với 10 influencer.', time: '3 phút trước', likes: 323, comments: 32, shares: 32 },
  { id: 2, description: 'Cập nhật ngân sách: $50,000 đã được phân bổ cho tháng 12.', time: '1 phút trước', likes: 1, comments: 2, shares: 2 },
  { id: 3, description: 'Bài đăng mới: Influencer A - "Khuyến mãi ngày lễ"', time: 'Vừa xong', likes: 500, comments: 50, shares: 10 },
  { id: 4, description: 'Cập nhật sản phẩm: 20 mặt hàng mới đã được thêm vào kho cho "Chiến dịch mùa đông".', time: '2 giờ trước', likes: 1, comments: 3, shares: 5 },
  { id: 5, description: 'Đã hoàn thành báo cáo chiến dịch.', time: '1 ngày trước', likes: 66, comments: 43, shares:12 },
];

export default function Dashboard() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // Thêm trạng thái mặc định
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Khởi tạo với tất cả filters được chọn
  useEffect(() => {
    const allFilters = filterCategories.flatMap((cat) =>
      cat.options.map((opt) => opt.value)
    );
    setSelectedFilters(allFilters);
  }, []);

  // Hàm xử lý chọn tất cả trong một category
  const handleSelectAllCategory = (category: FilterCategory) => {
    const categoryValues = category.options.map((opt) => opt.value);
    const otherFilters = selectedFilters.filter(
      (f) => !categoryValues.includes(f)
    );
    setSelectedFilters([...otherFilters, ...categoryValues]);
  };

  // Hàm xử lý bỏ chọn tất cả trong một category
  const handleUnselectAllCategory = (category: FilterCategory) => {
    const categoryValues = category.options.map((opt) => opt.value);
    setSelectedFilters(
      selectedFilters.filter((f) => !categoryValues.includes(f))
    );
  };

  // Sort options với trạng thái mặc định
  const sortOptions = [
    { label: "Mặc định", value: "default" },
    { label: "Tên A-Z", value: "name_asc" },
    { label: "Tên Z-A", value: "name_desc" },
    { label: "Trạng thái: Mới → Cũ", value: "status_asc" },
    { label: "Trạng thái: Cũ → Mới", value: "status_desc" },
    { label: "Hiệu quả: Cao → Thấp", value: "performance_desc" },
    { label: "Hiệu quả: Thấp → Cao", value: "performance_asc" },
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
                  Mục tiêu Reviews
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
                  Mục tiêu Influencers
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
                  Mục tiêu Tương tác
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
                placeholder="Tìm kiếm..."
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
                        {/* Header với "Chọn tất cả" */}
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
                            Chọn tất cả
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

                        {/* Footer với nút "Xong" */}
                        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                          <button
                            onClick={() => setOpenCategory(null)}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                          >
                            Xong
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
                      ? "Sắp xếp theo"
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
                  Bộ lọc đã chọn:
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
                    Xóa tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Stats */}
        <CampaignStats data={campaignData} />
        <CampaignMetrics campaignData={campaignData} />
        
          {/* Recent Activity Section */}
          <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
