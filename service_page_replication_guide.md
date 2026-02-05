# Service Page Standardization Guide (The "Fayetteville Model")

This guide documents the optimization pattern established on the `/fayetteville-fence` page. Use this blueprint to replicate the high-performance design and SEO benefits across other service and sub-service pages.

## 1. Technical Setup (`page.tsx`)

Ensure `app/[...slug]/page.tsx` is configured to support the advanced layout features.

### A. Imports

Add the following plugins and components:

```tsx
import remarkGfm from 'remark-gfm'; // Powering tables
import rehypeRaw from 'rehype-raw'; // Powering HTML in tables (H3 links)
import ProcessSteps from '@/components/ProcessSteps'; // The new visual process grid
```

### B. Renderer Configuration

Update the `<ReactMarkdown>` component to support the "Product Card Table" pattern:

```tsx
<ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
        img: ({ node, ...props }) => (
            <img {...props} />
        ),
    }}
>
    {data.content}
</ReactMarkdown>
```

### C. Component Injection

Inject the `ProcessSteps` component **after** the main content container and **before** the Service Areas:

```tsx
{data.processSteps && (
    <ProcessSteps
        title="Our Installation Process" // Or "Our [Service] Process"
        steps={data.processSteps}
    />
)}
```

---

## 2. Content Structure (JSON)

Update the page's `.json` file (e.g., `data/service-name.json`) to drive the new features.

### A. SEO Metadata

* **Title**: `Top-Rated [Service] [City], NC | [Keyword 1] & [Keyword 2] Experts`
  * *Example*: "Top-Rated Fence Installation Fayetteville, NC | Wood & Vinyl Experts"
* **Description**: `Looking for the best [service] company in [City]? RWF offers custom [Material A], [Material B], and [Material C]. Lifetime warranty. Get a free quote today!`

### B. Headings (Geo-Optimization)

Update generic headings to include the target city/location:

* `Our Options` -> `[Service] Options for [City] Properties`
* `Why Choose Us?` -> `Why Choose RWF for Your [City] [Service] Project?`

### C. Process Data (`processSteps`)

Add the `processSteps` array. Use **local, high-quality images** (not Wix links).

```json
  "processSteps": [
    {
      "title": "Free Consultation",
      "description": "We begin with an on-site consultation...",
      "image": "/images/gallery/your-local-image-1.jpg"
    },
    // ... Steps 2, 3, 4
  ]
```

---

## 3. Content Formatting (Markdown)

Refactor the `.md` content file to consistent of two main sections:

### A. The "Magazine" Intro

A clean introduction without large breaks. Images should use the standard markdown image syntax.

### B. The "Product Card" Table

Replace standard lists of options with this "Grid Table" pattern. This creates the visual card effect.

**Syntax Pattern:**

```markdown
| Style | Description |
|---|---|
| ![Alt Text](/images/local-image.jpg) | <h3><a href="/link-to-subpage">Service Name</a></h3> Description of the service... |
```

* **Note**: Using `<h3><a href="...">...</a></h3>` inside the table cell allows for clickable, styled headers that Standard Markdown doesn't support.

### C. Remove Redundancy

**Delete** the old "Our Process" text section from the Markdown file, as it is now rendered dynamically by the `ProcessSteps` component.

---

## 4. Asset Quality Control

* **No Wix Links**: Ensure all images in JSON and Markdown point to `/images/...`
* **Contextual Accuracy**:
  * *Consultation Phase*: User team photos/shaking hands.
  * *Quote Phase*: Use document/office/planning photos.
  * *Installation Phase*: Use action shots of the specific service (e.g., decking, fencing).
  * *Completion*: Use high-quality finished project photos.
