
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) => {
  // Function to handle the image path correctly
  const getImagePath = (imagePath: string) => {
    // Check if it's an external URL
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Handle relative paths from data folder or src
    if (imagePath.startsWith('/src/data/img/')) {
      // For images in the src/data/img folder
      return new URL(imagePath.replace('/src/data/', '../data/'), import.meta.url).href;
    }
    
    // For other images (assuming they're in public folder)
    return imagePath;
  };

  return (
    <img 
      src={getImagePath(src)}
      alt={alt}
      width={width}
      height={height}
      className={className || ''}
      loading="lazy"
    />
  );
};

export default OptimizedImage;
