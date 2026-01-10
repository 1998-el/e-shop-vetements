// Utility functions for the e-commerce application

/**
 * Format price to a string with currency
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

/**
 * Calculate total price of items in the cart
 * @param items - Array of cart items
 * @returns Total price
 */
export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
