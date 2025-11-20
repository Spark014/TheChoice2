import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PlaceHolderImages.find(p => p.id === params.slug);

  if (!product) {
    notFound();
  }

  const price = ((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2);

  return (
    <div className="">
      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <Card className="overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          </Card>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.description}</h1>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center text-accent">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-muted-foreground text-sm">4.5+</span>
            </div>

            <p className="text-3xl font-bold text-primary mt-6">${price}</p>
            
            <Separator className="my-6" />

            <p className="text-foreground/80 leading-relaxed">
              Discover the exquisite beauty of the {product.description}. This piece is meticulously crafted to showcase its brilliant sparkle and timeless elegance. A perfect choice for any special occasion or as a treasured addition to your personal collection. Made with the finest materials and expert craftsmanship, it's a symbol of luxury and sophistication.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              To learn more visit us at{' '}
              <a
                href="https://maps.app.goo.gl/44JnGJ4SNwka8Y7W8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                83 Chatham St, Colombo
              </a>
            </p>
            
            <Button asChild size="lg" className="mt-8 font-headline w-full md:w-auto">
              <Link href="/contact">Contact to Buy</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
