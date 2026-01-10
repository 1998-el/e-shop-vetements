// Utility function to handle different product image structures
// Supports both legacy string arrays and API ProductImage objects

export interface ProductImageObject {
  url: string;
  isPrimary?: boolean;
  altText?: string;
}

// Image validation function with cross-browser compatibility
export const validateImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for cross-browser compatibility
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};

export const getProductImageUrl = (product: any): string => {

  
  // Handle case where images is an array of strings (Legacy/UI Product)
  if (Array.isArray(product.images)) {
    // Check if first element is a string (legacy format)
    if (typeof product.images[0] === 'string') {
      const imageUrl = product.images[0];
      const result = imageUrl;

      return result;
    }
    
    // Check if elements are objects (API format)
    if (typeof product.images[0] === 'object') {
      const primaryImage = product.images.find((img: ProductImageObject) => img.isPrimary);
      const imageUrl = primaryImage?.url || product.images[0]?.url;
      const result = imageUrl;

      return result;
    }
  }
  
  // Handle single image property (UI Product)
  if (product.image) {

    return product.image;
  }
  
  // No fallback - return empty string to trigger error handling

  return '';
};

export const getProductImageSrcSet = (product: any): string => {

  
  if (!Array.isArray(product.images) || product.images.length === 0) {

    return '';
  }
  
  let srcSet = '';
  
  // Handle legacy format (array of strings)
  if (typeof product.images[0] === 'string') {
    srcSet = product.images.map((img: string, index: number) => {
      // Create different sizes by appending size suffixes if needed
      // For now, just return the same image for all sizes
      return `${img} ${index + 1}x`;
    }).join(', ');
    

  }
  
  // Handle API format (array of objects)
  if (typeof product.images[0] === 'object') {
    srcSet = product.images.map((img: ProductImageObject, index: number) => {
      return `${img.url} ${index + 1}x`;
    }).join(', ');
    

  }
  

  
  return srcSet;
};