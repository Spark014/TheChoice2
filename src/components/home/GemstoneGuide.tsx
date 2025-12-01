'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Shield, Gem, Flame, Droplets, Wind, Mountain, Sun, Moon, Star } from 'lucide-react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type Option = {
    label: string;
    value: string;
    icon?: LucideIcon;
    color?: string;
};

type Question = {
    id: string;
    question: string;
    options: Option[];
};

const questions: Question[] = [
    {
        id: 'occasion',
        question: "What is the occasion?",
        options: [
            { label: 'Engagement', icon: Heart, value: 'love' },
            { label: 'Self-Care', icon: Sparkles, value: 'self' },
            { label: 'Investment', icon: Shield, value: 'invest' },
            { label: 'Gift', icon: Gem, value: 'gift' },
        ],
    },
    {
        id: 'color',
        question: "Which hue calls to you?",
        options: [
            { label: 'Royal Blue', color: 'bg-blue-700', value: 'blue' },
            { label: 'Crimson Red', color: 'bg-red-600', value: 'red' },
            { label: 'Verdant Green', color: 'bg-green-600', value: 'green' },
            { label: 'Sunny Yellow', color: 'bg-yellow-400', value: 'yellow' },
            { label: 'Mystic Purple', color: 'bg-purple-600', value: 'purple' },
            { label: 'Soft Pink', color: 'bg-pink-400', value: 'pink' },
            { label: 'Pure White', color: 'bg-slate-100', value: 'white' },
            { label: 'Midnight Black', color: 'bg-neutral-900', value: 'black' },
        ],
    },
    {
        id: 'vibe',
        question: "What energy do you seek?",
        options: [
            { label: 'Timeless', icon: Star, value: 'classic' },
            { label: 'Bold', icon: Flame, value: 'modern' },
            { label: 'Calm', icon: Droplets, value: 'ethereal' },
            { label: 'Grounded', icon: Mountain, value: 'earthy' },
        ],
    },
];

// Helper to get recommendation based on Color + Vibe (Primary) and Occasion (Secondary context)
const getRecommendation = (answers: Record<string, string>) => {
    const { color, vibe } = answers;

    // Default fallback
    let result = { name: 'Blue Sapphire', description: 'A timeless classic symbolizing wisdom and royalty.', link: '/products?stone=sapphire' };

    // Logic Tree
    if (color === 'blue') {
        if (vibe === 'classic') result = { name: 'Blue Sapphire', description: 'The ultimate symbol of nobility and truth. A forever classic.', link: '/products?stone=sapphire' };
        else if (vibe === 'modern') result = { name: 'Tanzanite', description: 'A rare, exotic gem found only in the foothills of Kilimanjaro.', link: '/products?stone=tanzanite' };
        else if (vibe === 'ethereal') result = { name: 'Aquamarine', description: 'Capturing the serenity of the ocean, perfect for calming the soul.', link: '/products?stone=aquamarine' };
        else result = { name: 'Lapis Lazuli', description: 'An ancient stone of wisdom and truth.', link: '/products?stone=lapis' };
    } else if (color === 'red') {
        if (vibe === 'classic') result = { name: 'Ruby', description: 'The King of Gems. Passion, protection, and prosperity.', link: '/products?stone=ruby' };
        else if (vibe === 'modern') result = { name: 'Red Spinel', description: 'A brilliant, durable gem often mistaken for ruby, but with its own fire.', link: '/products?stone=spinel' };
        else result = { name: 'Garnet', description: 'A stone of regeneration and vitality.', link: '/products?stone=garnet' };
    } else if (color === 'green') {
        if (vibe === 'classic') result = { name: 'Emerald', description: 'The jewel of kings, symbolizing rebirth and love.', link: '/products?stone=emerald' };
        else if (vibe === 'modern') result = { name: 'Tsavorite', description: 'A vibrant, brilliant green garnet that rivals emerald in beauty.', link: '/products?stone=tsavorite' };
        else if (vibe === 'ethereal') result = { name: 'Peridot', description: 'The gem of the sun, bringing warmth and well-being.', link: '/products?stone=peridot' };
        else result = { name: 'Green Tourmaline', description: 'A healing stone connecting you to nature\'s rhythms.', link: '/products?stone=tourmaline' };
    } else if (color === 'yellow') {
        if (vibe === 'classic') result = { name: 'Yellow Sapphire', description: 'Prosperity and wisdom encapsulated in golden light.', link: '/products?stone=yellow-sapphire' };
        else if (vibe === 'modern') result = { name: 'Heliodor', description: 'A brilliant golden beryl, the gift of the sun.', link: '/products?stone=heliodor' };
        else result = { name: 'Citrine', description: 'The merchant\'s stone, bringing success and abundance.', link: '/products?stone=citrine' };
    } else if (color === 'purple') {
        if (vibe === 'classic') result = { name: 'Amethyst', description: 'A royal stone of spiritual protection and clarity.', link: '/products?stone=amethyst' };
        else result = { name: 'Purple Sapphire', description: 'Enchanting and durable, a unique twist on a classic.', link: '/products?stone=purple-sapphire' };
    } else if (color === 'pink') {
        if (vibe === 'classic') result = { name: 'Pink Sapphire', description: 'Feminine elegance and resilience combined.', link: '/products?stone=pink-sapphire' };
        else if (vibe === 'ethereal') result = { name: 'Morganite', description: 'Divine love and emotional healing in a soft peach hue.', link: '/products?stone=morganite' };
        else result = { name: 'Pink Spinel', description: 'Vibrant and lively, for the bold spirit.', link: '/products?stone=pink-spinel' };
    } else if (color === 'white') {
        if (vibe === 'classic') result = { name: 'Diamond', description: 'Unbreakable, eternal, and infinitely brilliant.', link: '/products?stone=diamond' };
        else if (vibe === 'ethereal') result = { name: 'Moonstone', description: 'A stone of new beginnings and intuition.', link: '/products?stone=moonstone' };
        else result = { name: 'White Sapphire', description: 'Pure, clear, and full of light. A sophisticated alternative.', link: '/products?stone=white-sapphire' };
    } else if (color === 'black') {
        if (vibe === 'classic') result = { name: 'Black Diamond', description: 'Mysterious, powerful, and undeniably chic.', link: '/products?stone=black-diamond' };
        else result = { name: 'Black Spinel', description: 'Deep, dark, and protective.', link: '/products?stone=black-spinel' };
    }

    return result;
};

