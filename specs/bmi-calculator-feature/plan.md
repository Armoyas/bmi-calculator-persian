# Technical Implementation Plan — BMI Calculator

## How to Build

### Technology Stack

- **HTML5**: Semantic markup with RTL support
- **CSS3**: Custom properties, Flexbox, responsive design
- **Vanilla JavaScript**: BMI calculation, Persian number conversion, DOM manipulation
- **Vazirmatn Font**: CDN link for Persian typography
- **No frameworks**: Pure vanilla for minimal footprint

---

### File List

| File | Path | Purpose |
|------|------|---------|
| `index.html` | `index.html` | Main HTML page — structure, inputs, results display |
| `style.css` | `css/style.css` | All styles — layout, typography, responsive design |
| `app.js` | `js/app.js` | BMI logic + Persian number-to-words conversion |
| `spec.md` | `specs/bmi-calculator-feature/spec.md` | User-focused specification |
| `plan.md` | `specs/bmi-calculator-feature/plan.md` | This technical plan |
| `requirements.md` | `specs/bmi-calculator-feature/checklists/requirements.md` | Validation checklist |

---

### Logic Layers (Number-to-Persian Pipeline)

The Persian number-to-words conversion follows a 5-layer pipeline:

```
Input Number → [Parser] → [Tokenizer] → [Word Mapper] → [Joiner] → [Renderer]
```

#### 1. Parser (`parseNumber`)
- **Input**: Raw number (e.g., `24.5`, `1500`, `3000000`)
- **Responsibility**: Validate and decompose the number into structured components
  - Split into integer part and decimal part
  - Determine sign (positive/negative)
  - Flag for zero
- **Output**: `{ sign, integerPart, decimalPart }` object
- **Example**: `24.5` → `{ sign: '+', integerPart: 24, decimalPart: '5' }`

#### 2. Tokenizer (`tokenizeGroups`)
- **Input**: Integer part from parser
- **Responsibility**: Break the integer into groups of three digits (Persian grouping system)
  - `1500` → `[1, 500]` (1 thousand, 500)
  - `3000000` → `[3, 0, 0]` (3 million)
  - `123456` → `[123, 456]`
- **Output**: Array of 3-digit groups, least-significant first
- **Key logic**: Repeated modulo 1000 and integer division by 1000

#### 3. Word Mapper (`mapToWords`)
- **Input**: Individual 3-digit group (0–999) from tokenizer
- **Responsibility**: Map each group to Persian words using lookup tables
  - **Ones**: ۰–۹ (صفر through نه)
  - **Teens**: ۱۰–۱۹ (ده through نوزده)
  - **Tens**: ۲۰, ۳۰, ..., ۹۰ (بیست, سی, ..., نود)
  - **Hundreds**: ۱۰۰, ۲۰۰, ..., ۹۰۰ (یک صد, دو صد, ..., نه صد)
  - **Compound**: e.g., `24` → `بیست و چهار`
- **Output**: Persian word string for the group
- **Example**: `500` → `پانصد`

#### 4. Joiner (`joinGroups`)
- **Input**: Array of `{ words, scale }` pairs from word mapper
- **Responsibility**: Combine word groups with Persian scale words
  - Append group names: هزار (10³), میلیون (10⁶), میلیارد (10⁹), تریلیون (10¹²)
  - Handle Persian conjunction rules (و between components)
  - Skip empty groups (e.g., `3000000` → group `[3, 0, 0]` → skip zeros)
- **Output**: Full Persian number string
- **Example**: `[{words: "پانصد", scale: 0}, {words: "یک", scale: 1}]` → `پانصد هزار`

#### 5. Renderer (`renderResult`)
- **Input**: Persian word string + BMI data
- **Responsibility**: Format and display in the DOM
  - Insert Persian words into results area
  - Apply Persian numeral formatting (۰۱۲۳۴۵۶۷۸۹) for numeric display
  - Color-code BMI category
  - Update bilingual labels
