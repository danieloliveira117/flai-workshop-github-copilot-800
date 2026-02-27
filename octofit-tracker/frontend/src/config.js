// Determine the API base URL based on environment
// Uses REACT_APP_CODESPACE_NAME env var (set automatically in GitHub Codespaces)
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log('OctoFit API_BASE_URL:', API_BASE_URL);
