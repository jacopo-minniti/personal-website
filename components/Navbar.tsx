"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Navbar() {
  const pathname = usePathname();

  const socialLinks = [
    { icon: SiGooglescholar, href: "https://scholar.google.com", label: "Google Scholar" },
    { icon: FaGithub, href: "https://github.com/jacopo-minniti", label: "GitHub" },
    { icon: FaLinkedin, href: "https://Linkedin.com/in/jacopo-minniti/", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://www.youtube.com/@jacopominniti7169", label: "YouTube" },
  ];

  // Colors for nav items
  const linkColors = [
    'text-[var(--pastel-green)] hover:text-[var(--pastel-green)]/80',
    'text-[var(--pastel-blue)] hover:text-[var(--pastel-blue)]/80',
    'text-[var(--pastel-purple)] hover:text-[var(--pastel-purple)]/80',
    'text-[var(--pastel-yellow)] hover:text-[var(--pastel-yellow)]/80',
  ];

  const navLinks = [
    { label: "./research", href: "/research" },
    { label: "./blog", href: "/blog" },
    { label: "./projects", href: "/projects" },
    { label: "./about", href: "/about" },
  ];

  // Dynamic Breadcrumb Logic
  const getBreadcrumb = () => {
    if (pathname === '/') return 'jacopo-minniti';
    // Remove leading slash and split
    const parts = pathname.split('/').filter(Boolean);
    return `jacopo-minniti/${parts.join('/')}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image
              src="/logo_navbar.png"
              alt="Logo"
              fill
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center text-[var(--pastel-orange)] hover:text-white transition-colors">
            <span className="text-lg font-bold tracking-tight">
              {getBreadcrumb()}
            </span>
            <span className="animate-pulse inline-block w-2.5 h-5 bg-[var(--pastel-orange)] align-middle ml-1"></span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => {
              const isActive = pathname.startsWith(link.href.replace('.', '')); // fuzzy match
              const colorClass = linkColors[idx % linkColors.length];

              return (
                <Link
                  key={link.href}
                  href={link.href.replace('.', '')} // Ensure clean path for href
                  className={`text-sm transition-colors ${colorClass} ${isActive
                    ? 'font-bold underline decoration-2 underline-offset-4'
                    : 'opacity-80 hover:opacity-100'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Socials Divider */}
          <div className="h-4 w-px bg-border hidden md:block"></div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-[var(--pastel-orange)] transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
