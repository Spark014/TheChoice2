import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-headline font-bold">About The Choice Gems</h1>
          <p className="mt-4 text-lg text-foreground/80">With over 35 years of experience curating and crafting exceptional gemstones, we bring a refined collection to collectors and connoisseurs worldwide.</p>

          <h3 className="mt-8 text-2xl font-semibold">Our Shows & Reach</h3>
          <p className="mt-2 text-foreground/80">We regularly attend and exhibit at shows and private viewings across Europe, USA, Bangkok, China, and Sri Lanka. We do not maintain a traditional office — instead we bring the collection to the world through curated events.</p>

          <h3 className="mt-6 text-2xl font-semibold">Visit & Contact</h3>
          <p className="mt-2 text-foreground/80">To learn more or arrange a private viewing, visit us at <a href="https://maps.app.goo.gl/44JnGJ4SNwka8Y7W8" target="_blank" rel="noreferrer" className="underline">83 Chatham St, Colombo</a> or <Link href="/contact" className="underline">contact us</Link> for scheduling.</p>

          <h3 className="mt-6 text-2xl font-semibold">Follow Us</h3>
          <p className="mt-2 text-foreground/80">Find our latest show updates and photos on Instagram: <a href="https://instagram.com/thechoicegems" target="_blank" rel="noreferrer" className="underline">@thechoicegems</a></p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden lux-card">
          <Image src="/logo.png" alt="The Choice Gems" fill className="object-contain p-8 object-center opacity-80" />
        </div>
      </div>
    </div>
  );
}
