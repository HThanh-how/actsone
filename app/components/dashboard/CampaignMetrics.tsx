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
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Campaign Progress</h1>

      {/* Progress Bar for Campaign Progress */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-green-300">In Progress</h3>
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
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-md font-medium mb-2 text-gray-900 dark:text-white">Engagement Effectiveness</h2>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Views:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.posts.engagement.views)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Likes:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.posts.engagement.likes)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Comments:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.posts.engagement.comments)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Shares:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.posts.engagement.shares)}</span>
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-md font-medium mb-2 text-gray-900 dark:text-white">Investment Effectiveness</h2>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Cost:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.investment.cost)} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Revenue:</span>
              <span className="text-gray-900 dark:text-white">{formatNumber(campaignData.investment.revenue)} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">ROI:</span>
              <span className="text-gray-900 dark:text-white">{((campaignData.investment.revenue / campaignData.investment.cost) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetrics;
