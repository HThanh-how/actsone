"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaStream, FaUsers, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useDarkMode() as [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    // Thêm hoặc xóa class 'dark' cho body
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white';
  };
  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className={`bg-blue-800 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-blue-800'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              ACTSONE
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard')}`}
            >
              <FaChartBar className="mr-1.5" />
              Dashboard
            </Link>

            <Link
              href="/social-content"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/social-content')}`}
            >
              <FaStream className="mr-1.5" />
              Social Content
            </Link>

            <Link
              href="/influencer-network"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/influencer-network')}`}
            >
              <FaUsers className="mr-1.5" />
              Influencer Network
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center relative">
          <button onClick={toggleDarkMode} className="text-gray-300 hover:text-white ml-4">
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
          </div>

          {/* Chuyển đổi chế độ sáng/tối */}

          <button
              className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => setShowOptions(!showOptions)}
            >
              <FaUserCircle className="text-xl mr-1.5" />
              <span>Profile</span>
            </button>
        </div>
      </div>
    </nav>
  );
}
