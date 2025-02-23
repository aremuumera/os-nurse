// src/types/PageContainer.types.ts

import React from 'react';

export interface MetaProps {
  title: string;                 // Required: Page title
  description?: string;           // Optional: Meta description
  keywords?: string;              // Optional: Meta keywords
  author?: string;                // Optional: Meta author

  // Social Media Meta Tags
  ogTitle?: string;               // Open Graph title
  ogDescription?: string;         // Open Graph description
  ogImage?: string;               // Open Graph image URL
  ogUrl?: string;                 // Open Graph URL (defaults to page URL)
  
  twitterTitle?: string;          // Twitter card title
  twitterDescription?: string;    // Twitter card description
  twitterImage?: string;          // Twitter card image URL
  
  children?: React.ReactNode;     // Optional: Nested components
}
