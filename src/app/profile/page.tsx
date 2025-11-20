import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Package, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const favoriteItems = PlaceHolderImages.slice(2, 5);
const orderHistory = [
    { id: 'ORD001', date: '2023-10-26', total: '$1,250.00', status: 'Delivered', item: PlaceHolderImages[0]},
    { id: 'ORD002', date: '2023-11-15', total: '$850.00', status: 'Processing', item: PlaceHolderImages[1]},
];

export default function ProfilePage() {
  return (
    <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center">
                    <User className="w-12 h-12 text-primary"/>
                </div>
                <div>
                    <h1 className="text-4xl font-bold font-headline">My Account</h1>
                    <p className="text-lg text-muted-foreground">Welcome back, User!</p>
                </div>
            </div>

            <Tabs defaultValue="favorites" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="favorites">
                        <Heart className="mr-2 h-4 w-4"/>
                        Favorites
                    </TabsTrigger>
                    <TabsTrigger value="orders">
                        <Package className="mr-2 h-4 w-4"/>
                        Order History
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="favorites">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Your Favorite Items</CardTitle>
                            <CardDescription>The pieces you love, all in one place.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {favoriteItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/10 hover:text-accent-foreground">
                                    <Image src={item.imageUrl} alt={item.description} width={80} height={80} className="rounded-md object-cover" data-ai-hint={item.imageHint}/>
                                    <div className="flex-grow">
                                    <h3 className="font-headline font-semibold">{item.description}</h3>
                                    <p className="text-sm text-primary">${((parseInt(item.id) * 123.45) % 3000 + 500).toFixed(2)}</p>
                                    </div>
                                    <Button asChild variant="secondary" size="sm">
                                        <Link href={`/products/${item.id}`}>View Item</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Your Order History</CardTitle>
                            <CardDescription>A record of your past purchases.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {orderHistory.map(order => (
                                <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2 rounded-lg hover:bg-accent/10 hover:text-accent-foreground">
                                    <Image src={order.item.imageUrl} alt={order.item.description} width={80} height={80} className="rounded-md object-cover" data-ai-hint={order.item.imageHint}/>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Status: <span className="font-medium text-foreground">{order.status}</span></div>
                                    <div className="font-semibold">{order.total}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
