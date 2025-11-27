import { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

export async function generateStaticParams() {
  return PlaceHolderImages.map((product) => ({
    slug: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PlaceHolderImages.find(p => p.id === slug);

  if (!product) {
    notFound();
  }

  const price = ((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2);

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-20 bg-[#F5F5F0]">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="relative aspect-square w-full overflow-hidden bg-white shadow-sm">
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>

        <div className="flex flex-col justify-center h-full space-y-8">
          <div>
            <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-2 block">The Collection</span>
            <h1 className="text-4xl lg:text-5xl font-headline font-medium text-[#3A3A3A] leading-tight">{product.description}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center text-primary">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-muted-foreground text-sm tracking-wide">4.9 (128 Reviews)</span>
          </div>

          <p className="text-3xl font-light text-foreground">${price}</p>

          <Separator className="bg-primary/20" />

          <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              Discover the exquisite beauty of the {product.description}. This piece is meticulously crafted to showcase its brilliant sparkle and timeless elegance.
            </p>
            <p>
              A perfect choice for any special occasion or as a treasured addition to your personal collection. Made with the finest materials and expert craftsmanship, it's a symbol of luxury and sophistication.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-6">
              To learn more or arrange a viewing, visit us at{' '}
              <a
                href="https://maps.app.goo.gl/44JnGJ4SNwka8Y7W8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                83 Chatham St, Colombo
              </a>
            </p>

            <Button asChild size="lg" className="w-full md:w-auto rounded-none px-12 py-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-headline">
              <Link href="/contact">Inquire to Purchase</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
