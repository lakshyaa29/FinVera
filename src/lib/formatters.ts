/**
 * Indian Rupee & Number Formatting Helpers for FinVera
 */

export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const abs = Math.abs(rounded);

  if (compact) {
    if (abs >= 10000000) {
      // Crores
      const cr = (abs / 10000000).toFixed(2).replace(/\.00$/, '');
      return `${isNegative ? '-' : ''}₹${cr} Cr`;
    }
    if (abs >= 100000) {
      // Lakhs
      const lk = (abs / 100000).toFixed(2).replace(/\.00$/, '');
      return `${isNegative ? '-' : ''}₹${lk} L`;
    }
    if (abs >= 1000) {
      const k = (abs / 1000).toFixed(1).replace(/\.0$/, '');
      return `${isNegative ? '-' : ''}₹${k}k`;
    }
    return `${isNegative ? '-' : ''}₹${abs}`;
  }

  // Standard Indian formatting (e.g. 12,34,567)
  const str = abs.toString();
  let result = '';
  if (str.length <= 3) {
    result = str;
  } else {
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    result = formattedOthers + ',' + lastThree;
  }

  return `${isNegative ? '-' : ''}₹${result}`;
}

export function formatNumber(num: number): string {
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
}

export function formatPercent(num: number, decimals: number = 1): string {
  if (isNaN(num)) return '0%';
  return `${num.toFixed(decimals)}%`;
}
