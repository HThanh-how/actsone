import React from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'; // Import các icon

interface Activity {
  id: number;
  description: string;
  time: string; // Thêm thuộc tính thời gian
  likes?: number; // Thêm thuộc tính lượt thích
  comments?: number; // Thêm thuộc tính bình luận
  shares?: number; // Thêm thuộc tính lượt chia sẻ
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Dưới đây là những hoạt động gần đây liên quan đến chiến dịch của bạn.
      </p>
      <ul className="list-disc pl-5">
        {activities.map((activity) => (
          <li key={activity.id} className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            <div className="flex justify-between">
              <span>{activity.description}</span>
              <span className="text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
            {activity.likes !== undefined && activity.comments !== undefined && activity.shares !== undefined && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                {activity.likes > 0 && (
                  <span className="flex items-center mr-2">
                    <FaThumbsUp className="text-blue-500 mr-1" />
                    {activity.likes}
                  </span>
                )}
                {activity.comments > 0 && (
                  <span className="flex items-center mr-2">
                    <FaComment className="text-green-500 mr-1" />
                    {activity.comments}
                  </span>
                )}
                {activity.shares > 0 && (
                  <span className="flex items-center">
                    <FaShare className="text-purple-500 mr-1" />
                    {activity.shares}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
