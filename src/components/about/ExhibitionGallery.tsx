'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Filter } from 'lucide-react';
import { galleryItems } from '@/lib/gallery-data';
import { Button } from '@/components/ui/button';

type CategoryFilter = 'All' | 'Exhibitions & Shows' | 'Global Delegations' | 'Heritage & Founders';

export default function ExhibitionGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  }, [filteredItems.length, selectedItemIndex]);

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  }, [filteredItems.length, selectedItemIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') setSelectedItemIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [handleNext, handlePrev, selectedItemIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: 'All', count: galleryItems.length },
    { label: 'Exhibitions & Shows', count: galleryItems.filter((i) => i.category === 'Exhibitions & Shows').length },
    { label: 'Global Delegations', count: galleryItems.filter((i) => i.category === 'Global Delegations').length },
    { label: 'Heritage & Founders', count: galleryItems.filter((i) => i.category === 'Heritage & Founders').length },
  ];

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary tracking-[0.2em] uppercase text-xs sm:text-sm font-bold mb-3 block">
            Our 35-Year Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-medium mb-4 text-foreground">
            Exhibition & Heritage Gallery
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
            Documenting our global presence—from international gem fairs in Munich and Kunming to private viewings and corporate delegations worldwide.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => {
                  setActiveCategory(cat.label);
                  setSelectedItemIndex(null);
                }}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat.label === 'All' && <Filter className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background/80 text-muted-foreground'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.03 }}
                onClick={() => setSelectedItemIndex(index)}
                className="relative group overflow-hidden rounded-xl break-inside-avoid bg-card border border-border/40 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                  {/* Photo Image - Blurs smoothly on hover */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-md group-hover:brightness-40"
                    loading="lazy"
                  />

                  {/* Permanent Item Badge */}
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-white/20 z-10">
                    #{item.id < 10 ? `0${item.id}` : item.id}
                  </span>

                  {/* Default Bottom Bar (Visible when NOT hovering) */}
                  <div className="absolute bottom-0 left-0 w-full p-3.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-sm font-headline font-medium tracking-wide truncate">{item.title}</h3>
                  </div>

                  {/* Hover Overlay - Blurred photo background with revealed full description */}
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white z-20">
                    <div className="flex justify-between items-start">
                      <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-base sm:text-lg font-headline font-medium text-white mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed line-clamp-4">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-primary-foreground/90 mt-3 font-mono">
                        <Tag className="w-3 h-3" /> Photo #{item.id}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-card rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Prev Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Expanded Image */}
              <div className="relative flex-1 bg-black min-h-[300px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Details Side Panel */}
              <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col justify-between bg-card text-card-foreground border-t md:border-t-0 md:border-l border-border/40">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded mb-4">
                    {activeItem.category}
                  </span>
                  <h2 className="text-2xl font-headline font-medium mb-3 text-foreground">{activeItem.title}</h2>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
                    {activeItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground font-mono flex justify-between">
                  <span>Photo #{activeItem.id}</span>
                  <span>{selectedItemIndex! + 1} of {filteredItems.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
