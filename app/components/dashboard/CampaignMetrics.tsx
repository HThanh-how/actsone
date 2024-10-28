import React from 'react';

interface CampaignMetricsProps {
  campaignData: {
    posts: {
      engagement: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
      };
    };
    investment: {
      cost: number;
      revenue: number;
    };
    progress: number;
  };
}

const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ campaignData }) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const totalEngagement = campaignData.posts.engagement.views + 
                          campaignData.posts.engagement.likes + 
                          campaignData.posts.engagement.comments + 
                          campaignData.posts.engagement.shares;

  const engagementRate = totalEngagement / campaignData.progress * 100;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h1 className="text-xl font-semibold mb-4">Tiến độ chiến dịch</h1>
      
      {/* Progress Bar for Campaign Progress */}
       {/* Stock Progress */}
       <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-green-300">Đang thực hiện</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {campaignData.progress}%
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
              <div
                className="bg-blue-500 rounded"
                style={{ width: `${(campaignData.progress / 100) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>


      {/* Engagement and Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Engagement Metrics */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-md font-medium mb-2">Hiệu quả tương tác</h2>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span>Lượt xem:</span>
              <span>{formatNumber(campaignData.posts.engagement.views)}</span>
            </div>
            <div className="flex justify-between">
              <span>Lượt thích:</span>
              <span>{formatNumber(campaignData.posts.engagement.likes)}</span>
            </div>
            <div className="flex justify-between">
              <span>Bình luận:</span>
              <span>{formatNumber(campaignData.posts.engagement.comments)}</span>
            </div>
            <div className="flex justify-between">
              <span>Chia sẻ:</span>
              <span>{formatNumber(campaignData.posts.engagement.shares)}</span>
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-md font-medium mb-2">Hiệu quả đầu tư</h2>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span>Chi phí:</span>
              <span>{formatNumber(campaignData.investment.cost)} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span>Doanh thu:</span>
              <span>{formatNumber(campaignData.investment.revenue)} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span>ROI:</span>
              <span>{((campaignData.investment.revenue / campaignData.investment.cost) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetrics;
