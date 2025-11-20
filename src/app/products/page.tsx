import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
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

export default function ProductsPage({ searchParams }: { searchParams?: { collection?: string } }) {
  const collection = searchParams?.collection;

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
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Our Collection</h1>
        <p className="mt-2 text-lg text-foreground/80">Browse our curated selection of exquisite jewelry.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <ProductFilters />
        
        <main className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ScrollReveal key={product.id}>
                <Card key={product.id} className="relative overflow-hidden group lux-card">
                  <CardHeader className="p-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      width={400}
                      height={400}
                      className="object-cover w-full h-48 sm:h-64 transition-transform duration-300"
                    />
                  
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-headline text-lg font-semibold truncate">{product.description}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-accent">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <span className="text-muted-foreground text-sm">4.5+</span>
                    </div>
                    <p className="text-primary font-semibold mt-2">
                      ${((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2)}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
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
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-3">
                    <Button asChild className="flex-1 rounded-full px-6 py-3">
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 rounded-full px-6 py-3">
                      <Link href="/contact">Inquire</Link>
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
