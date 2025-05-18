
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
    
    // Handle image paths that might be from the data folder
    if (imagePath.includes('img_q3_engrenagens')) {
      return '/images/engrenagens-q3.webp';
    } else if (imagePath.includes('img_q4_eixos')) {
      return '/images/eixos-q4.webp';
    } else if (imagePath.includes('img_q4_engrenagens')) {
      return '/images/engrenagens-q4.webp';
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
