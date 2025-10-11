import type React from "react";
import { useEffect, useRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  // Check if className contains positioning classes (fixed, absolute, etc.)
  const hasCustomPositioning = className && (
    className.includes('fixed') || 
    className.includes('absolute') || 
    className.includes('relative') ||
    className.includes('static') ||
    className.includes('sticky')
  );

  const defaultClasses = 'z-40 absolute right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark';
  
  return (
    <div
      ref={dropdownRef}
      className={hasCustomPositioning ? `z-40 ${className}` : `${defaultClasses} ${className || ''}`}
    >
      {children}
    </div>
  );
};
