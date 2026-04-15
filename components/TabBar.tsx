'use client';

import { categories, CategoryId } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface TabBarProps {
  className?: string;
  currentCategory?: CategoryId;
  onCategoryChange?: (category: CategoryId) => void;
}

export function TabBar({ className, currentCategory, onCategoryChange }: TabBarProps) {
  const activeCategory = currentCategory || 'yiyecekler';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategory]);

  return (
    <nav className={cn('bg-white border-t border-stone-200 mt-2', className)}>
      <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max px-4 space-x-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                ref={isActive ? activeButtonRef : null}
                onClick={() => onCategoryChange?.(category.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200',
                  'whitespace-nowrap border-b-2',
                  isActive
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
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