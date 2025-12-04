export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    imageUrl: string;
    category: string;
};

export const journalPosts: BlogPost[] = [
    {
        slug: 'origin-of-sapphires',
        title: 'The Royal Legacy of Ceylon Sapphires',
        excerpt: 'Discover why Sri Lankan sapphires have adorned the crowns of royalty for centuries, known for their unique luminosity and vibrant hues.',
        content: `
      <p>For centuries, the island of Sri Lanka, formerly known as Ceylon, has been celebrated as the "Gem Island" (Ratna-Dweepa). Among its many treasures, the Ceylon Sapphire stands out as a symbol of royalty, romance, and divine favor.</p>
      
      <h3>A History Etched in Blue</h3>
      <p>From the engagement ring of Princess Diana, now worn by the Princess of Wales, to the legendary 423-carat Logan Sapphire, Ceylon sapphires are renowned for their distinct, vibrant blue hue. Unlike sapphires from other regions, which can appear inky or overly dark, Sri Lankan stones possess a unique luminosity and transparency that allows them to shine brilliantly even in low light.</p>

      <h3>The Geology of Perfection</h3>
      <p>What makes these gems so special? It begins with the geology. Sri Lanka's gem-bearing gravels, or "illam," are the result of millions of years of weathering from the central highlands. This natural process filters out impurities, leaving behind crystals of exceptional clarity.</p>

      <h3>Beyond Blue</h3>
      <p>While the cornflower blue sapphire is the most famous, Sri Lanka is also the home of the rare "Padparadscha" sapphire—a delicate pink-orange gem named after the lotus blossom. These stones are among the rarest and most coveted in the world, embodying the tropical sunset of their homeland.</p>

      <p>At The Choice Gems, we are committed to sourcing these ethical, conflict-free treasures directly from the mines, ensuring that every piece tells a story as pure as the stone itself.</p>
    `,
        date: 'October 15, 2024',
        author: 'The Choice Team',
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop', // Placeholder
        category: 'Gemstone History',
    },
    {
        slug: 'investing-in-emeralds',
        title: 'The Art of Investing in Emeralds',
        excerpt: 'Emeralds are more than just beautiful gems; they are a store of value. Learn what to look for when acquiring these green treasures.',
        content: `
      <p>Emeralds have captivated humanity for millennia, from Cleopatra's mines in Egypt to the treasury of the Spanish galleons. Today, they remain one of the most valuable gemstones per carat, often exceeding diamonds in price.</p>

      <h3>The Four Cs of Emeralds</h3>
      <p>When investing in emeralds, the rules differ slightly from diamonds. <strong>Color</strong> is paramount—the greener, the better. A deep, verdant green with a slight bluish saturation is considered ideal.</p>
      
      <p><strong>Clarity</strong> is also viewed differently. Unlike diamonds, emeralds almost always have inclusions, poetically referred to as "jardin" (garden). These internal features are accepted as part of the stone's character and proof of its natural origin. However, the inclusions should not compromise the stone's durability.</p>

      <h3>Origin Matters</h3>
      <p>While Colombia is famous for its emeralds, sources like Zambia and Ethiopia are gaining recognition for producing stones with exceptional clarity and a cooler, bluish-green tone. Understanding the origin can significantly impact the investment value.</p>

      <p>Whether you are a seasoned collector or a first-time buyer, an emerald is a timeless addition to any portfolio, promising enduring beauty and value.</p>
    `,
        date: 'November 2, 2024',
        author: 'Gemology Expert',
        imageUrl: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2670&auto=format&fit=crop', // Placeholder
        category: 'Investment Guide',
    },
    {
        slug: 'caring-for-fine-jewelry',
        title: 'Preserving the Sparkle: Care Guide',
        excerpt: 'Fine jewelry is meant to be worn and cherished. Follow these expert tips to ensure your heirlooms remain pristine for generations.',
        content: `
      <p>Your jewelry collection is a compilation of memories, milestones, and artistry. To ensure these pieces last a lifetime—and beyond—proper care is essential.</p>

      <h3>The Golden Rule</h3>
      <p>The simplest rule to remember is: <em>"Last on, first off."</em> Put your jewelry on after you've applied makeup, perfume, and hairspray, as chemicals can dull the luster of gold and damage porous stones like pearls and opals.</p>

      <h3>Cleaning at Home</h3>
      <p>For most diamond and sapphire jewelry, a gentle soak in warm water with a drop of mild dish soap is sufficient. Use a soft toothbrush to clean behind the settings where dust accumulates. However, never use ultrasonic cleaners for emeralds, as they can remove the oils used to treat the stone.</p>

      <h3>Storage</h3>
      <p>Store your pieces individually. Diamonds are the hardest substance on earth and can scratch other gemstones and metals. Soft pouches or lined jewelry boxes with separate compartments are the best way to keep your treasures safe.</p>

      <p>With a little attention, your fine jewelry will continue to shine as brightly as the day you first wore it.</p>
    `,
        date: 'November 20, 2024',
        author: 'The Choice Team',
        imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2669&auto=format&fit=crop', // Placeholder
        category: 'Care & Maintenance',
    },
];
