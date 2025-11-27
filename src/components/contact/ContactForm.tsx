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
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="text-center mb-8">
          <Mail className="mx-auto h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-4xl font-medium font-headline text-[#3A3A3A]">Contact Us</CardTitle>
          <CardDescription className="text-lg text-muted-foreground font-light mt-2">
            Have a question or a special request? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-headline text-foreground/80">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="rounded-none border-primary/20 focus:border-primary h-12 bg-white/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-headline text-foreground/80">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="rounded-none border-primary/20 focus:border-primary h-12 bg-white/50" />
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
                  <FormItem>
                    <FormLabel className="text-base font-headline text-foreground/80">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How can we help you today?" rows={6} {...field} className="rounded-none border-primary/20 focus:border-primary bg-white/50 resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px] rounded-none px-10 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-headline transition-all duration-300">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
