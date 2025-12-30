// Utility function to handle different product image structures
// Supports both legacy string arrays and API ProductImage objects

export interface ProductImageObject {
  url: string;
  isPrimary?: boolean;
  altText?: string;
}

export const getProductImageUrl = (product: any): string => {
  console.log('🖼️  getProductImageUrl called', {
    productId: product.id,
    productName: product.name,
    hasImages: !!(product.images),
    imagesType: Array.isArray(product.images) ? 'array' : typeof product.images,
    imagesLength: Array.isArray(product.images) ? product.images.length : 'N/A',
    hasImageProperty: !!product.image
  });
  
  // Handle case where images is an array of strings (Legacy/UI Product)
  if (Array.isArray(product.images)) {
    // Check if first element is a string (legacy format)
    if (typeof product.images[0] === 'string') {
      const result = product.images[0] || '/images/products/default.jpg';
      console.log('🖼️  Legacy string format detected', {
        productId: product.id,
        selectedImage: result
      });
      return result;
    }
    
    // Check if elements are objects (API format)
    if (typeof product.images[0] === 'object') {
      const primaryImage = product.images.find((img: ProductImageObject) => img.isPrimary);
      const result = primaryImage?.url || product.images[0]?.url || '/images/products/default.jpg';
      console.log('🖼️  API object format detected', {
        productId: product.id,
        primaryImageFound: !!primaryImage,
        selectedImage: result,
        totalImages: product.images.length
      });
      return result;
    }
  }
  
  // Handle single image property (UI Product)
  if (product.image) {
    console.log('🖼️  Single image property used', {
      productId: product.id,
      imageProperty: product.image
    });
    return product.image;
  }
  
  // Fallback to default image
  console.log('🖼️  Using default fallback image', {
    productId: product.id
  });
  return '/images/products/default.jpg';
};

export const getProductImageSrcSet = (product: any): string => {
  console.log('🖼️  getProductImageSrcSet called', {
    productId: product.id,
    productName: product.name,
    hasImages: !!(product.images && product.images.length > 0),
    imagesType: Array.isArray(product.images) ? 'array' : typeof product.images
  });
  
  if (!Array.isArray(product.images) || product.images.length === 0) {
    console.log('🖼️  No images available for srcset', {
      productId: product.id
    });
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
    
    console.log('🖼️  Legacy string format for srcset', {
      productId: product.id,
      imagesCount: product.images.length,
      srcSetPreview: srcSet.substring(0, 100) + (srcSet.length > 100 ? '...' : '')
    });
  }
  
  // Handle API format (array of objects)
  if (typeof product.images[0] === 'object') {
    srcSet = product.images.map((img: ProductImageObject, index: number) => {
      return `${img.url} ${index + 1}x`;
    }).join(', ');
    
    console.log('🖼️  API object format for srcset', {
      productId: product.id,
      imagesCount: product.images.length,
      srcSetPreview: srcSet.substring(0, 100) + (srcSet.length > 100 ? '...' : '')
    });
  }
  
  console.log('🖼️  Final srcSet result', {
    productId: product.id,
    srcSetLength: srcSet.length,
    isEmpty: srcSet === ''
  });
  
  return srcSet;
};