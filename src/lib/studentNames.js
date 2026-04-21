/**
 * Static map of all 50 students: roll number → display name.
 * Used across the app for dropdowns, leaderboard, etc.
 * Names are title-cased for clean display.
 */
const STUDENT_NAMES = {
  1: 'Anjanee Gouria',
  2: 'Mahak Katoch',
  3: 'Redhima Sharma',
  4: 'Palvi Devi',
  5: 'Sonia Thakur',
  6: 'Manisha Bhau',
  7: 'Swati Sharma',
  8: 'Rimjhim Panidta',
  9: 'Nazima Akhter',
  10: 'Aastha Sharma',
  11: 'Suhani Sharma',
  12: 'Deksha Sharma',
  13: 'Abida Kouser',
  14: 'Vishakha Sharma',
  15: 'Arushi Basotra',
  16: 'Shallu Devi',
  17: 'Palak Sharma',
  18: 'Razah Fatima',
  19: 'Iram Jan',
  20: 'Nitika Kundal',
  21: 'Sumiksha Badyal',
  22: 'Bhavya',
  23: 'Upasana Sharma',
  24: 'Nitish Kumar',
  25: 'Sudhanshu Sharma',
  26: 'Danishwer',
  27: 'Yog Raj Singh',
  28: 'Nikhil Kumar',
  29: 'Amritanshu Raghav Khajuria',
  30: 'Manav Sharma',
  31: 'Rajit Sharma',
  32: 'Devinder Verma',
  33: 'Roshan Kumar',
  34: 'Syed Mohsin Murtaza',
  35: 'Jatin Munday',
  36: 'Faizan Mudasir',
  37: 'Kamil Akmal Batt',
  38: 'Archita Sharma',
  39: 'Syeed Makeen Ahmed Shah',
  40: 'Ranjeet Singh',
  41: 'Rahul Dev Verma',
  42: 'Amit Singh',
  43: 'Pushpinder Singh',
  44: 'Swastik Sharma',
  45: 'Panshul Sharma',
  46: 'Sahil Akhter',
  47: 'Harish Sharma',
  48: 'Dawood Ibrahiem',
  49: 'Imran Waseem',
  50: 'Suleman Alyas',
};

/**
 * Get display name for a roll number.
 * Falls back to "Roll XX" if not found.
 */
export function getStudentName(rollNumber) {
  return STUDENT_NAMES[rollNumber] || `Roll ${String(rollNumber).padStart(2, '0')}`;
}

/**
 * Get initials from a name (for avatar fallback).
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default STUDENT_NAMES;
