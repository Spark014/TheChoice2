'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { journalPosts } from '@/lib/journal-data';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">The Journal</span>
                    <h1 className="text-5xl md:text-6xl font-headline font-medium mb-6 text-foreground">Stories of Brilliance</h1>
                    <p className="text-muted-foreground text-xl font-light leading-relaxed">
                        Explore the history, artistry, and allure of the world's most precious gemstones.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {journalPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full"
                        >
                            <Link href={`/journal/${post.slug}`} className="block overflow-hidden mb-6 rounded-sm aspect-[4/3] relative">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </Link>

                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-medium tracking-wide uppercase">
                                    <span className="text-primary">{post.category}</span>
                                    <span className="w-1 h-1 bg-border rounded-full" />
                                    <span>{post.date}</span>
                                </div>

                                <h2 className="text-2xl font-headline font-medium mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                                    <Link href={`/journal/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-muted-foreground font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/journal/${post.slug}`}
                                    className="inline-flex items-center text-primary font-medium tracking-wide uppercase text-sm hover:text-primary/80 transition-colors mt-auto"
                                >
                                    Read Story <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
