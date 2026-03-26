import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Total Pacientes", value: "2,450", change: "+12.5%", trend: "up", icon: Users },
  { name: "Citas Hoy", value: "18", change: "+4", trend: "up", icon: Calendar },
  { name: "Ingresos (Mes)", value: "S/ 12,450", change: "-2.3%", trend: "down", icon: TrendingUp },
  { name: "Nuevos Pacientes", value: "48", change: "+8.2%", trend: "up", icon: Activity },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-slate-500 font-medium">Bienvenido de nuevo. Aquí tienes un resumen de la actividad hoy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-6 px-6 pb-8 overflow-hidden rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-teal-600 rounded-2xl shadow-lg shadow-teal-100 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm",
                item.trend === 'up' ? "bg-green-600 text-white" : "bg-red-600 text-white"
              )}>
                {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </div>
            </div>
            <div className="mt-6 flex flex-col items-baseline">
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{item.value}</p>
              <p className="mt-1 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm h-80 flex flex-col justify-center items-center group hover:border-teal-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 text-slate-500 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors">Próximamente</span>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors">
            <Calendar className="w-10 h-10 text-slate-300 group-hover:text-teal-600 transition-all" />
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Citas e Incidencias</h3>
          <p className="mt-2 text-xs font-bold text-slate-400 text-center max-w-[240px]">Visualiza el flujo de pacientes y estadísticas de atención diaria.</p>
        </div>
        
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm h-80 flex flex-col justify-center items-center group hover:border-teal-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 text-slate-500 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors">Próximamente</span>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors">
            <TrendingUp className="w-10 h-10 text-slate-300 group-hover:text-teal-600 transition-all" />
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Ingresos Mensuales</h3>
          <p className="mt-2 text-xs font-bold text-slate-400 text-center max-w-[240px]">Análisis detallado de transacciones, proformas y balances generales.</p>
        </div>
      </div>
    </div>
  );
}
