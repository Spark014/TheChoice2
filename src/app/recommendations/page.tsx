import { redirect } from 'next/navigation';

export default function RecommendationPage() {
  // AI Advisor removed — redirect users to contact for personalized help
  redirect('/contact');
}
