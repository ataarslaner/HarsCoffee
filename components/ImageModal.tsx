'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Aggressive close function
  const closeModal = useCallback(() => {
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    // Set a flag to prevent reopening
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.style.pointerEvents = 'none';
    }
    
    // Call the close function
    onClose();
    
    // Reset after a delay
    closeTimeoutRef.current = setTimeout(() => {
      if (modalElement) {
        modalElement.style.pointerEvents = 'auto';
      }
    }, 500);
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape, { capture: true });
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, { capture: true });
      document.body.style.overflow = 'unset';
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen, closeModal]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  }, [closeModal]);

  // Handle close button click
  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  }, [closeModal]);

  // Handle modal content click (prevent closing)
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Don't render if not open
  if (!isOpen) return null;

  // Create portal to body
  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ 
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      {/* Modal Content */}
      <div 
        className="relative max-w-4xl max-h-[90vh] mx-4"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Image Container */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto max-h-[80vh] object-contain"
            draggable={false}
            onClick={handleModalClick}
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-medium">{imageAlt}</p>
        </div>
      </div>
    </div>
  );

  // Use portal to render at body level
  return createPortal(modalContent, document.body);
} 