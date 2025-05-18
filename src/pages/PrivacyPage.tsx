
import React from 'react';
import PrivacyContent from '@/components/legal/PrivacyContent';
import { Metadata } from '@/components/Metadata';

const PrivacyPage = () => {
  return (
    <>
      <Metadata 
        title="Privacy Policy - KahfWeb"
        description="Learn about how KahfWeb collects and processes your personal information."
      />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPage;
