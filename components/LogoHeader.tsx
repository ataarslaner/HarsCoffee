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
        <div className="flex gap-6 mt-4">
          <button
            onClick={() => onCategoryChange?.('brew-bar' as CategoryId)}
            className="text-xs font-semibold text-white bg-stone-900 uppercase tracking-widest py-2 px-4 rounded"
          >
            İçecekler
          </button>
          <button
            onClick={() => onCategoryChange?.('sandvic' as CategoryId)}
            className="text-xs font-semibold text-white bg-stone-900 uppercase tracking-widest py-2 px-4 rounded"
          >
            Yiyecekler
          </button>
        </div>
      </div>
      <div className={cn('sticky top-0 z-50 bg-white border-b border-stone-900')}>
      </div>
    </>
  );
}