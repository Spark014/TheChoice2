'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Helper to generate a stable price based on ID
const getPrice = (id: string) => {
  const num = parseInt(id);
  return Math.floor((num * 123.45) % 3000) + 500;
};

const gemstoneTypes = ['Sapphire', 'Ruby', 'Emerald', 'Diamond', 'Spinel', 'Garnet', 'Pearl'];
const colors = [
  { name: 'Blue', class: 'bg-blue-600' },
  { name: 'Red', class: 'bg-red-600' },
  { name: 'Green', class: 'bg-green-600' },
  { name: 'Yellow', class: 'bg-yellow-400' },
  { name: 'Purple', class: 'bg-purple-600' },
  { name: 'Pink', class: 'bg-pink-400' },
  { name: 'White', class: 'bg-slate-100 border-slate-200' },
  { name: 'Black', class: 'bg-neutral-900' },
];

function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTypes = searchParams.getAll('type');
  const currentColors = searchParams.getAll('color');
  const currentMinPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0;
  const currentMaxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 5000;

  const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice]);

  const updateFilters = (key: string, value: string | number | null, isArray: boolean = false) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isArray) {
      const current = params.getAll(key);
      if (current.includes(String(value))) {
        params.delete(key);
        current.filter(v => v !== String(value)).forEach(v => params.append(key, v));
      } else {
        params.append(key, String(value));
      }
    } else {
      if (value === null) params.delete(key);
      else params.set(key, String(value));
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', String(priceRange[0]));
    params.set('maxPrice', String(priceRange[1]));
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="lg:col-span-1 space-y-8">
      {/* Gemstone Type */}
      <div className="space-y-4">
        <h3 className="font-headline text-xl font-medium">Gemstone</h3>
        <div className="space-y-2">
          {gemstoneTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={currentTypes.includes(type)}
                onCheckedChange={() => updateFilters('type', type, true)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-light cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="space-y-4">
        <h3 className="font-headline text-xl font-medium">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => updateFilters('color', c.name, true)}
              className={`w-8 h-8 rounded-full ${c.class} border border-border/20 transition-transform hover:scale-110 flex items-center justify-center ${currentColors.includes(c.name) ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              title={c.name}
            >
              {currentColors.includes(c.name) && <Check className={`w-4 h-4 ${c.name === 'White' || c.name === 'Yellow' ? 'text-black' : 'text-white'}`} />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-headline text-xl font-medium">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          value={priceRange}
          max={5000}
          step={100}
          onValueChange={handlePriceChange}
          onValueCommit={applyPriceFilter}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push('/products')}
      >
        Reset Filters
      </Button>
    </aside>
  );
}

function ProductGrid() {
  const searchParams = useSearchParams();
  const types = searchParams.getAll('type');
  const colors = searchParams.getAll('color');
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 5000;

  const filteredProducts = PlaceHolderImages.filter(product => {
    const price = getPrice(product.id);
    const matchesPrice = price >= minPrice && price <= maxPrice;

    const matchesType = types.length === 0 || types.some(t =>
      product.description.toLowerCase().includes(t.toLowerCase()) ||
      product.imageHint.toLowerCase().includes(t.toLowerCase())
    );

    const matchesColor = colors.length === 0 || colors.some(c =>
      product.description.toLowerCase().includes(c.toLowerCase()) ||
      product.imageHint.toLowerCase().includes(c.toLowerCase())
    );

    return matchesPrice && matchesType && matchesColor;
  });

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ScrollReveal key={product.id}>
            <Card className="group lux-card border-none shadow-none bg-transparent hover:bg-transparent overflow-visible pb-6">
              <CardHeader className="p-0 mb-6 relative overflow-hidden aspect-[3/4]">
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </CardHeader>
              <CardContent className="p-0 text-center">
                <h3 className="font-headline text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.description}
                </h3>
                <p className="text-muted-foreground font-light text-base mb-4">
                  ${getPrice(product.id).toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                <Button asChild variant="link" className="text-primary hover:text-primary/80 p-0 font-headline text-lg">
                  <Link href={`/products/${product.id}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        ))
      ) : (
        <div className="col-span-full text-center py-20">
          <p className="text-xl text-muted-foreground font-light">No products found matching your criteria.</p>
          <Button variant="link" onClick={() => window.location.href = '/products'} className="mt-4 text-primary">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-12 pt-32 min-h-screen">
      <div className="text-center mb-16">
        <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">The Collection</span>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Curated Excellence</h1>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Discover our hand-selected range of ethically sourced gemstones and bespoke jewelry.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <Suspense fallback={<div className="lg:col-span-1">Loading filters...</div>}>
          <FilterSidebar />
        </Suspense>

        <main className="lg:col-span-3">
          <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
