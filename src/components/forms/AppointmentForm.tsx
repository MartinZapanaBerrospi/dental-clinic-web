"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Stethoscope, Clock, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AppointmentForm({ onSuccess, onCancel }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    const { data: docs } = await supabase.from("doctors").select("*");
    setDoctors(docs || []);
  }

  async function searchPatients(query: string) {
    setPatientSearch(query);
    if (query.length < 2) {
      setPatients([]);
      return;
    }
    const { data } = await supabase
      .from("patients")
      .select("id, first_name, last_name_paternal")
      .or(`first_name.ilike.%${query}%,last_name_paternal.ilike.%${query}%`)
      .limit(5);
    setPatients(data || []);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedPatient) {
      setError("Por favor seleccione un paciente");
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    
    // Combine date and time
    const scheduled_start = `${date}T${time}:00`;

    const appointmentData = {
      patient_id: selectedPatient.id,
      doctor_id: formData.get("doctor_id") ? parseInt(formData.get("doctor_id") as string) : null,
      scheduled_start,
      status: "Scheduled",
      notes: formData.get("notes") as string,
    };

    try {
      const { error: insertError } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (insertError) throw insertError;
      onSuccess();
    } catch (err: any) {
      console.error("Error creating appointment:", err);
      setError(err.message || "Error al agendar la cita");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Patient Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" /> Seleccionar Paciente
        </h3>
        
        {selectedPatient ? (
          <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                {selectedPatient.first_name[0]}{selectedPatient.last_name_paternal[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{selectedPatient.first_name} {selectedPatient.last_name_paternal}</p>
                <p className="text-xs text-teal-600">Paciente Seleccionado</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setSelectedPatient(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input 
              value={patientSearch}
              onChange={(e) => searchPatients(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              placeholder="Buscar paciente por nombre..."
            />
            {patients.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 overflow-hidden divide-y divide-slate-50">
                {patients.map(p => (
                  <button 
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatient(p)}
                    className="w-full p-4 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {p.first_name[0]}{p.last_name_paternal[0]}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{p.first_name} {p.last_name_paternal}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Date & Time */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Fecha y Horario
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Fecha *</label>
            <input 
              name="date" 
              type="date" 
              required 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Hora *</label>
            <input 
              name="time" 
              type="time" 
              required 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Doctor Selection */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Stethoscope className="w-4 h-4" /> Especialista
        </h3>
        <div>
          <select 
            name="doctor_id"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm appearance-none"
          >
            <option value="">Seleccionar Doctor (Opcional)</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>Dr(a). {d.first_name} {d.last_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-4 h-4" /> Notas de la Cita
        </h3>
        <textarea 
          name="notes"
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm resize-none"
          placeholder="Motivo de la consulta, observaciones..."
        />
      </div>

      <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
        <button 
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all border border-slate-200"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="flex-[2] px-6 py-3 bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-100 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agendar Cita"}
        </button>
      </div>
    </form>
  );
}
