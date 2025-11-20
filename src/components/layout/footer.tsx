import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/30 bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/logo.png" alt="The Choice Gems" width={24} height={24} className="object-cover" />
          <div className="text-center md:text-left">
            <p className="text-sm leading-loose text-muted-foreground/90">&copy; {currentYear} The Choice Gems. All Rights Reserved.</p>
            <p className="text-sm text-muted-foreground/80">35 years of experience • We showcase worldwide (Europe, USA, Bangkok, China, Sri Lanka)</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium uppercase tracking-wide">
          <Link href="/contact" className="transition-colors hover:text-primary/90">
            Support
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary/90">
            About Us
          </Link>
          <a href="https://instagram.com/thechoicegems" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary/90">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
