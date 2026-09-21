import React from 'react';
import ReactDOM from 'react-dom/client';
import config from '../gitprofile.config';
import DiagramPage from './components/diagram-page';

// Serve Excalifont from public/fonts instead of Excalidraw's CDN. Families we
// don't vendor (e.g. the 13 MB CJK set) still fall back to the CDN.
window.EXCALIDRAW_ASSET_PATH = '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiagramPage config={config} />
  </React.StrictMode>
);
