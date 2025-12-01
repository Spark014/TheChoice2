'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, Globe, Award, MapPin, Eye } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatePresence, motion } from 'framer-motion';
import QuickViewModal from '@/components/ui/QuickViewModal';
import GemstoneGuide from '@/components/home/GemstoneGuide';

const featuredProducts = PlaceHolderImages.slice(0, 4);
const heroImages = PlaceHolderImages.slice(0, 4); // Use first 4 images for hero slider
const ctaImage = PlaceHolderImages.find(p => p.id === '6');

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof PlaceHolderImages[0] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  if (!ctaImage) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section - Full Width & Height with Blur Overlay */}
      <ScrollReveal>
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={heroImages[currentHeroIndex].imageUrl}
                alt={heroImages[currentHeroIndex].description}
                fill
                className="object-cover animate-ken-burns"
                priority
              />
              {/* Blur Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 p-8 w-full max-w-7xl mx-auto text-center flex flex-col items-center">
            <span className="text-white/90 tracking-[0.3em] uppercase text-sm font-medium mb-6 animate-fade-in drop-shadow-md">
              Est. 1989
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-medium tracking-tight text-white mb-8 drop-shadow-lg">
              Timeless <span className="italic text-white">Elegance</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light mb-12 drop-shadow-md">
              Curated collections that celebrate the art of understated luxury. Discover pieces that tell your unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="font-headline rounded-none px-12 py-8 text-lg bg-white text-black hover:bg-white/90 transition-all duration-500 ease-out border-0">
                <Link href="/products">View Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-headline rounded-none px-12 py-8 text-lg border-white text-white hover:bg-white/10 hover:border-white transition-all duration-500 ease-out bg-transparent backdrop-blur-sm">
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Global Presence & Experience Section */}
      <section className="py-24 md:py-32 bg-[#F5F5F0] w-full">
        <div className="w-full px-6 md:px-10 lg:px-50">
          <div className="grid md:grid-cols-2 gap-5 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <Award className="w-8 h-8" />
                <span className="text-sm tracking-[0.2em] uppercase font-bold">World Class Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-medium leading-tight text-[#3A3A3A]">
                35 Years of <br /><span className="italic text-primary">Global Distinction</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Our legacy is built on decades of expertise and a commitment to sourcing the finest gems from around the world. We don't just sell jewelry; we curate experiences that span continents.
              </p>

              <div className="pt-8 border-t border-primary/20">
                <h3 className="text-xl font-headline font-medium mb-6 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  International Exhibitions & Presence
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> USA</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> Europe</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> Canada</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> China</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> Sri Lanka</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/60" /> Bangkok</div>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] w-full hidden md:block">
              <div className="absolute inset-0 bg-primary/5 transform translate-x-6 translate-y-6" />
              <Image
                src={ctaImage.imageUrl}
                alt="Global Exhibitions"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Full Width */}
      <section className="py-24 md:py-32 bg-background w-full">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="text-4xl font-headline font-medium text-foreground mb-4">Curated Selections</h2>
            <div className="w-52 h-[1px] bg-primary/30 mb-3" />
            <p className="text-muted-foreground text-lg max-w-xl font-light">
              Handpicked pieces that embody sophistication and grace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-[1800px] mx-auto">
            {featuredProducts.map((product) => (
              <ScrollReveal key={product.id}>
                <Card className="group lux-card border-none shadow-none bg-transparent hover:bg-transparent overflow-visible">
                  <CardHeader className="p-0 mb-6 relative overflow-hidden aspect-[3/4]">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Minimalist overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Quick View Button */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/90 hover:bg-white text-black font-headline tracking-wide shadow-md"
                        onClick={() => setQuickViewProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" /> Quick View
                      </Button>
                    </div>
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
        </div>
      </section>

      {/* Interactive Gemstone Guide */}
      <GemstoneGuide />

      {/* Gemstone Info CTA - Full Width */}
      <section className="py-32 bg-secondary/10 w-full">
        <div className="w-full px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-headline font-medium mb-8">The Art of Gemstones</h2>
          <p className="text-muted-foreground text-xl mb-12 font-light leading-relaxed">
            Delve into the origins and properties of our ethically sourced gemstones. Each stone carries a story as unique as the person who wears it.
          </p>
          <Button asChild variant="outline" size="lg" className="font-headline text-lg px-12 py-8 rounded-none border-primary/30 hover:border-primary text-foreground hover:bg-transparent transition-all duration-300">
            <Link href="/gemstones">Discover More</Link>
          </Button>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
