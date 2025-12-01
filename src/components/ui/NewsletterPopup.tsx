'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasSeenPopup, setHasSeenPopup] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup
        const seen = localStorage.getItem('newsletter_popup_seen');
        if (seen) {
            setHasSeenPopup(true);
            return;
        }

        // Show popup after 5 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('newsletter_popup_seen', 'true');
        setHasSeenPopup(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        handleClose();
    };

    if (hasSeenPopup) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background border-border/50">
                <div className="relative p-8 md:p-12 text-center">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </button>

                    <DialogHeader className="mb-6">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2 block">Exclusive Access</span>
                        <DialogTitle className="font-headline text-3xl md:text-4xl font-medium mb-2">
                            Join The Inner Circle
                        </DialogTitle>
                        <DialogDescription className="text-lg text-muted-foreground font-light">
                            Subscribe to receive early access to new collections, exclusive event invitations, and expert gemstone insights.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            className="h-12 text-center text-lg border-border/50 focus-visible:ring-primary/20"
                            required
                        />
                        <Button type="submit" className="w-full h-12 font-headline text-lg uppercase tracking-wide">
                            Subscribe
                        </Button>
                        <p className="text-xs text-muted-foreground/60 mt-4">
                            By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