- **Output**: Updated DOM elements visible to user

---

### Layer Data Flow Example

```
Input: 1500.5

Parser:    { sign: '+', integerPart: 1500, decimalPart: '5' }
Tokenizer: [500, 1]                          (groups, LSD first)
Mapper:    ["پانصد", "یک"]                   (per-group words)
Joiner:    "یک هزار و پانصد و نیم"            (with scales + decimal)
Renderer:  Display in DOM with Persian numerals
```

---

### Skills Required

| Skill | Purpose | Priority |
|-------|---------|----------|
| **Persian/RTL** | Proper RTL layout, Vazirmatn font integration, Persian text rendering, bidirectional content handling | **Required** |
| **Unit-Testing** | Test each logic layer independently (parser edge cases, tokenizer grouping, word mapper accuracy, joiner conjunction rules, renderer output) | **Required** |
| **Static Server** | Local development server for testing (e.g., `npx serve`, `python -m http.server`) | **Optional** |
| **PDF Generation** | WeasyPrint / wkhtmltopdf for generating PDF reports from BMI results (per project needs) | **Nice-to-have** |

#### Skill Details

- **Persian/RTL**: Handle `dir="rtl"`, `lang="fa"`, proper font stack, text alignment, and Persian typographic conventions (e.g., number display preferences)
- **Unit-Testing**: Target the 5-layer pipeline with isolated tests:
  - Parser: zero, negative, large numbers, decimals
  - Tokenizer: exact group boundaries (999, 1000, 999999, 1000000)
  - Word Mapper: each digit, teen, tens, hundred combination
  - Joiner: scale word insertion, empty group skipping, conjunction placement
  - Renderer: DOM output format, Persian numeral conversion
- **Static Server**: For local development and QA testing before deployment

---

### Implementation Steps

1. **HTML Structure** (`index.html`)
   - Container with RTL direction and `lang="fa"`
   - Input fields: weight (kg), height (cm)
   - Calculate button
   - Results display area (5 renderer targets)
   - Persian/English bilingual labels

2. **CSS Styling** (`css/style.css`)
   - CSS custom properties for colors, spacing, radii
   - Vazirmatn font import via Google Fonts CDN
   - RTL layout with `dir="rtl"`
   - Responsive design (mobile-first)
   - Category color coding (4 categories)
   - Clean card-based layout

3. **JavaScript Logic** (`js/app.js`)
   - **Parser**: `parseNumber(num)` — decompose into sign, integer, decimal
   - **Tokenizer**: `tokenizeGroups(integer)` — split into 3-digit groups
   - **Word Mapper**: `underThousandToWords(n)` — map 0–999 to Persian words
   - **Joiner**: `numberToPersianWords(num)` — combine groups with scale words
   - **Renderer**: `renderResult(bmi, category)` — update DOM with formatted results
   - Supporting: `calculateBMI()`, `getBMICategory()`, `formatPersianNumber()`

4. **Persian Number Conversion Algorithm**
   - Split number into integer and decimal parts (Parser)
   - Convert integer part using recursive grouping (Tokenizer → Mapper → Joiner)
   - Convert decimal part digit by digit
   - Handle special cases: teens (۱۰–۱۹), tens (۲۰, ۳۰, ...), zero (صفر)
   - Render all results with Persian numerals and RTL layout (Renderer)

---

### Key Design Decisions

- **Vanilla JS over frameworks**: Minimal footprint, no build step, instant load
- **CDN font**: No local font files needed, fast setup
- **Single page**: All logic in one HTML flow, no routing needed
- **RTL-first**: Persian is primary language, English as secondary
- **5-layer pipeline**: Each layer is independently testable and replaceable

---

### Performance Considerations

- No external JS dependencies (except font CDN)
- CSS minification not required for MVP
- Inline critical CSS not needed (small stylesheet)
- Lazy loading not applicable (single page)
