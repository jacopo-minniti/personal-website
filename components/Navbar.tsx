"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaGithub, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

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

        {/* Left Section: Burger (Mobile) + Logo */}
        <div className="flex items-center gap-4">
          {/* Burger Menu Button (Mobile Only) */}
          <button
            className="md:hidden text-[var(--pastel-orange)] hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <FaBars size={24} />
          </button>

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
            {/* Breadcrumb Text - Hidden on Mobile */}
            <div className="hidden md:flex items-center text-[var(--pastel-orange)] hover:text-white transition-colors">
              <span className="text-lg font-bold tracking-tight">
                {getBreadcrumb()}
              </span>
              <span className="animate-pulse inline-block w-2.5 h-5 bg-[var(--pastel-orange)] align-middle ml-1"></span>
            </div>
          </Link>
        </div>

        {/* Right Section: Desktop Nav + Socials */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => {
              const isActive = pathname.startsWith(link.href.replace('.', '')); // fuzzy match
              const colorClass = linkColors[idx % linkColors.length];

              return (
                <Link
                  key={link.href}
                  href={link.href.replace('.', '')} // Ensure clean path for href
                  className={`text-base transition-colors ${colorClass} ${isActive
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

          {/* Socials - Visible on Mobile too */}
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

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border transform transition-transform duration-300 z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[var(--pastel-orange)] font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
              aria-label="Close Menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => {
              const isActive = pathname.startsWith(link.href.replace('.', ''));
              const colorClass = linkColors[idx % linkColors.length];

              return (
                <Link
                  key={link.href}
                  href={link.href.replace('.', '')}
                  className={`text-lg transition-colors ${colorClass} ${isActive
                    ? 'font-bold underline decoration-2 underline-offset-4'
                    : 'opacity-80 hover:opacity-100'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer (Optional decoration) */}
          <div className="mt-auto pt-8 border-t border-border">
            <div className="text-xs text-muted font-mono">
              © {new Date().getFullYear()} Jacopo Minniti
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
