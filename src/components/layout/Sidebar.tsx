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
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Pacientes", href: "/patients", icon: Users },
  { name: "Citas", href: "/appointments", icon: Calendar },
  { name: "Finanzas", href: "/financials", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0">
      <div className="flex items-center gap-2 px-6 py-8 border-b border-slate-100 mb-4">
        <div className="bg-teal-600 p-1.5 rounded-lg shadow-sm shadow-teal-200">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">
          Clinica <span className="text-teal-600 underline decoration-teal-300 underline-offset-4 decoration-2">Web</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
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
  );
}
