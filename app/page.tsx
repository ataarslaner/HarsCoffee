'use client';

import { useEffect, useState, useRef } from 'react';
import { MenuItemCard } from '@/components/MenuItemCard';
import { LogoHeader } from '@/components/LogoHeader';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Footer } from '@/components/Footer';
import { categories, CategoryId, MenuSchema } from '@/lib/types';
import menuData from '@/data/menu.json';

export default function HomePage() {
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('yiyecekler');
  const [menu] = useState(() => MenuSchema.parse(menuData));
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 200; // Header offset
      let newCategory = currentCategory;

      // Her kategoriyi kontrol et - en yakın olanı bul
      for (let i = categories.length - 1; i >= 0; i--) {
        const category = categories[i];
        const element = categoryRefs.current[category.id];
        if (element) {
          const elementTop = element.offsetTop;
          
          if (scrollPosition >= elementTop) {
            newCategory = category.id;
            break;
          }
        }
      }

      if (newCategory !== currentCategory) {
        setCurrentCategory(newCategory);
      }
    };

    const throttledScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [currentCategory, isScrolling]);

  const handleCategoryChange = (categoryId: CategoryId) => {
    setCurrentCategory(categoryId);
    setIsScrolling(true); // Scroll sırasında otomatik değişimi engelle
    
    const element = categoryRefs.current[categoryId];
    if (element) {
      // Header yüksekliğini hesapla (logo + tabbar + motto)
      const headerHeight = 210; // LogoHeader + TabBar + Motto + extra padding
      
      const elementTop = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
      
      // Scroll tamamlandıktan sonra otomatik değişimi tekrar aktif et
      setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Biraz daha uzun süre bekle
    } else {
      setIsScrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LogoHeader 
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <main className="container mx-auto px-4 py-6 pb-32">
        {categories.map((category) => {
          const items = menu[category.id] || [];
          
          return (
            <section
              key={category.id}
              ref={(el) => categoryRefs.current[category.id] = el as HTMLDivElement | null}
              className="mb-12 last:mb-0"
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.label}
                </h1>
                <p className="text-gray-600">
                  {items.length} ürün
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
