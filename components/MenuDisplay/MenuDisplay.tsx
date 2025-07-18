import { FoodMenu, Food } from '@/lib/types';
import { getTranslation } from '@/lib/utils';

export default function MenuDisplay({
  menu,
  language = 'en',
}: {
  menu: FoodMenu;
  language?: string;
}) {
  return (
    <div className="container mx-auto p-4">
      {menu.baseCategories.map(category => (
        <section key={category.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
            {getTranslation(category.translations, language, 'name')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.foods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                language={language}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FoodCard({ food, language }: { food: Food; language: string }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img
        src={food.imageUrl}
        alt={getTranslation(food.translations, language, 'name')}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">
          {getTranslation(food.translations, language, 'name')}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {getTranslation(food.translations, language, 'description')}
        </p>
        {/* <div className="mt-2 font-bold">
          {food.price} ETB
        </div> */}
      </div>
    </div>
  );
}