
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetadataProps {
  title: string;
  description: string;
}

export const Metadata: React.FC<MetadataProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kahfweb.com" />
    </Helmet>
  );
};
