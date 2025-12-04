'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';

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
            <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-[#F5F5F0] border-none shadow-2xl rounded-none gap-0">
                <div className="grid md:grid-cols-2 h-full min-h-[500px]">
                    {/* Product Image */}
                    <div className="relative h-[300px] md:h-full w-full bg-[#EAEaea]">
                        <Image
                            src={product.imageUrl}
                            alt={product.description}
                            fill
                            className="object-cover"
                        />
                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
                    </div>

                    {/* Product Details */}
                    <div className="p-10 md:p-12 flex flex-col justify-center relative">
                        {/* Close button override if needed, though DialogContent has one. 
                            We rely on default close or can add a custom one if requested. 
                        */}

                        <div className="space-y-6">
                            <div>
                                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                                    Quick View
                                </span>
                                <DialogTitle className="font-headline text-3xl md:text-4xl font-medium text-[#1A1E26] leading-tight mb-2">
                                    {product.description}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground font-light tracking-wide">
                                    REF. {product.id.padStart(4, '0')}
                                </p>
                            </div>

                            <div className="w-12 h-[1px] bg-primary/30" />

                            <div className="space-y-4">
                                <p className="text-3xl font-medium text-[#1A1E26] font-headline">
                                    ${price}
                                </p>

                                <p className="text-muted-foreground leading-relaxed font-light text-base">
                                    An exquisite example of fine craftsmanship. This piece features ethically sourced materials and timeless design, perfect for those who appreciate understated luxury.
                                </p>
                            </div>

                            <div className="pt-8 flex flex-col gap-4">
                                <Button asChild className="w-full bg-[#1A1E26] text-white hover:bg-[#1A1E26]/90 rounded-none py-7 text-lg font-headline tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <Link href={`/products/${product.id}`}>
                                        View Full Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-[#1A1E26]/20 text-[#1A1E26] hover:bg-[#1A1E26] hover:text-white rounded-none py-7 text-lg font-headline tracking-wide transition-all duration-300"
                                    onClick={onClose}
                                >
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
