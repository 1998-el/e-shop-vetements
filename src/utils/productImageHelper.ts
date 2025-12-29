// Utility function to handle different product image structures
// Supports both legacy string arrays and API ProductImage objects

export interface ProductImageObject {
  url: string;
  isPrimary?: boolean;
  altText?: string;
}

export const getProductImageUrl = (product: any): string => {
  // Handle case where images is an array of strings (Legacy/UI Product)
  if (Array.isArray(product.images)) {
    // Check if first element is a string (legacy format)
    if (typeof product.images[0] === 'string') {
      return product.images[0] || '/images/products/default.jpg';
    }
    
    // Check if elements are objects (API format)
    if (typeof product.images[0] === 'object') {
      const primaryImage = product.images.find((img: ProductImageObject) => img.isPrimary);
      return primaryImage?.url || product.images[0]?.url || '/images/products/default.jpg';
    }
  }
  
  // Handle single image property (UI Product)
  if (product.image) {
    return product.image;
  }
  
  // Fallback to default image
  return '/images/products/default.jpg';
};

export const getProductImageSrcSet = (product: any): string => {
  if (!Array.isArray(product.images) || product.images.length === 0) {
    return '';
  }
  
  // Handle legacy format (array of strings)
  if (typeof product.images[0] === 'string') {
    return product.images.map((img: string, index: number) => {
      // Create different sizes by appending size suffixes if needed
      // For now, just return the same image for all sizes
      return `${img} ${index + 1}x`;
    }).join(', ');
  }
  
  // Handle API format (array of objects)
  if (typeof product.images[0] === 'object') {
    return product.images.map((img: ProductImageObject, index: number) => {
      return `${img.url} ${index + 1}x`;
    }).join(', ');
  }
  
  return '';
};