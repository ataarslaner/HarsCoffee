'use client';

import { useEffect, useState, useRef } from 'react';
import { MenuItemCard } from '@/components/MenuItemCard';
import { LogoHeader } from '@/components/LogoHeader';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Footer } from '@/components/Footer';
import { categories, CategoryId, MenuSchema } from '@/lib/types';
import menuData from '@/data/menu.json';

type LayoutRow = CategoryId | [CategoryId, CategoryId] | [CategoryId, '_logo'];
type LayoutSection = { title: string; rows: LayoutRow[] };
type LayoutEntry = LayoutRow | LayoutSection;

const layout: LayoutEntry[] = [
  'kampanya',
  {
    title: 'Sıcak',
    rows: [
      ['brew-bar', 'sicak-espresso'],
      ['sicak-matcha', 'caylar'],
      'sicak-farkli',
    ],
  },
  {
    title: 'Soğuk',
    rows: [
      ['soguk-kahve', 'soguk-matcha'],
      ['limonata', 'soguk-cay'],
    ],
  },
  'soguk-farkli',
  'soguk-icecekler',
  {
    title: 'Yiyecekler',
    rows: [
      ['sandvic', 'pizza'],
      ['firin', 'bowl'],
      'tatlilar',
    ],
  },
  'ekstra',
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
      {categoryId === 'kampanya' && (
        <div className="mb-2">
          <p className="text-[10px] text-stone-400 leading-tight font-medium">Sabah saat 10 ile öğlen 2 arası</p>
          <p className="text-[10px] text-stone-400 leading-tight">(filtre kahve ve americano %20 indirimlidir)</p>
          <p className="text-[10px] text-stone-400 leading-tight">(tüm yiyecekler %20 indirimlidir)</p>
        </div>
      )}
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

      <main className="max-w-5xl mx-auto px-4 pt-4 pb-24 space-y-8">
        {layout.map((entry, i) => {
          // Section with title
          if (typeof entry === 'object' && !Array.isArray(entry) && 'title' in entry) {
            return (
              <div key={i} className="space-y-6">
                <div className="pt-4">
                  <h2 className="text-2xl font-black text-stone-900 uppercase tracking-[0.25em] font-[family-name:var(--font-playfair)]">
                    {entry.title}
                  </h2>
                  <div className="mt-1 w-12 border-b-2 border-stone-900" />
                </div>
                {entry.rows.map((row, j) => {
                  if (Array.isArray(row)) {
                    return (
                      <div key={j} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                        <CategorySection categoryId={row[0]} menu={menu} sectionRef={setRef(row[0])} />
                        {row[1] === '_logo' ? (
                          <div className="hidden sm:flex items-center justify-center">
                            {/* Logo placeholder — add your image here */}
                          </div>
                        ) : (
                          <CategorySection categoryId={row[1]} menu={menu} sectionRef={setRef(row[1])} />
                        )}
                      </div>
                    );
                  }
                  return <CategorySection key={row} categoryId={row} menu={menu} sectionRef={setRef(row)} />;
                })}
              </div>
            );
          }
          // Paired row
          if (Array.isArray(entry)) {
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <CategorySection categoryId={entry[0]} menu={menu} sectionRef={setRef(entry[0])} />
                {entry[1] === '_logo' ? (
                  <div className="hidden sm:flex items-center justify-center" />
                ) : (
                  <CategorySection categoryId={entry[1]} menu={menu} sectionRef={setRef(entry[1])} />
                )}
              </div>
            );
          }
          // Single row
          return <CategorySection key={entry} categoryId={entry} menu={menu} sectionRef={setRef(entry)} />;
        })}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}