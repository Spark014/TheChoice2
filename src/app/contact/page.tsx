import ContactForm from '@/components/contact/ContactForm';
import { Suspense } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F0] pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">

        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 animate-fade-in-up">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold mb-4 md:mb-6 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-7xl font-headline font-medium text-[#1A1E26] mb-6 md:mb-8 leading-tight">
            Let's Start a <span className="italic text-primary">Conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Whether you're looking for a specific gemstone or need guidance on your collection, we're here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left Column: Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-12 animate-fade-in-up delay-100">
            <div className="space-y-10">
              {/* Email */}
              <a href="mailto:thechoicegems@gmail.com" className="flex items-start gap-5 group cursor-pointer">
                <Mail className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-primary/60 mb-2">Email</h3>
                  <div className="relative inline-block">
                    <span className="text-[#1A1E26] font-light text-lg group-hover:text-primary transition-colors">
                      thechoicegems@gmail.com
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </div>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=83+Chatham+Street,+Colombo+01,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 group cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-primary/60 mb-2">Visit</h3>
                  <div className="relative inline-block">
                    <span className="text-[#1A1E26] font-light text-lg leading-relaxed group-hover:text-primary transition-colors block">
                      83 Chatham Street,<br />
                      Colombo 01, Sri Lanka
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+94721103336" className="flex items-start gap-5 group cursor-pointer">
                <Phone className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-primary/60 mb-2">Call</h3>
                  <div className="relative inline-block">
                    <span className="text-[#1A1E26] font-light text-lg group-hover:text-primary transition-colors">
                      +94 72 110 3336
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94721103336"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 group cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-primary/60 mb-2">WhatsApp</h3>
                  <div className="relative inline-block">
                    <span className="text-[#1A1E26] font-light text-lg group-hover:text-primary transition-colors">
                      +94 72 110 3336
                    </span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form (8 cols) */}
          <div className="lg:col-span-8 animate-fade-in-up delay-200">
            <div className="bg-transparent">
              <Suspense fallback={<div>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import { Input } from '@/components/ui/input';
