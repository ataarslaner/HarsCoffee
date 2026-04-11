import { MenuItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState, useCallback, useRef } from 'react';
import { ImageModal } from './ImageModal';

interface MenuItemCardProps {
  item: MenuItem;
  className?: string;
}

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpeningRef = useRef(false);

  const handleOpenModal = useCallback(() => {
    if (item.image && !isOpeningRef.current) {
      isOpeningRef.current = true;
      setIsModalOpen(true);
      // Reset after a delay
      setTimeout(() => {
        isOpeningRef.current = false;
      }, 1000);
    }
  }, [item.image]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={cn(
      'rounded-xl shadow-sm bg-white overflow-hidden',
      'hover:shadow-md transition-all duration-200',
      'active:scale-95 active:shadow-lg',
      'border border-gray-100',
      'flex flex-col h-full',
      className
    )}>
      {/* Görsel Alanı */}
      <div className={cn(
        "relative h-32 flex items-center justify-center overflow-hidden",
        item.image 
          ? "bg-gradient-to-br from-amber-100 to-orange-100 cursor-pointer hover:opacity-90 transition-opacity" 
          : "bg-white"
      )}>
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
            onClick={handleOpenModal}
            style={{ pointerEvents: 'auto' }}
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
            <span className="text-2xl font-bold text-gray-600">
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Fiyat Badge */}
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-sm">
          <span className="text-xs font-semibold text-gray-700">
            ₺{item.price}
          </span>
        </div>
      </div>
      
      {/* İçerik Alanı */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900 leading-tight mb-2 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {item.name}
        </h3>
        
        {/* Alt Fiyat - Mobil için */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <span className="text-lg font-bold text-amber-600">
          ₺{item.price}
        </span>
      </div>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={item.image || ''}
        imageAlt={item.name}
      />
    </div>
  );
} 