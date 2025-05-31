import WebApp from '@twa-dev/sdk';

export const isTelegramWebApp = () => {
  return (
    typeof window !== 'undefined' &&
    window.Telegram &&
    window.Telegram.WebApp &&
    typeof window.Telegram.WebApp.initData === 'string' &&
    window.Telegram.WebApp.initData.length > 0
  );
};

export const initTelegramApp = () => {
  if (isTelegramWebApp()) {
    WebApp.ready();
    WebApp.expand();
    return true;
  }
  return false;
};

// Mock Telegram data for browser testing
export const getMockTelegramData = () => {
  return {
    initData: 'mock_init_data',
    user: {
      id: 123456789,
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      language_code: 'en'
    }
  };
}; 