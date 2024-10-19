// utils/dateUtils.js
import dayjs from 'dayjs';

/**
 * Calculate start and end dates based on the specified interval.
 * @param {string} interval - The time interval (e.g., 'weekly', 'bi-weekly', 'monthly').
 * @returns {Object} - An object containing the formatted start and end dates.
 */
export const calculateDateRange = (interval) => {
  const endDate = dayjs(); // Current date as the end date
  let startDate;

  // Adjust the start date based on the interval
  switch (interval.toLowerCase()) {
    case 'weekly':
      startDate = endDate.subtract(1, 'week');
      break;
    case 'bi-weekly':
      startDate = endDate.subtract(2, 'weeks');
      break;
    case 'monthly':
      startDate = endDate.subtract(1, 'month');
      break;
    default:
      startDate = endDate.subtract(1, 'week'); // Default to weekly if interval is unknown
      break;
  }

  // Return the formatted start and end dates
  return {
    startDate: startDate.format('MMMM D, YYYY'), // e.g., "October 1, 2024"
    endDate: endDate.format('MMMM D, YYYY'),
  };
};
