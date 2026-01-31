import { useEffect, useState } from 'react';

const MyMiniApp = () => {
  const [initData, setInitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(null);
  const [error, setError] = useState(null);

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
      console.log('[v0] Init Data:', data);

      // Send initData to login endpoint
      if (data) {
        sendLoginRequest(data);
      } else {
        setError('No initData available');
        setLoading(false);
      }
    } else {
      console.error("[v0] Telegram WebApp script not found or not initialized.");
      setError('Telegram WebApp not available');
      setLoading(false);
    }
  }, []);

  const sendLoginRequest = async (data) => {
    try {
      console.log('[v0] Sending login request to API with initData');
      const response = await fetch('https://ora-splittable-illuminatedly.ngrok-free.dev/api/v1/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData: data }),
      });

      console.log('[v0] Login response status:', response.status);
      const result = await response.json();
      console.log('[v0] Login response data:', result);

      if (response.ok) {
        setAuthStatus('success');
        // Store token or user data if provided
        if (result.token) {
          localStorage.setItem('authToken', result.token);
        }
      } else {
        setAuthStatus('error');
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('[v0] Login request error:', err);
      setAuthStatus('error');
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Welcome to My Mini App</h1>
      
      {loading ? (
        <p>Loading and authenticating...</p>
      ) : (
        <div>
          {authStatus === 'success' ? (
            <div style={{ color: 'green', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '20px' }}>
              <p>✓ Authentication successful!</p>
            </div>
          ) : authStatus === 'error' ? (
            <div style={{ color: 'red', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '20px' }}>
              <p>✗ Authentication failed: {error}</p>
            </div>
          ) : null}

          {initData ? (
            <div>
              <p>Init Data sent to server:</p>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '12px'
              }}>
                {initData}
              </pre>
            </div>
          ) : (
            <p>No init data available. Make sure the app is opened from Telegram.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyMiniApp;
