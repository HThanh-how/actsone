import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

interface CampaignStatsProps {
    data: {
      name: string;
      objectives: {
        totalReviews: number;
        totalInfluencers: number;
        totalInteractions: number;
      };
      stock: {
        total: number;
        used: number;
        remaining: number;
      };
      influencers: {
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
      };
      posts: {
        completed: number;
        target: number;
        platforms: {
          instagram: number;
          facebook: number;
          tiktok: number;
        };
        engagement: {
          views: number;      // Lượt xem
          likes: number;      // Lượt thích
          comments: number;   // Bình luận
          shares: number;     // Chia sẻ
        };
      };
      investment: {
        cost: number;          // Chi phí chiến dịch
        revenue: number;       // Doanh thu
      };
      progress: number;        // Tiến độ chiến dịch (%)
    };
  }

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

export default function CampaignStats({ data }: CampaignStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Thống kê chiến dịch
      </h2>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Stock Progress */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(data.stock.remaining)}/{formatNumber(data.stock.total)}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
              <div
                className="bg-blue-500 rounded"
                style={{ width: `${(data.stock.remaining / data.stock.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Influencer Progress */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Influencer</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(data.influencers.contacted)}/{formatNumber(data.influencers.targetContacts)}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
              <div
                className="bg-green-500 rounded"
                style={{ width: `${(data.influencers.contacted / data.influencers.targetContacts) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Post Progress */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Posts</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(data.posts.completed)}/{formatNumber(data.posts.target)}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
              <div
                className="bg-purple-500 rounded"
                style={{ width: `${(data.posts.completed / data.posts.target) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-3 gap-6">
        {/* Stock Details */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            Thông tin Stock
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Tổng</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.stock.total)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Đã dùng</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.stock.used)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Còn lại</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.stock.remaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Influencer Details */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            Thống kê Influencer
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Chưa liên hệ</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.influencers.status?.notContacted)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Đang liên hệ</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.influencers.status?.contacting)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Đã đồng ý</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.influencers.status?.agreed)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Đã nhận SP</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.influencers.status?.received)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Đã đăng</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(data.influencers.status?.posted)}
              </span>
            </div>
          </div>
        </div>

        {/* Post Details */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            Trạng thái Post
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaInstagram className="text-pink-600" /> Instagram
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data.posts.platforms.instagram}%
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaFacebook className="text-blue-600" /> Facebook
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data.posts.platforms.facebook}%
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaTiktok /> TikTok
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data.posts.platforms.tiktok}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
