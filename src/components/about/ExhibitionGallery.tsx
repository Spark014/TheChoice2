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
            Explore our curated 29-photo collection in sequential order. Hover over any photo to read details, or click to enlarge.
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

        {/* Grid Layout - Row by Row (1, 2, 3, 4 across top row; 5, 6, 7, 8 next row) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: (index % 8) * 0.03 }}
                onClick={() => setSelectedItemIndex(index)}
                className="relative group overflow-hidden rounded-xl bg-card border border-border/60 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Photo Image Card */}
                <div className="relative overflow-hidden aspect-[4/3] w-full bg-black/90">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-md group-hover:brightness-30"
                    loading="lazy"
                  />

                  {/* Permanent Sequential Item Badge (#01, #02, #03...) */}
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md text-amber-400 font-mono font-bold text-xs px-3 py-1 rounded-md border border-amber-400/40 shadow-lg z-10 flex items-center gap-1">
                    <span>#{item.id < 10 ? `0${item.id}` : item.id}</span>
                  </div>

                  {/* Default Bottom Bar (Visible when NOT hovering) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white group-hover:opacity-0 transition-opacity duration-300 z-10">
                    <h3 className="text-sm font-headline font-bold tracking-wide truncate text-white drop-shadow-md">
                      #{item.id < 10 ? `0${item.id}` : item.id} • {item.title}
                    </h3>
                  </div>

                  {/* Hover Overlay - Maximum Contrast & Readability */}
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white z-20 shadow-inner">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="bg-primary text-primary-foreground text-[11px] font-bold tracking-wider px-2.5 py-1 rounded uppercase font-mono">
                        Item #{item.id}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="my-auto py-2">
                      <h3 className="text-base sm:text-lg font-headline font-bold text-white mb-2 leading-snug drop-shadow-md text-left">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-100 font-sans font-medium leading-relaxed text-left drop-shadow-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-gray-300 font-mono">
                      <span className="truncate max-w-[180px]">{item.category}</span>
                      <span className="text-amber-400 font-bold">Click to view</span>
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
                className="absolute top-4 right-4 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Prev Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white hover:bg-black/90 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Main Expanded Image */}
              <div className="relative flex-1 bg-black min-h-[300px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Side Details Panel */}
              <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col justify-between bg-card text-card-foreground border-t md:border-t-0 md:border-l border-border/40">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4 font-mono">
                    Item #{activeItem.id} • {activeItem.category}
                  </span>
                  <h2 className="text-2xl font-headline font-bold mb-3 text-foreground">{activeItem.title}</h2>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
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
