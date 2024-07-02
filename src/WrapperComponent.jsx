// Wrapper component in another file
import React from 'react';
import App from './App';

function WrapperComponent() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <App />
    </div>
  );
}

export default WrapperComponent;
