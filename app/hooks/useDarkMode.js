// hooks/useDarkMode.js
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      // Lấy trạng thái từ localStorage hoặc mặc định theo cài đặt hệ điều hành
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true' || (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false; // Default to false if not in the browser
  });

  useEffect(() => {
    // Lưu trạng thái vào localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(isDarkMode));
      if (isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;