import { useEffect, useState } from 'react';

const MyMiniApp = () => {
  const [initData, setInitData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the Telegram WebApp object is available in the window
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize the app for UI elements like main button
      tg.ready();
      
      // Expand the app to fullscreen if available
      if (tg.expand) {
        tg.expand();
      }

      const data = tg.initData;
      setInitData(data);
      console.log('Init Data:', data);
    } else {
      console.error("Telegram WebApp script not found or not initialized.");
    }
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Welcome to My Mini App</h1>
      {loading ? (
        <p>Loading init data...</p>
      ) : initData ? (
        <div>
          <p>Init Data received:</p>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}>
            {initData}
          </pre>
        </div>
      ) : (
        <p>No init data available. Make sure the app is opened from Telegram.</p>
      )}
    </div>
  );
};

export default MyMiniApp;
