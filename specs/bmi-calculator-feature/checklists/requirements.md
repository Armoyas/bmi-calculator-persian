# Validation Checklist — BMI Calculator

## Requirements Validation

### Functional Requirements

- [ ] BMI calculation is accurate (weight kg / height m²)
- [ ] Persian number conversion handles 0-9 digits correctly
- [ ] Persian number conversion handles multi-digit numbers (thousands, millions)
- [ ] BMI categories are correctly classified
- [ ] Decimal numbers convert to Persian words (e.g., 24.5 → بیست و چهار و نیم)
- [ ] Height input accepts both cm and m
- [ ] Input validation prevents negative numbers and zero

### UI/UX Requirements

- [ ] Vazirmatn font loads correctly
- [ ] RTL layout renders properly
- [ ] Bilingual labels (Persian + English) visible
- [ ] Responsive design works on mobile
- [ ] Category result has color coding
- [ ] Clean, modern card-based layout

### Technical Requirements

- [ ] No external JS frameworks loaded
- [ ] No build step required
- [ ] Works offline (except font CDN)
- [ ] HTML validates (no errors)
- [ ] CSS follows custom properties pattern
- [ ] JavaScript uses ES6+ features

### Persian Language Requirements

- [ ] Persian numerals (۰۱۲۳۴۵۶۷۸۹) display correctly
- [ ] Number grouping words present (هزار، میلیون)
- [ ] Proper conjugation in Persian number words
- [ ] No Arabic loanwords where Persian equivalents exist

### Accessibility Requirements

- [ ] Form inputs have associated labels
- [ ] Button has clear focus state
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader compatible (lang attributes)
- [ ] Keyboard navigable
