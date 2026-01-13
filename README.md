# Personal Website

A terminal-inspired personal website built with [Next.js](https://nextjs.org), designed to showcase research, code, and thoughts with a unique "hacker/researcher" aesthetic.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📝 Content Management

### Adding Blog Posts
Blog posts are stored in the `posts/` directory as MDX files. The filename should be the slug (e.g., `my-post.mdx`).

**Frontmatter Format:**
```yaml
---
title: 'The Title of Your Post'
subtitle: 'A brief subtitle or one-liner'
date: '2024-05-20'
tags: ['AI', 'neuroscience']
thumbnail: '/images/my-post-cover.jpg'
---
```

### Adding Images
1.  Place images in the `public/` folder.
2.  Reference them in MDX with a leading slash:
    ```mdx
    ![Description](/my-image.jpg)
    ```

### YouTube Embeds
Use the standard iframe provided by YouTube:
```jsx
<iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="Video Title" 
  className="my-8 border border-border"
  allowFullScreen
></iframe>
```

### LaTeX Math
- **Inline**: `$E=mc^2$`
- **Block**:
  ```latex
  $$
  \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
  $$
  ```

### Footnotes
Use the custom `SideNote` component for interactive footnotes:
```jsx
Here is a claim<SideNote id="1">Here is the evidence/citation.</SideNote>.
```
