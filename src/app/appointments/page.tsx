"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  User,
  MoreVertical,
  Filter,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SlideOver from "@/components/ui/SlideOver";
import AppointmentForm from "@/components/forms/AppointmentForm";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    const { data } = await supabase.from('doctors').select('*').order('last_name', { ascending: true });
    setDoctors(data || []);
  }

  async function fetchAppointments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*, patients(first_name, last_name_paternal, last_name_maternal), doctors(first_name, last_name, specialty)')
        .order('scheduled_start', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateSuccess = () => {
    setIsFormOpen(false);
    fetchAppointments();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Citas Médicas</h1>
          <p className="text-slate-500 mt-1">Calendario y lista de atenciones programadas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setView('calendar')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              view === 'calendar' ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            Calendario
          </button>
          <button 
            onClick={() => setView('table')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              view === 'table' ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            Lista
          </button>
        </div>
      </div>

      <SlideOver 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        title="Agendar Nueva Cita"
      >
        <AppointmentForm 
          onSuccess={handleCreateSuccess} 
          onCancel={() => setIsFormOpen(false)} 
        />
      </SlideOver>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px]">
        {view === 'table' ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button className="px-3 py-2 border-r border-slate-200 hover:bg-slate-50"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                   <button className="px-4 py-2 font-bold text-xs flex items-center gap-2">Marzo 2026 <CalendarIcon className="w-3 h-3 text-teal-600" /></button>
                   <button className="px-3 py-2 border-l border-slate-200 hover:bg-slate-50"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                </div>
                <select 
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all uppercase appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_8px_center] bg-no-repeat"
                >
                  <option value="all">TODOS LOS DOCTORES</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>DR(A). {d.first_name} {d.last_name}</option>
                  ))}
                </select>
                <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50">
                  <Filter className="w-3.5 h-3.5" /> Más Filtros
                </button>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Nueva Cita
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/30 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-50">
                    <th className="px-6 py-4">Fecha y Hora</th>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Especialista</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Notas</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    [...Array(6)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="px-6 py-8"><div className="h-4 bg-slate-50 rounded italic text-slate-300">Cargando...</div></td>
                      </tr>
                    ))
                  ) : appointments.filter(a => selectedDoctorId === 'all' || a.doctor_id?.toString() === selectedDoctorId).length > 0 ? (
                    appointments
                      .filter(a => selectedDoctorId === 'all' || a.doctor_id?.toString() === selectedDoctorId)
                      .map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                               <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-700">
                                  <span className="text-[10px] font-black leading-none uppercase">
                                    {new Date(appt.scheduled_start).toLocaleDateString('es-PE', { month: 'short' }).replace('.', '')}
                                  </span>
                                  <span className="text-lg font-bold">
                                    {new Date(appt.scheduled_start).getDate()}
                                  </span>
                               </div>
                             <div>
                               <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                 <Clock className="w-3.5 h-3.5 text-slate-400" />
                                 {appt.scheduled_start ? new Date(appt.scheduled_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}
                               </p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Link href={`/patients/${appt.patient_id}`} className="flex items-center gap-2 hover:text-teal-700 transition-colors group">
                             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                               {appt.patients?.first_name?.[0]}{appt.patients?.last_name_paternal?.[0]}
                             </div>
                             <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                               {appt.patients?.first_name} {appt.patients?.last_name_paternal} {appt.patients?.last_name_maternal}
                             </span>
                          </Link>
                        </td>
                        <td className="px-6 py-5">
                          {appt.doctors ? (
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-900 uppercase tracking-tight">DR(A). {appt.doctors.first_name} {appt.doctors.last_name}</span>
                              {appt.doctors.specialty && (
                                <span className="text-[10px] text-teal-700 font-black uppercase tracking-widest">{appt.doctors.specialty}</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-slate-500 font-bold italic uppercase">SIN ASIGNAR</span>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                            appt.status === 'Attended' ? "bg-green-600 text-white border-green-700" : 
                            appt.status === 'No Show' ? "bg-red-600 text-white border-red-700" :
                            "bg-teal-600 text-white border-teal-700"
                          )}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 max-w-[200px]">
                           <p className="text-xs text-slate-500 italic truncate">{appt.notes || '---'}</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                             <MoreVertical className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-300">
                           <CalendarIcon className="w-16 h-16 opacity-10" />
                           <p className="text-sm font-medium italic">No se encontraron citas para este periodo.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-20 flex flex-col items-center justify-center text-slate-300 h-96">
             <CalendarIcon className="w-16 h-16 opacity-20 mb-4" />
             <p className="text-lg font-bold text-slate-400">Vista de Calendario en desarrollo</p>
             <p className="text-sm italic mt-2">Próxima implementación: FullCalendar.js</p>
          </div>
        )}
      </div>
    </div>
  );
}
