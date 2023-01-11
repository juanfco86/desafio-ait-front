import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from './Components/auth0/Auth0ProviderWithHistory ';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Auth0ProviderWithHistory>
    <App />
  </Auth0ProviderWithHistory>

);
