'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, X, ChevronLeft, ChevronRight, Maximize2, Filter } from 'lucide-react';
import { galleryItems, GalleryItem } from '@/lib/gallery-data';
import { Button } from '@/components/ui/button';

type CategoryFilter = 'All' | 'Exhibitions' | 'Gemstones' | 'Jewelry';

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
    { label: 'Exhibitions', count: galleryItems.filter((i) => i.category === 'Exhibitions').length },
    { label: 'Gemstones', count: galleryItems.filter((i) => i.category === 'Gemstones').length },
    { label: 'Jewelry', count: galleryItems.filter((i) => i.category === 'Jewelry').length },
  ];

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">
            Media & Portfolio Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-medium mb-6 text-foreground">
            Exhibitions & Gemstone Gallery
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
            Explore our curated showcase of international exhibitions, rare Ceylon gemstones, and handcrafted fine jewelry pieces.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => {
                  setActiveCategory(cat.label);
                  setSelectedItemIndex(null);
                }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat.label === 'All' && <Filter className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
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
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => setSelectedItemIndex(index)}
                className="relative group overflow-hidden rounded-md break-inside-avoid bg-card border border-border/40 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-headline font-medium mb-1 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs font-light text-white/80">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {item.location}
                        </span>
                      )}
                      {item.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" /> {item.year}
                        </span>
                      )}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-card rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 text-white hover:bg-black/80 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Left/Prev Arrow */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white hover:bg-black/80 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Right/Next Arrow */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white hover:bg-black/80 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Section */}
              <div className="relative flex-1 bg-black min-h-[300px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col justify-between bg-card text-card-foreground border-t md:border-t-0 md:border-l border-border/40">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    {activeItem.category}
                  </span>
                  <h2 className="text-2xl font-headline font-medium mb-3 text-foreground">{activeItem.title}</h2>
                  {activeItem.description && (
                    <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
                      {activeItem.description}
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-border/40 text-sm">
                  {activeItem.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{activeItem.location}</span>
                    </div>
                  )}
                  {activeItem.year && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{activeItem.year}</span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground/60 pt-2">
                    Item {selectedItemIndex! + 1} of {filteredItems.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
