
import React from 'react';

const ControlPanel = () => {
  return (
    <iframe
      src="https://www.example.com/"
      title="Control Panel"
      className="w-full h-full border-0"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    />
  );
};

export default ControlPanel;
