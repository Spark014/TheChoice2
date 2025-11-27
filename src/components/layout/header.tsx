import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/gemstones', label: 'Gemstones' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Support' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/92 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center">
        <div className="mr-auto flex items-center md:mr-4">
          <Link href="/" className="mr-6 flex items-center space-x-3">
            <Image src="/brand-logo.png" alt="The Choice Gems" width={40} height={40} className="rounded-sm object-cover" />
            <span className="hidden sm:inline-block font-headline text-xl tracking-wide text-primary">
              The Choice Gems
            </span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium tracking-wider md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary/90"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-3 mb-6">
                  <Image src="/brand-logo.png" alt="The Choice Gems" width={36} height={36} className="rounded-sm object-cover" />
                  <span className="font-headline text-lg">The Choice Gems</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
