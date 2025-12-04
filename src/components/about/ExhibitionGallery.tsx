'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';

const exhibitions = [
    {
        id: 1,
        title: 'Tucson Gem Show',
        location: 'Arizona, USA',
        year: '2023',
        image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Tucson+Gem+Show',
    },
    {
        id: 2,
        title: 'Hong Kong Jewellery & Gem Fair',
        location: 'Hong Kong',
        year: '2022',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Hong+Kong+Fair',
    },
    {
        id: 3,
        title: 'Facets Sri Lanka',
        location: 'Colombo, Sri Lanka',
        year: '2024',
        image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Facets+Sri+Lanka',
    },
    {
        id: 4,
        title: 'Vicenzaoro',
        location: 'Vicenza, Italy',
        year: '2023',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Vicenzaoro',
    },
    {
        id: 5,
        title: 'Bangkok Gems & Jewelry Fair',
        location: 'Bangkok, Thailand',
        year: '2023',
        image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Bangkok+Gems',
    },
    {
        id: 6,
        title: 'JCK Las Vegas',
        location: 'Las Vegas, USA',
        year: '2023',
        image: 'https://placehold.co/600x500/1a1a1a/ffffff?text=JCK+Las+Vegas',
    },
    {
        id: 7,
        title: 'Baselworld',
        location: 'Basel, Switzerland',
        year: '2019',
        image: 'https://placehold.co/600x700/1a1a1a/ffffff?text=Baselworld',
    },
    {
        id: 8,
        title: 'Jewellery & Gem WORLD',
        location: 'Singapore',
        year: '2022',
        image: 'https://placehold.co/800x500/1a1a1a/ffffff?text=Singapore+Show',
    },
    {
        id: 9,
        title: 'Dubai International Jewellery Week',
        location: 'Dubai, UAE',
        year: '2023',
        image: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Dubai+Jewellery',
    },
    {
        id: 10,
        title: 'Munich Show',
        location: 'Munich, Germany',
        year: '2023',
        image: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Munich+Show',
    },
];

export default function ExhibitionGallery() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">Global Presence</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-medium mb-6 text-foreground">Exhibitions & Showcases</h2>
                    <p className="text-muted-foreground text-xl font-light leading-relaxed">
                        From the bustling markets of Bangkok to the prestigious halls of Vicenza, we bring the finest Ceylon gems to the world stage.
                    </p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {exhibitions.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative group overflow-hidden rounded-sm break-inside-avoid"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-headline font-medium mb-1">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
