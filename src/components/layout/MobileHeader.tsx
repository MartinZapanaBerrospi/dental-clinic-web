"use client";

import { Menu, Stethoscope } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-teal-600 p-1 rounded-lg">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-800">
          Clinica <span className="text-teal-600">Web</span>
        </span>
      </Link>
      
      <button 
        onClick={onMenuClick}
        className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}
