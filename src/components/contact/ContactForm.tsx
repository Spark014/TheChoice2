"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    const product = searchParams?.get('product');
    if (product) {
      form.setValue('message', `I'm interested in product ${product}. Please provide more information and availability.`);
    }
  }, [searchParams]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-headline font-medium text-[#1A1E26] mb-2">Send a Message</h2>
        <p className="text-muted-foreground font-light">
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:space-y-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-xs uppercase tracking-[0.2em] font-bold text-primary/60">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="rounded-none border-0 border-b border-primary/20 focus:border-primary px-0 h-10 bg-transparent shadow-none focus-visible:ring-0 transition-colors placeholder:text-primary/20 text-lg font-light text-[#1A1E26]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-xs uppercase tracking-[0.2em] font-bold text-primary/60">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      className="rounded-none border-0 border-b border-primary/20 focus:border-primary px-0 h-10 bg-transparent shadow-none focus-visible:ring-0 transition-colors placeholder:text-primary/20 text-lg font-light text-[#1A1E26]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-xs uppercase tracking-[0.2em] font-bold text-primary/60">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your inquiry..."
                    rows={1}
                    {...field}
                    className="rounded-none border-0 border-b border-primary/20 focus:border-primary px-0 bg-transparent shadow-none focus-visible:ring-0 resize-none transition-colors placeholder:text-primary/20 text-lg font-light text-[#1A1E26] min-h-[40px]"
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-8 flex justify-end">
            <Button type="submit" size="lg" className="rounded-none px-12 py-6 text-sm uppercase tracking-[0.2em] bg-[#1A1E26] hover:bg-[#1A1E26]/90 text-white font-medium transition-all duration-500 hover:px-16">
              Send Message
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
