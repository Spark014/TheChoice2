import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="w-full h-[calc(100vh-5rem)] overflow-hidden bg-[#F5F5F0] flex flex-col md:flex-row">
      {/* Text Content - Left Side */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 overflow-y-auto">
        <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-6 block">Our Legacy</span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-[#3A3A3A] mb-8 leading-tight">
          35 Years of <br /><span className="italic text-primary">Excellence</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8 max-w-xl">
          With over three decades of experience curating and crafting exceptional gemstones, we bring a refined collection to collectors and connoisseurs worldwide.
        </p>

        <div className="space-y-6 mb-10">
          <div>
            <h3 className="text-xl font-headline font-medium mb-2 text-foreground">Global Reach</h3>
            <p className="text-muted-foreground font-light">
              We regularly exhibit at private viewings and shows across Europe, USA, Bangkok, China, and Sri Lanka.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-headline font-medium mb-2 text-foreground">Private Viewings</h3>
            <p className="text-muted-foreground font-light">
              Experience our collection in person at our Colombo showroom or request a private appointment.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <Button asChild className="rounded-none px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none px-8 py-6 text-lg border-primary/40 text-foreground hover:bg-primary/5">
            <a href="https://maps.app.goo.gl/44JnGJ4SNwka8Y7W8" target="_blank" rel="noreferrer">Visit Showroom</a>
          </Button>
        </div>
      </div>

      {/* Image Content - Right Side */}
      <div className="w-full md:w-1/2 h-full relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Jewelry Craftsmanship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  );
}
