import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F0] text-foreground pt-16 pb-8 border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12">

        {/* Newsletter Section */}
        <div className="mb-20 border-b border-border/30 pb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-6 text-muted-foreground">Newsletter</p>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between max-w-4xl">
            <div className="w-full md:w-2/3">
              <Input
                type="email"
                placeholder="Email address"
                className="border-0 border-b border-foreground/20 rounded-none px-0 py-4 text-2xl font-headline bg-transparent focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/50 h-auto"
              />
            </div>
            <Button variant="ghost" className="text-lg font-headline uppercase tracking-wide hover:bg-transparent hover:text-primary px-0">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">

          {/* Brand Logo */}
          <div className="lg:w-1/2">
            <Link href="/" className="inline-block">
              <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-[#3A3A3A] leading-none">
                The Choice
              </h1>
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Shop Column */}
            <div className="space-y-6">
              <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-muted-foreground">Shop</h4>
              <ul className="space-y-3 text-sm font-medium text-foreground/80">
                <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link href="/products?collection=engagement" className="hover:text-primary transition-colors">Engagement</Link></li>
                <li><Link href="/products?collection=gemstone" className="hover:text-primary transition-colors">Gemstones</Link></li>
                <li><Link href="/products?collection=men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
              </ul>
            </div>

            {/* Customer Care Column */}
            <div className="space-y-6">
              <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-muted-foreground">Customer Care</h4>
              <ul className="space-y-3 text-sm font-medium text-foreground/80">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              </ul>
            </div>

            {/* Information Column */}
            <div className="space-y-6">
              <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-muted-foreground">Information</h4>
              <ul className="space-y-3 text-sm font-medium text-foreground/80">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Accessibility</Link></li>
                <li><Link href="/gemstones" className="hover:text-primary transition-colors">Gemstone Guide</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30 text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0">
            <p>&copy; {currentYear} The Choice Gems. Powered by Next.js</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
            </div>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
