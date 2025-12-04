'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const timelineData = [
    {
        year: '1989',
        title: 'The Beginning',
        description: 'The Choice Gems was founded in Colombo, Sri Lanka, with a singular vision: to source the finest sapphires directly from the mines.',
    },
    {
        year: '2000',
        title: 'International Debut',
        description: 'We showcased our collection at the prestigious Tucson Gem Show, marking our entry into the global market.',
    },
    {
        year: '2010',
        title: 'European Expansion',
        description: 'Established a permanent presence in Europe, supplying bespoke jewelers in Paris and Geneva with rare gemstones.',
    },
    {
        year: '2024',
        title: 'The Digital Era',
        description: 'Launching our digital flagship to bring the experience of Ceylon\'s finest gems to collectors worldwide.',
    },
];

export default function Timeline() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <div className="relative border-l border-primary/20 ml-4 md:ml-0 md:pl-0">
                    {timelineData.map((item, index) => (
                        <TimelineItem key={item.year} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: typeof timelineData[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-16 relative pl-12 md:pl-0"
        >
            {/* Dot */}
            <div className="absolute left-[-5px] top-2 w-3 h-3 bg-primary rounded-full md:left-1/2 md:-translate-x-1.5 z-10 ring-4 ring-background" />

            <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />

                <div className="w-full md:w-5/12">
                    <span className="text-primary font-bold tracking-widest text-sm mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-headline font-medium mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
