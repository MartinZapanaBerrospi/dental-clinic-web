"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  Stethoscope,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Pacientes", href: "/patients", icon: Users },
  { name: "Citas", href: "/appointments", icon: Calendar },
  { name: "Finanzas", href: "/financials", icon: CreditCard },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "flex flex-col w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-6 py-8 border-b border-slate-100 mb-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg shadow-lg shadow-teal-100">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
              Clinica <span className="text-teal-600">Web</span>
            </span>
          </div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 text-sm font-black rounded-2xl transition-all duration-200 uppercase tracking-widest",
                  isActive 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 border border-slate-800"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-900"
                  )} />
                  {item.name}
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/30">
          <button className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-teal-700 transition-colors w-full rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100">
            <Settings className="w-5 h-5" />
            Configuración
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-red-700 transition-colors w-full rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}
