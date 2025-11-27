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
    <div className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <Gem className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold font-headline mt-4">A World of Gemstones</h1>
          <p className="mt-4 text-lg text-foreground/80">
            Explore the unique properties and stories behind our favorite gemstones. Learn how to care for your precious pieces to ensure they last a lifetime.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full mt-12">
          {gemstones.map((gem) => (
            <AccordionItem key={gem.name} value={gem.name} className="bg-card border-b-0 mb-4 rounded-lg px-6">
              <AccordionTrigger className="text-xl font-headline hover:no-underline">{gem.name}</AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 space-y-4">
                <p>{gem.description}</p>
                <div>
                  <h4 className="font-semibold font-headline">Care Instructions:</h4>
                  <p>{gem.care}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
