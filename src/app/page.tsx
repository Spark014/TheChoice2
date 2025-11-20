import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const featuredProducts = PlaceHolderImages.slice(0, 4);
const heroImage = PlaceHolderImages.find(p => p.id === '5');
const ctaImage = PlaceHolderImages.find(p => p.id === '6');

export default function Home() {
  if (!heroImage || !ctaImage) {
    return null;
  }
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-card">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
              Discover Your Perfect Sparkle
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Experience the artistry and elegance of handcrafted jewelry. Explore our collection of timeless pieces designed to celebrate your unique story.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-headline rounded-full px-8 py-4">
                <Link href="/products">Explore Collection <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-headline rounded-full px-8 py-4">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center">Featured Pieces</h2>
          <p className="text-center text-muted-foreground mt-2 mb-10">Handpicked selections from our latest collection.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ScrollReveal key={product.id}>
                <Card key={product.id} className="relative overflow-hidden group lux-card">
                  <CardHeader className="p-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      width={400}
                      height={400}
                      className="object-cover w-full h-64 transition-transform duration-300"
                    />
                  
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-headline text-lg font-semibold">{product.description}</h3>
                    <p className="text-primary font-semibold mt-1">$
                      {((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2)}
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
                     <Button asChild className="flex-1">
                       <Link href={`/products/${product.id}`}>View Details</Link>
                     </Button>
                     <Button asChild variant="outline" className="flex-1">
                       <Link href="/contact">Inquire</Link>
                     </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendation CTA */}
      <section className="bg-card py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-square max-w-md mx-auto">
         <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description}
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div>
        <h2 className="text-3xl font-headline font-bold">Need help choosing the perfect piece?</h2>
                <p className="mt-4 text-lg text-foreground/80">
                Our team is happy to assist — reach out for personalized guidance on style, occasion, and selections.
                </p>
                <Button asChild size="lg" className="mt-8 font-headline">
                <Link href="/contact">Contact Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Gemstone Info CTA */}
       <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-headline font-bold">The Heart of Our Craft</h2>
          <p className="text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">Learn about the fascinating world of gemstones. From their origins to their properties, discover what makes each stone unique.</p>
          <Button asChild variant="outline" size="lg" className="font-headline">
            <Link href="/gemstones">Explore Gemstones</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
