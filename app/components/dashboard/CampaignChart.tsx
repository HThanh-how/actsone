import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CampaignChartProps {
  data: {
    objectives: {
      totalReviews: number;
      achievedReviews: number;
      totalInfluencers: number;
      achievedInfluencers: number;
      totalInteractions: number;
      achievedInteractions: number;
    };
    investment: {
      cost: number;
      revenue: number;
    };
  };
}

const CampaignChart: React.FC<CampaignChartProps> = ({ data }) => {
  // Tính toán tổng cho các mục
  const totalReviews = data.objectives.totalReviews;
  const totalInfluencers = data.objectives.totalInfluencers;
  const totalInteractions = data.objectives.totalInteractions;
  const totalCost = data.investment.cost;
  const totalRevenue = data.investment.revenue;

  const chartData = {
    labels: [
      'Achieved Reviews',
      'Total Reviews',
      'Achieved Influencers',
      'Total Influencers',
      'Achieved Interactions',
      'Total Interactions',
      'Cost',
      'Revenue',
    ],
    datasets: [
      {
        label: 'Campaign Data',
        data: [
          (data.objectives.achievedReviews / totalReviews) * 100,
          (totalReviews / totalReviews) * 100, // 100% cho tổng đánh giá
          (data.objectives.achievedInfluencers / totalInfluencers) * 100,
          (totalInfluencers / totalInfluencers) * 100, // 100% cho tổng người ảnh hưởng
          (data.objectives.achievedInteractions / totalInteractions) * 100,
          (totalInteractions / totalInteractions) * 100, // 100% cho tổng tương tác
          (totalCost / totalRevenue) * 100, // Tính tỷ lệ phần trăm chi phí so với doanh thu
          (totalRevenue / totalRevenue) * 100, // 100% cho tổng doanh thu
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Achieved Reviews
          'rgba(255, 99, 132, 0.6)', // Total Reviews
          'rgba(54, 162, 235, 0.6)', // Achieved Influencers
          'rgba(255, 206, 86, 0.6)', // Total Influencers
          'rgba(75, 192, 192, 0.6)', // Achieved Interactions
          'rgba(153, 102, 255, 0.6)', // Total Interactions
          'rgba(255, 159, 64, 0.6)', // Cost
          'rgba(255, 99, 132, 0.6)', // Revenue
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Campaign Overview',
      },
    },
  };

  return (
    <div>
      {/* New div added below the chart with background */}
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Insights</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          This chart provides an overview of the campaign&apos;s performance metrics, including reviews, influencers, interactions, costs, and revenue by percentage.
      <Bar data={chartData} options={options} />
        </p>
      </div>
    </div>
  );
};

export default CampaignChart; 