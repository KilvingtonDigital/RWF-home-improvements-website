
# 🏗️ Implementation Directive: RWF Home Improvements Replication

## **Objective**

Rebuild the existing **RWF Home Improvements** website as a high-performance **Next.js (App Router)** application deployed on **Vercel**.

## **Source Materials**

* **Site Architecture**: `downloads/rwfhomeimprovements/SITE_ARCHITECTURE.md` (Sitemap & Hierarchy)
* **Text Content**: `downloads/rwfhomeimprovements/content/*.md`
* **Metadata/Structure**: `downloads/rwfhomeimprovements/data/*.json`
* **Assets**: `downloads/rwfhomeimprovements/media/*` (Images/Video)
* **Design Reference**: `downloads/rwfhomeimprovements/screenshots/*.png` & `html/*.html`

---

## **1. Technology Stack & Setup**

* **Framework**: Next.js 14+ (App Router).
* **Styling**: **Vanilla CSS** (CSS Modules + Global Variables).
  * *Constraint*: Do NOT use Tailwind CSS. Use semantic CSS variables for the design system.
* **Deployment**: Vercel.

**Initialization Command:**

```bash
npx create-next-app@latest ./ --no-tailwind --eslint --src-dir --import-alias "@/*"
```

---

## **2. Design System Implementation**

### **A. Global Variables (`app/globals.css`)**

The source site uses Wix, which exports extensive CSS variables. You must extract these from the top of `downloads/rwfhomeimprovements/content/home.md` (lines 118+) and map them to clean semantic variables.

**Primary Tokens to Map:**

* `--primary-color`: Map from `--wix-color-11` (often the brand green/blue).
* `--accent-color`: Map from `--wix-color-18` (warnings/buttons).
* `--text-primary`: Map from `--wix-color-5` (black/dark grey).
* `--bg-primary`: Map from `--wix-color-1` (white).
* **Fonts**: The site uses `Montserrat` (Headers) and `Noto Sans` (Body).
  * Import these using `next/font/google` in `app/layout.js`.

### **B. Base Reset**

Ensure `globals.css` helps with the "Premium" feel:

```css
html { scroll-behavior: smooth; }
body { font-family: var(--font-noto-sans); color: var(--text-primary); }
h1, h2, h3 { font-family: var(--font-montserrat); font-weight: 700; }
img { max-width: 100%; display: block; }
```

---

## **3. Component Architecture**

### **A. Layout Components**

* **`Navbar`**:
  * Extract links from `SITE_ARCHITECTURE.md` -> `Core` & `Services`.
  * Include "Get Quote" CTA button.
  * *Reference*: See `home.html` for exact visual placement.
* **`Footer`**:
  * Columns: Contact Info, Quick Links (Services), Social Media.
  * *Data Source*: `contact-us.json` for address/phone.

### **B. UI Primitives**

* **`HeroSection`**:
  * Design: Full-width background image with overlay text and CTA.
  * *Props*: `backgroundImage`, `title`, `subtitle`, `ctaLink`.
* **`ServiceCard`**:
  * Used on the Home page grid.
  * *Props*: `icon/image`, `title`, `description`, `link`.
* **`TestimonialSlider`**:
  * *Data Source*: `testimonial.json`.

---

## **4. Data Engineering & Page Generation**

**Strategy**: Do NOT hardcode pages manually. Use the extracted JSON data to generate pages dynamically where possible, or use them as strict references for static pages.

### **A. Asset Migration**

* **Action**: Move all files from `downloads/rwfhomeimprovements/media/` to `public/images/`.
* **Optimization**: Ensure images referenced in JSON/Markdown are updated to point to `/images/[filename]`.

### **B. Dynamic Route Handling (`app/[slug]/page.js`)**

Most top-level pages (About, Services, Contact) share a similar "Hero + Content" structure.

1. **Loader**: Create a utility to read `downloads/rwfhomeimprovements/data/[slug].json` and `content/[slug].md`.
2. **Metadata**: Generate Next.js `generateMetadata` using the `title` and `description` from the JSON file.
3. **Render**:
    * **Header**: H1 from JSON.
    * **Body**: Render the Markdown content using `react-markdown`.
    * **Styling**: Use a prose class (or custom CSS module) to style the raw Markdown output (lists, paragraphs, images).

### **C. Home Page (`app/page.js`)**

* This Page requires special attention as it is the "Shop Window".
* Construct manually using the components:
  * `<HeroSection />`: Use data from `home.json` H1/Subtitle.
  * `<ServiceGrid />`: Hardcode the main 4-6 services linking to their respective slugs (e.g., `/fayetteville-fence`).
  * `<AboutPreview />`: Excerpt from `about-us.md`.
  * `<CTASection />`: "Get a Free Quote" banner.

---

## **5. Special Features to Replicate**

* **Contact Form**:
  * Use a server action or API route.
  * Fields: Name, Email, Phone, Project Type, Message.
  * *Replication*: Match fields found in `contact-us.html`.
* **Gallery**:
  * Page: `home-improvement-project-gallery`.
  * Implementation: A Masonry or Grid layout using `next/image` for performance.
  * *Source*: Filter media folder for images not used in content (or identified as gallery images).

---

## **6. Verification Checklist**

1. **SEO Check**: Verify `<title>` and `<meta name="description">` match `data/*.json` for every page.
2. **Responsiveness**: Mobile menu must work (Hamburger menu).
3. **Asset Load**: Ensure no 404s on images. (Check `public/images` mapping).
4. **Links**: Click every nav link to ensure the `[slug]` routing catches them correctly.

---

## **7. Vercel Deployment**

1. Push code to Git repository.
2. Import project in Vercel.
3. **Build Command**: `next build`.
4. **Output Directory**: `.next`.
5. *Env Vars*: Add any necessary specific API keys if you add external forms (e.g., Resend, SendGrid).
