import { redirect } from 'next/navigation';

// Checkout removed - redirect to product gallery
export default function CheckoutPage() {
  redirect('/products');
}
