import React from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'; // Import icons

interface Activity {
  id: number;
  description: string;
  time: string; // Added time property
  likes?: number; // Added likes property
  comments?: number; // Added comments property
  shares?: number; // Added shares property
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Here are the recent activities related to your campaign.
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
