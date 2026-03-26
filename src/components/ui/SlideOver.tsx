"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[110] transform transition-transform duration-500 ease-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
}
