"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign,
  Download,
  Search,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function FinancialsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payments')
        .select('*, patients(first_name, last_name_paternal)')
        .order('id', { ascending: false })
        .limit(100);

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = payments.reduce((sum, p) => sum + (parseFloat(p.amount_paid) || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Finanzas</h1>
          <p className="text-slate-500 mt-1">Control de ingresos, pagos y balance del consultorio.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Descargar Reporte Mensual
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative shadow-2xl shadow-slate-200">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24" />
           </div>
           <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Ingresos Totales (Vista)</p>
           <h2 className="text-4xl font-black mt-2 tracking-tighter">S/ {totalRevenue.toLocaleString()}</h2>
           <div className="mt-4 flex items-center gap-2 text-xs font-medium text-teal-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+15.2% vs mes anterior</span>
           </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex items-center justify-center text-slate-300 italic text-sm">
           <DollarSign className="w-12 h-12 opacity-10 mr-4" />
           Resumen de métodos de pago (Visa, Yape, Efectivo) próximamente...
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
             <CreditCard className="w-4 h-4 text-teal-600" /> Últimas Transacciones
           </h3>
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar por paciente..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Monto</th>
                  <th className="px-6 py-4">Método</th>
                  <th className="px-6 py-4">Fecha (ID-Order)</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="px-6 py-6"><div className="h-4 bg-slate-100 rounded"></div></td>
                  </tr>
                ))
              ) : payments.map(pay => (
                <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">#RES-{pay.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/patients/${pay.patient_id}`} className="text-sm font-bold text-slate-800 hover:text-teal-600 transition-colors">
                       {pay.patients?.first_name} {pay.patients?.last_name_paternal}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-sm font-black text-slate-900 tracking-tighter">S/ {pay.amount_paid}</span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-tighter">
                       {pay.payment_method}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                     Reg. #{pay.id}
                  </td>
                  <td className="px-6 py-4">
                     <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Completado
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Link href={`/patients/${pay.patient_id}`} className="p-2 text-slate-300 hover:text-teal-600 transition-colors">
                       <ChevronRight className="w-5 h-5" />
                     </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
