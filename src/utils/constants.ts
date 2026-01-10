// Constants for the e-commerce application

export const CURRENCY = 'USD';
export const API_BASE_URL = 'http://localhost:5000/api';
export const BACKEND_BASE_URL = 'http://localhost:5000';

// Function to build full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return `${BACKEND_BASE_URL}/images/products/default.jpg`;

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with /uploads, prepend the backend base URL
  if (imagePath.startsWith('/uploads')) {
    return `${BACKEND_BASE_URL}${imagePath}`;
  }

  // If it's a relative path without leading slash, add it
  if (!imagePath.startsWith('/')) {
    return `${BACKEND_BASE_URL}/uploads/${imagePath}`;
  }

  // For other relative paths, assume they're from uploads
  return `${BACKEND_BASE_URL}/uploads${imagePath}`;
};
