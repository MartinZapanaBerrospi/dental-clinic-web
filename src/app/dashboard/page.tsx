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
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">Bienvenido de nuevo. Aquí tienes un resumen de la actividad hoy.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-5 pb-6 overflow-hidden rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors">
                <item.icon className="w-6 h-6 text-teal-600" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                item.trend === 'up' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </div>
            </div>
            <div className="mt-4 flex flex-col items-baseline">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500 truncate">{item.name}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-teal-600/0 group-hover:bg-teal-600 transition-all w-full" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-96 flex flex-col justify-center items-center text-slate-400">
          <Calendar className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-sm font-medium">Gráfico de Citas Próximamente</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-96 flex flex-col justify-center items-center text-slate-400">
          <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-sm font-medium">Gráfico de Ingresos Próximamente</p>
        </div>
      </div>
    </div>
  );
}
