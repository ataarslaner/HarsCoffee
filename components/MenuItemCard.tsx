import { MenuItem } from '@/lib/types';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="flex items-baseline justify-between py-1.5">
      <div className="flex-1 pr-3 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[13px] font-semibold text-stone-900 tracking-wide leading-tight">
            {item.name.toUpperCase()}
          </span>
          {item.size && (
            <span className="text-[9px] font-medium text-stone-400 border border-stone-300 rounded px-1 py-px uppercase tracking-wider">
              {item.size}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-[10px] text-stone-400 leading-tight mt-px">
            {item.description}
          </p>
        )}
      </div>
      <span className="text-[13px] font-bold text-stone-900 whitespace-nowrap tabular-nums">
        {item.price > 0 ? `${item.price}₺` : item.priceLabel || ''}
      </span>
    </div>
  );
}