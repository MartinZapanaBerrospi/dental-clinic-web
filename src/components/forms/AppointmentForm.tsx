"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Stethoscope, Clock, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];

export default function AppointmentForm({ onSuccess, onCancel }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [availability, setAvailability] = useState<{status: 'idle' | 'checking' | 'available' | 'conflict', message?: string}>({status: 'idle'});

  const [formState, setFormState] = useState({
    doctor_id: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (formState.doctor_id && formState.date && formState.time) {
      checkAvailability();
    }
  }, [formState]);

  // Derived available time slots based on selected date
  const availableTimeSlots = TIME_SLOTS.filter(slot => {
    const today = new Date().toISOString().split("T")[0];
    if (formState.date !== today) return true;

    const [slotHour, slotMin] = slot.split(":").map(Number);
    const now = new Date();
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();

    if (slotHour > nowHour) return true;
    if (slotHour === nowHour && slotMin > nowMin) return true;
    return false;
  });

  // Reset time if selected time is no longer available (e.g. changing date to today)
  useEffect(() => {
    if (formState.time && !availableTimeSlots.includes(formState.time)) {
      setFormState(prev => ({ ...prev, time: "" }));
    }
  }, [formState.date, availableTimeSlots]);

  async function checkAvailability() {
    setAvailability({ status: 'checking' });
    const scheduledStart = `${formState.date}T${formState.time}:00`;
    
    // Convert current selected time to a 30-min window check
    const startTime = new Date(scheduledStart);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 mins later
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('id')
        .eq('doctor_id', formState.doctor_id)
        .gte('scheduled_start', startTime.toISOString())
        .lt('scheduled_start', endTime.toISOString())
        .neq('status', 'Cancelled');

      if (error) throw error;

      if (data && data.length > 0) {
        setAvailability({ 
          status: 'conflict', 
          message: 'El doctor ya tiene una cita en este horario.' 
        });
      } else {
        setAvailability({ status: 'available', message: 'Horario disponible' });
      }
    } catch (err) {
      console.error("Availability check error:", err);
      setAvailability({ status: 'idle' });
    }
  }

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
      .select("id, first_name, last_name_paternal, last_name_maternal")
      .or(`first_name.ilike.%${query}%,last_name_paternal.ilike.%${query}%,last_name_maternal.ilike.%${query}%`)
      .limit(5);
    setPatients(data || []);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedPatient) {
      setError("Por favor seleccione un paciente");
      return;
    }
    if (availability.status === 'conflict') {
      setError("No se puede agendar: el doctor tiene un conflicto de horario.");
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
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" /> Seleccionar Paciente *
        </h3>
        
        {selectedPatient ? (
          <div className="flex items-center justify-between p-5 bg-teal-50 border border-teal-200 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                {selectedPatient.first_name[0]}{selectedPatient.last_name_paternal[0]}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  {selectedPatient.first_name} {selectedPatient.last_name_paternal} {selectedPatient.last_name_maternal}
                </p>
                <p className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">PACIENTE SELECCIONADO</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setSelectedPatient(null)}
              className="px-3 py-1.5 text-[10px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              value={patientSearch}
              onChange={(e) => searchPatients(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm font-bold text-slate-900 uppercase placeholder:text-slate-400"
              placeholder="BUSCAR PACIENTE POR NOMBRE..."
            />
            {patients.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-[2rem] shadow-2xl z-20 overflow-hidden divide-y divide-slate-100 p-2">
                {patients.map(p => (
                  <button 
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatient(p)}
                    className="w-full p-4 text-left hover:bg-slate-50 flex items-center gap-4 transition-all rounded-2xl group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      {p.first_name[0]}{p.last_name_paternal[0]}
                    </div>
                    <span className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-teal-700">
                      {p.first_name} {p.last_name_paternal} {p.last_name_maternal}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Date & Time */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Fecha y Horario
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-tighter">Fecha *</label>
            <input 
              name="date" 
              type="date" 
              required 
              min={new Date().toISOString().split("T")[0]}
              value={formState.date}
              onChange={(e) => setFormState(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm font-bold text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-tighter">Hora *</label>
            <select 
              name="time" 
              required 
              value={formState.time}
              onChange={(e) => setFormState(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm font-bold text-slate-900 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_12px_center] bg-no-repeat"
            >
              <option value="">HORARIO</option>
              {availableTimeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Selection */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Stethoscope className="w-4 h-4" /> Especialista *
        </h3>
        <div className="space-y-3">
          <select 
            name="doctor_id"
            required
            value={formState.doctor_id}
            onChange={(e) => setFormState(prev => ({ ...prev, doctor_id: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm appearance-none font-bold text-slate-900 uppercase cursor-pointer"
          >
            <option value="">Seleccionar doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>DR(A). {d.first_name} {d.last_name}</option>
            ))}
          </select>

          {availability.status !== 'idle' && (
            <div className={cn(
              "p-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border animate-in fade-in slide-in-from-top-1",
              availability.status === 'checking' ? "bg-slate-50 text-slate-500 border-slate-200" :
              availability.status === 'available' ? "bg-green-50 text-green-700 border-green-100" :
              "bg-red-50 text-red-700 border-red-100"
            )}>
              {availability.status === 'checking' && <Loader2 className="w-3 h-3 animate-spin" />}
              {availability.message || 'Verificando disponibilidad...'}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-4 h-4" /> Notas de la Cita
        </h3>
        <textarea 
          name="notes"
          rows={3}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm font-bold text-slate-900 resize-none placeholder:text-slate-400"
          placeholder="MOTIVO DE LA CONSULTA, OBSERVACIONES..."
        />
      </div>

      <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
        <button 
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-4 text-xs font-black text-slate-600 hover:bg-slate-50 rounded-2xl transition-all border border-slate-200 uppercase tracking-widest"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="flex-[2] px-6 py-4 bg-teal-600 text-white font-black rounded-2xl shadow-xl shadow-teal-100 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agendar Cita"}
        </button>
      </div>
    </form>
  );
}