export default function GemstoneGuide() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswer = (value: string) => {
        const currentQuestion = questions[step];
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(questions.length); // Show result
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers({});
    };

    const result = step === questions.length ? getRecommendation(answers) : null;

    return (
        <section className="py-32 bg-[#111111] text-white w-full relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl relative z-10">
                <div className="mb-16">
                    <span className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4 block">Interactive Guide</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-medium mb-6 text-white">Find Your Perfect Stone</h2>
                    <p className="text-white/60 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Let us guide you to the gemstone that resonates with your personal journey.
                    </p>
                </div>

                <div className="min-h-[400px] flex flex-col justify-center items-center">
                    <AnimatePresence mode="wait">
                        {step < questions.length ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full max-w-3xl"
                            >
                                <h3 className="text-3xl font-headline font-light mb-12 text-white">{questions[step].question}</h3>
                                <div className={`grid gap-6 ${questions[step].id === 'color' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-4'}`}>
                                    {questions[step].options.map((option) => (
                                        <button
                                            key={option.label}
                                            className="group relative h-auto py-8 px-6 flex flex-col items-center gap-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 rounded-sm"
                                            onClick={() => handleAnswer(option.value)}
                                        >
                                            {option.icon && <option.icon className="w-8 h-8 text-white/80 group-hover:text-primary transition-colors duration-300" />}
                                            {option.color && <div className={`w-8 h-8 rounded-full ${option.color} ring-2 ring-white/20 group-hover:ring-white/50 transition-all`} />}
                                            <span className="text-lg font-medium tracking-wide text-white/90 group-hover:text-white">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-center w-full max-w-3xl bg-white/5 border border-white/10 p-12 rounded-sm backdrop-blur-sm"
                            >
                                <div className="flex justify-center mb-6">
                                    <Gem className="w-12 h-12 text-primary animate-pulse" />
                                </div>
                                <span className="text-sm uppercase tracking-[0.3em] text-white/50 font-medium mb-4 block">Your Match</span>
                                <h3 className="text-5xl md:text-6xl font-headline text-white mb-6">{result?.name}</h3>
                                <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto font-light leading-relaxed">{result?.description}</p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <Button asChild size="lg" className="font-headline text-lg px-10 py-6 bg-white text-black hover:bg-white/90 rounded-none border-0">
                                        <Link href={result?.link || '/products'}>Discover {result?.name}</Link>
                                    </Button>
                                    <Button variant="outline" onClick={resetQuiz} className="font-headline text-lg px-10 py-6 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-none bg-transparent">
                                        Start Over
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
