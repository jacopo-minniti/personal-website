This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Blog Posts

This folder contains all blog posts in MDX format.

## Adding Images to Blog Posts

To add images to your blog posts:

1. **Store images in the `/public` folder** at the root of the project
2. **Reference them in your MDX** using the path starting with `/`:

```mdx
![Alt text](/your-image.jpg)
*Optional caption*
```

Example:
```mdx
![Neural Network Visualization](/background.jpg)
*Figure 1: A visualization of neural network layers*
```

## Embedding YouTube Videos

Use an iframe with the embed URL:

```mdx
<iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen 
  className="my-8 border border-border"
></iframe>
```

Replace `VIDEO_ID` with the actual YouTube video ID from the URL.

## Using LaTeX Math

Inline math: `$E = mc^2$`

Block math:
```mdx
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## Adding Footnotes

Use the SideNote component:

```mdx
This is some text<SideNote id="1">This is the footnote content.</SideNote> that continues.
```

The footnotes will automatically appear in the footnotes box on the right sidebar.
