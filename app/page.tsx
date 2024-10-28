"use client";
import { FaUsers,  FaChartLine, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

// Data mẫu
const campaignData = {
  name: "Summer Collection 2024",
  objectives: {
    totalReviews: 100,
    totalInfluencers: 50,
    totalInteractions: 10000
  },
  stock: {
    total: 100,
    used: 50,
    remaining: 50
  },
  influencers: {
    contacted: 50,
    targetContacts: 100,
    agreementRate: 20
  },
  posts: {
    completed: 10,
    target: 50,
    platforms: {
      instagram: 40,
      facebook: 35,
      tiktok: 25
    },
    engagement: {
      likes: 5000,
      comments: 1000,
      shares: 800,
      views: 50000
    }
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      {/* Campaign Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{campaignData.name}</h1>
      </div>
{/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Tìm kiếm & Lọc</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Tìm theo tên Influencer/Campaign"
            className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Trạng thái liên hệ</option>
            <option value="not_contacted">Chưa liên hệ</option>
            <option value="contacting">Đang liên hệ</option>
            <option value="agreed">Đã đồng ý</option>
            <option value="received">Đã nhận sản phẩm</option>
            <option value="posted">Đã đăng</option>
          </select>
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Stock đã sử dụng</option>
            <option value="0-25">0-25</option>
            <option value="26-50">26-50</option>
            <option value="51-75">51-75</option>
            <option value="76-100">76-100</option>
          </select>
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Hiệu quả bài đăng</option>
            <option value="views">Lượt xem</option>
            <option value="likes">Lượt thích</option>
            <option value="comments">Bình luận</option>
            <option value="shares">Chia sẻ</option>
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Sắp xếp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Tên Influencer</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Trạng thái liên hệ</option>
            <option value="asc">Chưa liên hệ → Đã đăng</option>
            <option value="desc">Đã đăng → Chưa liên hệ</option>
          </select>
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Số lượng bài đăng</option>
            <option value="desc">Nhiều nhất → Ít nhất</option>
            <option value="asc">Ít nhất → Nhiều nhất</option>
          </select>
          <select className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Hiệu quả bài đăng</option>
            <option value="desc">Cao → Thấp</option>
            <option value="asc">Thấp → Cao</option>
          </select>
        </div>
      </div>
      {/* Campaign Objectives */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-blue-500 mr-2" />
            <h3 className="font-semibold">Mục tiêu Reviews</h3>
          </div>
          <p className="text-2xl font-bold">{campaignData.objectives.totalReviews}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <FaUsers className="text-green-500 mr-2" />
            <h3 className="font-semibold">Mục tiêu Influencers</h3>
          </div>
          <p className="text-2xl font-bold">{campaignData.objectives.totalInfluencers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-purple-500 mr-2" />
            <h3 className="font-semibold">Mục tiêu Tương tác</h3>
          </div>
          <p className="text-2xl font-bold">{campaignData.objectives.totalInteractions}</p>
        </div>
      </div>

      {/* Stock Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Thông tin Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h3 className="font-semibold mb-2">Tổng số stock</h3>
            <p className="text-2xl font-bold">{campaignData.stock.total}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Đã sử dụng</h3>
            <p className="text-2xl font-bold">{campaignData.stock.used}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Còn lại</h3>
            <p className="text-2xl font-bold">{campaignData.stock.remaining}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${(campaignData.stock.used / campaignData.stock.total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Influencer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Thống kê Influencer</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Đã liên hệ</h3>
            <p className="text-2xl font-bold">
              {campaignData.influencers.contacted}/{campaignData.influencers.targetContacts}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tỷ lệ đồng ý</h3>
            <p className="text-2xl font-bold">{campaignData.influencers.agreementRate}%</p>
          </div>
        </div>

        {/* Post Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Trạng thái Post</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Posts đã hoàn thành</h3>
            <p className="text-2xl font-bold">
              {campaignData.posts.completed}/{campaignData.posts.target}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <FaInstagram className="text-pink-500 mr-2" />
              <span>{campaignData.posts.platforms.instagram}%</span>
            </div>
            <div className="flex items-center">
              <FaFacebook className="text-blue-500 mr-2" />
              <span>{campaignData.posts.platforms.facebook}%</span>
            </div>
            <div className="flex items-center">
              <FaTiktok className="text-black mr-2" />
              <span>{campaignData.posts.platforms.tiktok}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Hiệu quả tương tác</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Lượt xem</h3>
            <p className="text-2xl font-bold">{campaignData.posts.engagement.views}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Lượt thích</h3>
            <p className="text-2xl font-bold">{campaignData.posts.engagement.likes}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bình luận</h3>
            <p className="text-2xl font-bold">{campaignData.posts.engagement.comments}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Chia sẻ</h3>
            <p className="text-2xl font-bold">{campaignData.posts.engagement.shares}</p>
          </div>
        </div>
      </div>

      {/* ROI Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Hiệu quả đầu tư</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Chi phí chiến dịch</h3>
            <p className="text-2xl font-bold">1,000,000 VNĐ</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Doanh thu</h3>
            <p className="text-2xl font-bold">1,200,000 VNĐ</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">ROI</h3>
            <p className="text-2xl font-bold text-green-500">120%</p>
          </div>
        </div>
      </div>

      {/* Campaign Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Tiến độ chiến dịch</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Đang thực hiện
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                60%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
