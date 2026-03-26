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
        <div className="flex items-center justify-between px-6 py-8 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg shadow-sm shadow-teal-200">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Clinica <span className="text-teal-600 underline decoration-teal-300 underline-offset-4 decoration-2">Web</span>
            </span>
          </div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-teal-50 text-teal-700 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-teal-600 transition-colors w-full rounded-lg hover:bg-teal-50">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors w-full rounded-lg hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
