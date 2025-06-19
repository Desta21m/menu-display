// /app/(subdomain)/[subdomain]/page.tsx
import { fetchRestaurant } from '@/lib/api';
import RestaurantPage from '@/components/MenuDisplay/RestaurantPage';
import NotFound from '@/components/UI/NotFound';
import { Metadata } from 'next';

export default async function Page({params}: {params: { subdomain: string } }) {
    // Add this line to "use" the params immediately
  const { subdomain } = await Promise.resolve(params);
  try {
    console.log("Subdomain:", subdomain);
    const restaurant = await fetchRestaurant(subdomain);

    console.log("the feached resturant :", restaurant);
    if (!restaurant?.active) {
      console.log("i get the restorat but is is notactive", subdomain);
      return <NotFound subdomain={subdomain} />;
    }

    return <RestaurantPage restaurant={restaurant} />;
  } catch (error) {
    console.error('Failed to fetch restaurant:', error);
    return <NotFound subdomain={subdomain} />;
  }
}
