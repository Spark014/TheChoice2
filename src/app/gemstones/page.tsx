import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Gem } from 'lucide-react';

const gemstones = [
  {
    name: 'Diamond',
    description: 'Known for its unmatched brilliance and hardness, the diamond is the most popular gemstone. It symbolizes love, purity, and invincibility. Diamonds are formed deep within the Earth under extreme heat and pressure.',
    care: 'Clean with a soft brush, warm water, and a mild soap. Professional cleaning is recommended annually.',
  },
  {
    name: 'Sapphire',
    description: 'A precious gemstone, a variety of the mineral corundum, consisting of aluminum oxide with trace amounts of elements such as iron, titanium, chromium, vanadium, or magnesium. It is typically blue, but natural "fancy" sapphires also occur in yellow, purple, orange, and green colors.',
    care: 'Use warm, soapy water and a soft brush. Avoid harsh chemicals and ultrasonic cleaners if the stone has inclusions.',
  },
  {
    name: 'Emerald',
    description: 'Emerald is a gemstone and a variety of the mineral beryl colored green by trace amounts of chromium and sometimes vanadium. It symbolizes rebirth, love, and fertility. Most emeralds have inclusions, which are not seen as flaws but as part of the stone\'s character.',
    care: 'Clean with a soft cloth and room temperature water. Avoid soap and chemicals. Never use an ultrasonic cleaner, as it can damage the stone.',
  },
  {
    name: 'Ruby',
    description: 'Ruby is a pink to blood-red colored gemstone, a variety of the mineral corundum. The red color is caused mainly by the presence of the element chromium. It is considered one of the four precious stones, together with sapphire, emerald, and diamond.',
    care: 'Warm, soapy water and a soft brush are the safest cleaning methods. It is a durable stone, but professional inspection is still a good idea.',
  },
];

export default function GemstonesPage() {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-24 bg-[#F5F5F0] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Gem className="mx-auto h-10 w-10 text-primary mb-6" />
          <h1 className="text-5xl md:text-6xl font-medium font-headline text-[#3A3A3A] mb-6">The Art of Gemstones</h1>
          <div className="w-24 h-[1px] bg-primary/30 mx-auto mb-6" />
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Explore the unique properties and stories behind our favorite gemstones. Learn how to care for your precious pieces to ensure they last a lifetime.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {gemstones.map((gem) => (
            <AccordionItem key={gem.name} value={gem.name} className="border-b border-primary/10 px-4">
              <AccordionTrigger className="text-2xl font-headline font-medium text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
                {gem.name}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground font-light leading-relaxed pb-8 pl-4">
                <p className="mb-6">{gem.description}</p>
                <div className="bg-white/50 p-6 border-l-2 border-primary/20">
                  <h4 className="font-medium font-headline text-foreground mb-2 text-base uppercase tracking-widest">Care Instructions</h4>
                  <p className="text-base italic">{gem.care}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
