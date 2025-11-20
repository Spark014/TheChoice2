import ContactForm from '@/components/contact/ContactForm';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <Suspense fallback={<div>Loading...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
import { Input } from '@/components/ui/input';
