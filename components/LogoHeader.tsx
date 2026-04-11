'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TabBar } from './TabBar';
import { categories, CategoryId } from '@/lib/types';

interface LogoHeaderProps {
  currentCategory?: CategoryId;
  onCategoryChange?: (category: CategoryId) => void;
}

export function LogoHeader({ currentCategory, onCategoryChange }: LogoHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-200',
      isScrolled ? 'py-2' : 'py-4'
    )}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className={cn(
          'transition-all duration-200',
          isScrolled ? 'scale-75' : 'scale-100'
        )}>
          <Image
            src="/logo.jpg"
            alt="Hars Coffee"
            width={isScrolled ? 120 : 160}
            height={isScrolled ? 40 : 53}
            className="h-auto object-contain"
            priority
          />
        </div>
        <p className={cn(
          'text-yellow-600 font-medium transition-all duration-200 mt-1',
          isScrolled ? 'text-xs opacity-75' : 'text-sm'
        )}>
          FOR YOUR SOUL & STOMACH
        </p>
      </div>
      <TabBar 
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
      />
    </header>
  );
} 