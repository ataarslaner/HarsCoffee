'use client';

import { categories, CategoryId } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface TabBarProps {
  className?: string;
  currentCategory?: CategoryId;
  onCategoryChange?: (category: CategoryId) => void;
}

export function TabBar({ className, currentCategory, onCategoryChange }: TabBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeCategory = currentCategory || 'yiyecekler';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Aktif sekmeyi görünür yap
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      // Buton container'ın dışındaysa scroll et
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        button.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: CategoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <nav className={cn(
      'bg-white border-t border-gray-100',
      className
    )}>
      <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max px-4 space-x-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                ref={isActive ? activeButtonRef : null}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200',
                  'whitespace-nowrap border-b-2',
                  isActive
                    ? 'border-yellow-500 text-yellow-600 bg-yellow-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 