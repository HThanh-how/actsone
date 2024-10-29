// hooks/useDarkMode.js
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Lấy trạng thái từ localStorage hoặc mặc định theo cài đặt hệ điều hành
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Lưu trạng thái vào localStorage
    localStorage.setItem('darkMode', String(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;