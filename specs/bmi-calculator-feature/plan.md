# Technical Implementation Plan — BMI Calculator

## How to Build

### Technology Stack

- **HTML5**: Semantic markup with RTL support
- **CSS3**: Custom properties, Flexbox, responsive design
- **Vanilla JavaScript**: BMI calculation, Persian number conversion, DOM manipulation
- **Vazirmatn Font**: CDN link for Persian typography
- **No frameworks**: Pure vanilla for minimal footprint

### File Structure

```
bmi-calculator-persian/
├── index.html          # Main HTML page
├── css/
│   └── styles.css      # All styles
├── js/
│   └── app.js          # BMI logic + Persian conversion
├── specs/
│   └── bmi-calculator-feature/
│       ├── spec.md     # User specification
│       ├── plan.md     # This plan
│       └── checklists/
│           └── requirements.md  # Validation checklist
└── README.md
```

### Implementation Steps

1. **HTML Structure** (`index.html`)
   - Container with RTL direction
   - Input fields: weight (kg), height (cm)
   - Calculate button
   - Results display area
   - Persian/English bilingual labels

2. **CSS Styling** (`css/styles.css`)
   - CSS custom properties for colors, spacing
   - Vazirmatn font import
   - RTL layout with `dir="rtl"`
   - Responsive design (mobile-first)
   - Category color coding
   - Clean card-based layout

3. **JavaScript Logic** (`js/app.js`)
   - `calculateBMI(weight, height)` — computes BMI
   - `numberToPersianWords(num)` — converts numbers to Persian words
   - `getBMICategory(bmi)` — returns category object
   - Event listeners for form submission
   - DOM updates with Persian-formatted results

4. **Persian Number Conversion Algorithm**
   - Split number into integer and decimal parts
   - Convert integer part using recursive grouping (thousands)
   - Convert decimal part digit by digit
   - Handle special cases: teens, tens, zero

### Key Design Decisions

- **Vanilla JS over frameworks**: Minimal footprint, no build step, instant load
- **CDN font**: No local font files needed, fast setup
- **Single page**: All logic in one HTML flow, no routing needed
- **RTL-first**: Persian is primary language, English as secondary

### Performance Considerations

- No external JS dependencies (except font CDN)
- CSS minification not required for MVP
- Inline critical CSS not needed (small stylesheet)
- Lazy loading not applicable (single page)