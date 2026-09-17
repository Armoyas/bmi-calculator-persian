/* ============================================
   BMI Calculator with Persian Number-to-Words
   ============================================ */

// Persian digit mapping
const PERSIAN_DIGITS = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const PERSIAN_NUMERALS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Group names for Persian number system
const GROUP_NAMES = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

/**
 * Convert a single digit (0-9) to Persian word
 * @param {number} digit
 * @returns {string}
 */
function digitToWord(digit) {
  return PERSIAN_DIGITS[digit];
}

/**
 * Convert a number under 1000 to Persian words
 * @param {number} num - Integer 0-999
 * @returns {string}
 */
function underThousandToWords(num) {
  if (num === 0) return '';

  const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];

  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const tensPart = tens[Math.floor(num / 10)];
    const onesPart = num % 10;
    return onesPart > 0 ? `${tensPart} و ${ones[onesPart]}` : tensPart;
  }

  // 100-999
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  let result = `${ones[hundreds]} صد`;
  if (remainder > 0) {
    if (remainder < 10) {
      result += ` و ${ones[remainder]}`;
    } else if (remainder < 20) {
      result += ` و ${teens[remainder - 10]}`;
    } else {
      const tensPart = tens[Math.floor(remainder / 10)];
      const onesPart = remainder % 10;
      result += ` و ${tensPart}${onesPart > 0 ? ` و ${ones[onesPart]}` : ''}`;
    }
  }
  return result;
}

/**
 * Convert an integer to Persian words using Persian grouping system
 * @param {number} num
 * @returns {string}
 */
function numberToPersianWords(num) {
  if (num === 0) return PERSIAN_DIGITS[0];
  if (num < 0) return `منفی ${numberToPersianWords(Math.abs(num))}`;

  if (num < 1000) return underThousandToWords(num);

  // Split into groups of thousands
  const groups = [];
  let n = num;
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  let result = '';
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    const groupWords = underThousandToWords(groups[i]);
    const groupName = GROUP_NAMES[i];
    if (result) {
      result += ` ${groupWords} ${groupName}`;
    } else {
      result = `${groupWords} ${groupName}`;
    }
  }

  return result.trim();
}

/**
 * Convert a decimal number to Persian words (handles decimals)
 * @param {number} num
 * @returns {string}
 */
function decimalToPersianWords(num) {
  const str = num.toString();
  const parts = str.split('.');
  const integerPart = parseInt(parts[0], 10);
  const decimalPart = parts[1] || '';

  let result = numberToPersianWords(integerPart);

  if (decimalPart.length > 0) {
    const decimalWords = decimalPart.split('').map(d => PERSIAN_DIGITS[parseInt(d, 10)]).join(' و ');
    result += ` و نیم` if decimalPart === '5' && decimalPart.length === 1 else ` و ${decimalWords}`;
  }

  return result;
}

/**
 * Get BMI category object
 * @param {number} bmi
 * @returns {object}
 */
function getBMICategory(bmi) {
  if (bmi < 18.5) return { name: 'کم‌وزنی', nameEn: 'Underweight', class: 'underweight' };
  if (bmi < 25) return { name: 'نرمال', nameEn: 'Normal', class: 'normal' };
  if (bmi < 30) return { name: 'اضافه‌وزن', nameEn: 'Overweight', class: 'overweight' };
  return { name: 'چاقی', nameEn: 'Obese', class: 'obese' };
}

/**
 * Calculate BMI
 * @param {number} weight - in kg
 * @param {number} height - in cm
 * @returns {number}
 */
function calculateBMI(weight, height) {
  const heightM = height / 100;
  return weight / (heightM * heightM);
}

/**
 * Format number with Persian numerals
 * @param {number} num
 * @param {number} decimals
 * @returns {string}
 */
function formatPersianNumber(num, decimals = 1) {
  const fixed = num.toFixed(decimals);
  return fixed.replace(/[0-9]/g, d => PERSIAN_NUMERALS[parseInt(d, 10)]);
}

// ============================================
// DOM Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultSection = document.getElementById('resultSection');
  const bmiNumberEl = document.getElementById('bmiNumber');
  const bmiPersianEl = document.getElementById('bmiPersian');
  const bmiCategoryEl = document.getElementById('bmiCategory');
  const weightDisplay = document.getElementById('weightDisplay');
  const heightDisplay = document.getElementById('heightDisplay');

  calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Validation
    if (!weight || weight <= 0) {
      alert('لطفاً وزن معتبر وارد کنید (عدد مثبت)');
      return;
    }
    if (!height || height <= 0) {
      alert('لطفاً قد معتبر وارد کنید (عدد مثبت)');
      return;
    }

    // Calculate
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    // Display results
    bmiNumberEl.textContent = formatPersianNumber(bmi, 1);
    bmiPersianEl.textContent = `(${decimalToPersianWords(bmi)})`;
    bmiCategoryEl.textContent = `${category.name} (${category.nameEn})`;
    bmiCategoryEl.className = `category ${category.class}`;

    weightDisplay.textContent = `${formatPersianNumber(weight, 1)} کیلوگرم`;
    heightDisplay.textContent = `${formatPersianNumber(height, 1)} سانتی‌متر`;

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
