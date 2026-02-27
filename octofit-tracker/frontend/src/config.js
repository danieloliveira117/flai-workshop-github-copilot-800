// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  // Running in a GitHub Codespace
  if (hostname.includes('.app.github.dev')) {
    const codespaceName = hostname.split('-3000.')[0];
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  // Local development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();
