# BMI Calculator — Number to Persian Words

## Overview

A clean, minimal web-based BMI calculator with Persian/friendly number-to-word conversion. Built using Spec-Driven Development (SpecKit layout) with vanilla HTML/CSS/JS.

## User-Focused Specification

### What to Build

A single-page BMI calculator that:

1. Accepts user input for weight (kg) and height (cm)
2. Calculates BMI and displays the result
3. Categorizes the BMI result (Underweight, Normal, Overweight, Obese)
4. Converts numeric results to Persian words (e.g., "24.5" → "بیست و چهار و نیم")
5. Displays all results with Persian-friendly number formatting
6. Uses Vazirmatn font for proper Persian typography
7. Supports RTL layout with bilingual (Persian + English) labels

### Key Features

- **BMI Calculation**: Standard formula BMI = weight(kg) / height(m)²
- **Persian Number Conversion**: Arabic numerals (0-9) converted to Persian words
- **BMI Categories**:
  - Underweight: BMI < 18.5
  - Normal: 18.5 ≤ BMI < 25
  - Overweight: 25 ≤ BMI < 30
  - Obese: BMI ≥ 30
- **Clean Minimal UI**: Modern, accessible, responsive design
- **No Heavy Frameworks**: Vanilla HTML/CSS/JS only

### User Flow

1. User opens the page
2. User enters weight in kilograms
3. User enters height in centimeters
4. User clicks "Calculate"
5. BMI result appears with Persian word conversion
6. Category is displayed with appropriate color coding

## Persian Number System

### Digit Mapping
| Arabic | Persian Word |
|--------|-------------|
| 0 | صفر |
| 1 | یک |
| 2 | دو |
| 3 | سه |
| 4 | چهار |
| 5 | پنج |
| 6 | شش |
| 7 | هفت |
| 8 | هشت |
| 9 | نه |

### Grouping Words
| Scale | Persian Word |
|-------|-------------|
| 10³ | هزار |
| 10⁶ | میلیون |
| 10⁹ | میلیارد |
| 10¹² | تریلیون |