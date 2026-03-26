"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Phone, MapPin, Shield, Loader2 } from "lucide-react";

interface PatientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PatientForm({ onSuccess, onCancel }: PatientFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const patientData = {
      first_name: formData.get("first_name") as string,
      last_name_paternal: formData.get("last_name_paternal") as string,
      last_name_maternal: formData.get("last_name_maternal") as string,
      dni_number: formData.get("dni_number") as string,
      phone_primary: formData.get("phone_primary") as string,
      email: formData.get("email") as string,
      district: formData.get("district") as string,
      birth_date: formData.get("birth_date") || null,
    };

    try {
      const { error: insertError } = await supabase
        .from("patients")
        .insert([patientData]);

      if (insertError) throw insertError;
      onSuccess();
    } catch (err: any) {
      console.error("Error creating patient:", err);
      setError(err.message || "Error al crear el paciente");
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

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" /> Información Personal
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Nombres *</label>
            <input 
              name="first_name" 
              required 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              placeholder="Ej. Juan Alberto"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Apellido Paterno *</label>
              <input 
                name="last_name_paternal" 
                required 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                placeholder="Ej. Perez"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Apellido Materno</label>
              <input 
                name="last_name_maternal" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                placeholder="Ej. Garcia"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">DNI / Documento</label>
              <input 
                name="dni_number" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
                placeholder="8 dígitos"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Fecha Nacimiento</label>
              <input 
                name="birth_date" 
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Phone className="w-4 h-4" /> Contacto y Ubicación
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Teléfono Celular *</label>
            <input 
              name="phone_primary" 
              required 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              placeholder="999 999 999"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Email</label>
            <input 
              name="email" 
              type="email"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              placeholder="usuario@correo.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-tighter">Distrito</label>
            <input 
              name="district" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all text-sm"
              placeholder="Ej. Miraflores"
            />
          </div>
        </div>
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
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar Paciente"}
        </button>
      </div>
    </form>
  );
}
