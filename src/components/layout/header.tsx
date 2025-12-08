'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/gemstones', label: 'Gemstones' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Connect' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/30 bg-background/92 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 shadow-sm relative">
      <div className="container flex flex-col items-center py-4">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <Link href="/" className="flex flex-col items-center group">
            <div className="mb-2 transition-transform duration-300 group-hover:scale-105">
              <Image src="/brand-logo.png" alt="The Choice Gems" width={60} height={60} className="rounded-sm object-cover" />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl tracking-tight font-medium text-primary mb-1">
              The Choice
            </h1>
          </Link>
        </div>

        {/* Navigation Links & Search */}
        <div className="flex items-center gap-8">
          <nav className="hidden items-center space-x-8 text-md font-medium tracking-wider md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative transition-colors hover:text-primary/90 uppercase"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex hover:bg-transparent hover:text-primary"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Mobile Controls (Menu + Search) */}
        <div className="absolute right-4 top-4 flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md pr-0 bg-background/95 backdrop-blur-xl border-r border-border/40">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mr-6 mb-12">
                  <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                    <Image src="/brand-logo.png" alt="The Choice Gems" width={42} height={42} className="rounded-sm object-cover" />
                    <span className="font-headline text-xl tracking-tight">The Choice Gems</span>
                  </Link>
                </div>

                <nav className="flex flex-col space-y-6 px-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-3xl font-headline font-light text-foreground/80 hover:text-primary transition-colors duration-300 animate-in slide-in-from-left-4 fade-in fill-mode-forwards"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto mb-12 mr-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500 fill-mode-forwards opacity-0">
                  <Button asChild size="lg" className="w-full font-headline text-lg py-6 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Book Consultation
                    </Link>
                  </Button>
                  <p className="text-center mt-6 text-muted-foreground text-sm font-light">
                    Est. 1989 • Global Excellence
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b border-border/30 p-4 animate-in slide-in-from-top-2 z-40 shadow-md">
            <div className="container max-w-2xl mx-auto flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for gemstones, jewelry..."
                className="flex-1 border-none bg-transparent text-lg focus-visible:ring-0 placeholder:text-muted-foreground/50"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="hover:bg-transparent"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close Search</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
