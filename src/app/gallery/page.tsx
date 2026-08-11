import ExhibitionGallery from '@/components/about/ExhibitionGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media & Exhibition Gallery | The Choice Gems',
  description: 'Explore our portfolio of world gem exhibitions, fine Ceylon gemstones, and custom jewelry collections.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <ExhibitionGallery />
    </main>
  );
}
