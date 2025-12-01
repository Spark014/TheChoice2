'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Product {
    id: string;
    imageUrl: string;
    description: string;
}

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    if (!product) return null;

    // Mock price calculation to match page.tsx
    const price = ((parseInt(product.id) * 123.45) % 3000 + 500).toFixed(2);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background border-border/50">
                <div className="grid md:grid-cols-2 h-full">
                    {/* Product Image */}
                    <div className="relative h-[300px] md:h-[500px] w-full bg-muted">
                        <Image
                            src={product.imageUrl}
                            alt={product.description}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="p-8 flex flex-col justify-center">
                        <DialogHeader className="mb-6 text-left">
                            <DialogTitle className="font-headline text-3xl md:text-4xl font-medium mb-2">
                                {product.description}
                            </DialogTitle>
                            <DialogDescription className="text-lg text-muted-foreground font-light">
                                Ref. {product.id.padStart(4, '0')}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            <p className="text-2xl font-medium text-primary">
                                ${price}
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                An exquisite example of fine craftsmanship. This piece features ethically sourced materials and timeless design, perfect for those who appreciate understated luxury.
                            </p>

                            <div className="pt-6 flex flex-col gap-3">
                                <Button asChild className="w-full font-headline text-lg py-6" size="lg">
                                    <Link href={`/products/${product.id}`}>
                                        View Full Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full font-headline text-lg py-6" onClick={onClose}>
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
