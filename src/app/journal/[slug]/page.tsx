'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { journalPosts } from '@/lib/journal-data';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = journalPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h1 className="text-4xl font-headline mb-4">Article Not Found</h1>
                <Button asChild variant="link">
                    <Link href="/journal">Return to Journal</Link>
                </Button>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background pt-32 pb-24">
            {/* Hero Image */}
            <div className="w-full h-[60vh] relative mb-16 md:mb-24">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 text-white/80 mb-4 font-medium tracking-wide uppercase text-sm">
                                <span className="text-primary">{post.category}</span>
                                <span className="w-1 h-1 bg-white/50 rounded-full" />
                                <span>{post.date}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-medium text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                {/* Back Link */}
                <Link
                    href="/journal"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group"
                >
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Journal
                </Link>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg prose-headings:font-headline prose-headings:font-medium prose-p:font-light prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Written by</p>
                            <p className="text-sm text-muted-foreground">{post.author}</p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                </div>
            </div>
        </article>
    );
}
