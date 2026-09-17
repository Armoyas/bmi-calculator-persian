# BMI Calculator — Persian Number-to-Words

## Goal
Build a single-page Persian BMI calculator web app where the user enters weight (kg) and height (cm), presses a button, and sees the BMI number in Persian digits, the BMI value written in Persian words, and the BMI category in Persian.

## Inputs
- Weight (kg) — numeric, positive
- Height (cm) — numeric, positive

## Outputs
1. **BMI number** displayed in Persian digits (e.g. `۲۴٫۵`)
2. **BMI in Persian words** (e.g. `بیست و چهار و نیم`)
3. **BMI category** in Persian:
   - `< 18.5` → کم‌وزنی
   - `18.5 – 24.9` → نرمال
   - `25 – 29.9` → اضافه‌وزن
   - `≥ 30` → چاقی

## UI Requirements
- RTL layout
- Vazirmatn font (CDN `<link>` with offline fallback to system font)
- One input card with two fields and one button
- One result panel showing all three outputs

## Constraints
- Vanilla HTML/CSS/JS only — no frameworks, no bundler
- Must work offline by opening `index.html` directly
- No external API calls

## Out of Scope
- History / saving data
- Login / authentication
- Decimals beyond 1 decimal place
