
import React from 'react';

const ControlPanel = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b">
        <h1 className="text-2xl font-bold">Control Panel</h1>
        <p className="text-gray-600">Manage your hosting services and configurations</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe 
          src="https://www.example.com/" 
          title="Control Panel" 
          className="w-full h-full"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default ControlPanel;
