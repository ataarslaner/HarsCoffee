'use client';

import { cn } from '@/lib/utils';
import { TabBar } from './TabBar';
import { CategoryId } from '@/lib/types';

interface LogoHeaderProps {
  currentCategory?: CategoryId;
  onCategoryChange?: (category: CategoryId) => void;
}

export function LogoHeader({ currentCategory, onCategoryChange }: LogoHeaderProps) {
  return (
    <>
      <div className="bg-white pt-8 pb-4 flex flex-col items-center">
        <span className="text-5xl font-black text-stone-900 font-[family-name:var(--font-playfair)] tracking-tight">
          hars.
        </span>
        <p className="text-stone-400 font-medium tracking-[0.3em] uppercase text-[10px] mt-2">
          Grınd Culture
        </p>
      </div>
      <div className={cn('sticky top-0 z-50 bg-white border-b border-stone-900')}>
      </div>
    </>
  );
}