'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ScrollReveal from '@/components/ui/ScrollReveal';

function ProductFilters({ selected }: { selected?: string }) {
  // Curated display collections — users can view specific curated sets rather than free-form purchase filters.
  const collections = [
    { key: 'engagement', label: 'Engagement Rings' },
    { key: 'gemstone', label: 'Gemstone Collection' },
    { key: 'pearls', label: 'Pearls & Classics' },
    { key: 'men', label: "Men's Collection" },
    { key: 'all', label: 'All Pieces' },
  ];

  return (
    <aside className="lg:col-span-1 lg:h-screen lg:sticky top-24">
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-headline font-bold">Collections</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Our displays are curated — choose a collection to view only those pieces.</p>
          <div className="grid gap-3">
            {collections.map((c) => (
              <Link
                key={c.key}
                href={c.key === 'all' ? '/products' : `/products?collection=${c.key}`}
                className={`block py-3 px-4 rounded-lg border text-center ${selected === c.key ? 'bg-muted text-foreground font-semibold' : 'hover:bg-accent/20 hover:text-accent-foreground'}`}>
                {c.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export default function ProductsPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection } = use(searchParams);

  // map collections to simple keyword filters based on description/imageHint
  const collectionFilters: Record<string, string[]> = {
    engagement: ['Engagement', 'Solitaire', 'Engagement', 'Emerald Cut', 'Ring'],
    gemstone: ['Sapphire', 'Emerald', 'Ruby', 'Aquamarine', 'Amethyst', 'Gemstone'],
    pearls: ['Pearl', 'Pearls', 'Classic'],
    men: ['Men', "Men's", 'Titanium'],
  };

  const products = collection && collection !== 'all'
    ? PlaceHolderImages.filter(p => {
      const keywords = collectionFilters[collection] || [];
      const hay = `${p.description} ${p.imageHint}`.toLowerCase();
      return keywords.some(k => hay.includes(k.toLowerCase()));
    })
    : PlaceHolderImages;
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Our Collection</h1>
        <p className="mt-2 text-lg text-foreground/80">Browse our curated selection of exquisite jewelry.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <ProductFilters selected={collection} />

        <main className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ScrollReveal key={product.id}>
                <Card className="group lux-card border-none shadow-none bg-transparent hover:bg-transparent overflow-visible pb-6">
                  <CardHeader className="p-0 mb-6 relative overflow-hidden aspect-[3/4]">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Minimalist overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </CardHeader>
                  <CardContent className="p-0 text-center">
                    <h3 className="font-headline text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.description}
                    </h3>
                    <p className="text-muted-foreground font-light text-base mb-4">
                      ${((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0 font-headline text-lg">
                      <Link href={`/products/${product.id}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
