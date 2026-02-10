/**
 * Format price in Nigerian Naira
 * @param amount - Price amount in Naira
 * @returns Formatted string with ₦ symbol
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format price in Nigerian Naira with decimal places
 * @param amount - Price amount in Naira
 * @returns Formatted string with ₦ symbol and 2 decimal places
 */
export function formatNairaWithDecimals(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
