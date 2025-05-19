
import React from 'react';

const ControlPanel = () => {
  return (
    <iframe
      src="https://www.example.com/"
      title="Control Panel"
      className="w-full h-full border-0"
      style={{ height: 'calc(100vh - 64px)', width: '100%' }}
    />
  );
};

export default ControlPanel;
