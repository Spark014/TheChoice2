'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RecommendationForm() {
  // AI advisor feature has been removed. Show a simple CTA to contact.
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Personal Advisor</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80 mb-4">
          Our AI advisor feature is currently unavailable. For personalized recommendations, please contact our team.
        </p>
        <Button asChild className="w-full">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
