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
