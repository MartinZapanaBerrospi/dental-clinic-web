"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('last_name_paternal', { ascending: true })
        .limit(100);

      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPatients = patients.filter(p => 
    `${p.first_name || ''} ${p.last_name_paternal || ''} ${p.last_name_maternal || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.dni_number && p.dni_number.includes(searchTerm))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pacientes</h1>
          <p className="text-slate-500 mt-1">Gestiona y consulta la información de tus pacientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all shadow-sm shadow-teal-100 active:scale-95">
            <UserPlus className="w-4 h-4" />
            Nuevo Paciente
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all">
        <div className="p-4 border-b border-slate-50 flex flex-col gap-4 sm:flex-row sm:items-center bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o DNI..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Paciente</th>
                <th className="px-6 py-4">DNI</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Distrito</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-6 border-b border-slate-50">
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-teal-50/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                          {patient.first_name?.[0]}{patient.last_name_paternal?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{patient.first_name} {patient.last_name_paternal}</p>
                          <p className="text-xs text-slate-500 capitalize">{patient.last_name_maternal}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600 font-mono">{patient.dni_number || '---'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{patient.phone_primary}</p>
                      <p className="text-xs text-slate-400">{patient.email || 'Sin correo'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{patient.district || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-tighter border border-green-100">
                        Activo
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/patients/${patient.id}`}
                          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                    No se encontraron pacientes que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
          Showing {filteredPatients.length} of {patients.length} patients
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50">Anterior</button>
            <button disabled className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
