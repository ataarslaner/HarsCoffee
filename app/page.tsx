'use client';

import { useEffect, useState, useRef } from 'react';
import { MenuItemCard } from '@/components/MenuItemCard';
import { LogoHeader } from '@/components/LogoHeader';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Footer } from '@/components/Footer';
import { categories, CategoryId, MenuSchema } from '@/lib/types';
import menuData from '@/data/menu.json';

// Paired categories that make sense together for the customer
const layout: (CategoryId | [CategoryId, CategoryId])[] = [
  'kampanya',
  ['yiyecekler', 'tatlilar'],
  ['klasik-kahveler', 'soguk-kahveler'],
  ['hars-matcha', 'cay-ve-sicak-icecekler'],
  ['soguk-icecekler', 'ekstralar'],
];

function CategorySection({ categoryId, menu, sectionRef }: {
  categoryId: CategoryId;
  menu: Record<string, { id: string; name: string; price: number; description?: string; size?: string }[]>;
  sectionRef?: (el: HTMLDivElement | null) => void;
}) {
  const category = categories.find(c => c.id === categoryId);
  const items = menu[categoryId] || [];
  if (!category) return null;

  return (
    <div ref={sectionRef}>
      <div className="border-b-2 border-stone-900 pb-1 mb-2">
        <h2 className="text-lg font-black text-stone-900 uppercase tracking-wider font-[family-name:var(--font-playfair)]">
          {category.label}
        </h2>
      </div>
      <div className="divide-y divide-stone-100">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('kampanya');
  const [menu] = useState(() => MenuSchema.parse(menuData));
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      const scrollPosition = window.scrollY + 200;
      let newCategory = currentCategory;
      for (let i = categories.length - 1; i >= 0; i--) {
        const cat = categories[i];
        const el = categoryRefs.current[cat.id];
        if (el && scrollPosition >= el.offsetTop) { newCategory = cat.id; break; }
      }
      if (newCategory !== currentCategory) setCurrentCategory(newCategory);
    };
    const throttled = () => { if (!isScrolling) requestAnimationFrame(handleScroll); };
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  }, [currentCategory, isScrolling]);

  const handleCategoryChange = (categoryId: CategoryId) => {
    setCurrentCategory(categoryId);
    setIsScrolling(true);
    const el = categoryRefs.current[categoryId];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 180, behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 1500);
    } else setIsScrolling(false);
  };

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    categoryRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-white">
      <LogoHeader currentCategory={currentCategory} onCategoryChange={handleCategoryChange} />

      <main className="max-w-3xl mx-auto px-4 pt-4 pb-24 space-y-8">
        {layout.map((row, i) => {
          if (Array.isArray(row)) {
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <CategorySection categoryId={row[0]} menu={menu} sectionRef={setRef(row[0])} />
                <CategorySection categoryId={row[1]} menu={menu} sectionRef={setRef(row[1])} />
              </div>
            );
          }
          return (
            <CategorySection key={row} categoryId={row} menu={menu} sectionRef={setRef(row)} />
          );
        })}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}