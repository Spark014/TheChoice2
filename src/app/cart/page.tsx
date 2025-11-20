import { redirect } from 'next/navigation';

// Cart and checkout features removed — redirect users to the products gallery.
export default function CartPage() {
  redirect('/products');
}
