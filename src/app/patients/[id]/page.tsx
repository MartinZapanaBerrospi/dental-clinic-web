"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  FileText, 
  Shield, 
  MapPin, 
  Phone, 
  Mail,
  User,
  Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PatientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [patient, setPatient] = useState<any>(null);
  const [guardian, setGuardian] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'treatments' | 'payments'>('appointments');

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  async function fetchPatientData() {
    try {
      setLoading(true);
      
      // Fetch Patient
      const { data: pat, error: patErr } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();
      if (patErr) throw patErr;
      setPatient(pat);

      // Fetch Guardian
      const { data: guard } = await supabase
        .from('patient_guardians')
        .select('*')
        .eq('patient_id', id)
        .single();
      setGuardian(guard);

      // Fetch Appointments
      const { data: appts } = await supabase
        .from('appointments')
        .select('*, doctors(first_name, last_name)')
        .eq('patient_id', id)
        .order('scheduled_start', { ascending: false });
      setAppointments(appts || []);

      // Fetch Payments
      const { data: pays } = await supabase
        .from('payments')
        .select('*')
        .eq('patient_id', id)
        .order('id', { ascending: false });
      setPayments(pays || []);

    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>;
  }

  if (!patient) {
    return <div className="p-8 text-center text-slate-500">Paciente no encontrado.</div>;
  }

  const tabs = [
    { id: 'appointments', name: 'Citas', icon: Calendar },
    { id: 'treatments', name: 'Tratamientos (Proforma)', icon: FileText },
    { id: 'payments', name: 'Pagos y Procesos', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/patients"
          className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black tracking-tighter uppercase text-slate-900">
            {patient.first_name} {patient.last_name_paternal} {patient.last_name_maternal}
          </h1>
          <p className="text-[10px] text-slate-600 flex items-center gap-2 font-bold uppercase tracking-widest">
            DNI: {patient.dni_number || '---'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Stats & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden p-8 space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-[1.5rem] bg-teal-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-teal-100">
                {patient.first_name[0]}{patient.last_name_paternal[0]}
              </div>
              <div className="flex-1">
                <p className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {patient.first_name} {patient.last_name_paternal} {patient.last_name_maternal}
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Nacimiento</dt>
                  <dd className="text-sm font-bold text-slate-800">
                    {patient.birth_date ? new Date(patient.birth_date + 'T12:00:00').toLocaleDateString('es-PE') : 'N/A'}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Teléfono</dt>
                  <dd className="text-sm font-bold text-slate-800">{patient.phone_primary}</dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Distrito</dt>
                  <dd className="text-sm font-bold text-slate-800 uppercase">{patient.district || 'N/A'}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Info */}
          {guardian && (
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-2xl shadow-slate-300">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-400" /> Apoderado
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-xl font-black uppercase tracking-tight">{guardian.first_name}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Relación</dt>
                    <dd className="text-sm font-bold text-slate-200 uppercase">{guardian.relationship}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-black">DNI</dt>
                    <dd className="text-sm font-bold text-slate-200 font-mono tracking-tighter">{guardian.dni_number || '---'}</dd>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clinical History & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col transition-all hover:shadow-md">
            <div className="flex border-b border-slate-50 p-3 bg-slate-50/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all",
                    activeTab === tab.id
                      ? "bg-white text-teal-700 shadow-sm border border-slate-100"
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-8 flex-1">
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Historial de Citas</h3>
                    <button className="text-[10px] font-black text-teal-800 bg-teal-50 px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-teal-100 transition-all border border-teal-100 uppercase tracking-widest active:scale-95">
                      <Plus className="w-3.5 h-3.5" /> Nueva Cita
                    </button>
                  </div>
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appt) => (
                        <div key={appt.id} className="p-5 rounded-3xl border border-slate-100 bg-white flex items-center justify-between group hover:border-teal-300 hover:shadow-lg hover:shadow-teal-50 transition-all cursor-default">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                              <span className="text-[10px] font-black uppercase leading-none mb-1">MAR</span>
                              <span className="text-xl font-black leading-none">26</span>
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 uppercase">{appt.status || 'PROGRAMADA'}</p>
                              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                                {appt.doctors ? `DR(A). ${appt.doctors.first_name} ${appt.doctors.last_name}` : 'SIN ASIGNAR'}
                              </p>
                            </div>
                          </div>
                          <span className={cn(
                            "text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border shadow-sm",
                            appt.status === 'Attended' ? "bg-green-600 text-white border-green-700" : "bg-teal-50 text-teal-700 border-teal-200"
                          )}>
                            {appt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-300">
                      <Calendar className="w-12 h-12 mb-2 opacity-20" />
                      <p className="text-sm italic">Sin citas registradas</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'treatments' && (
                <div className="h-64 flex flex-col items-center justify-center text-slate-300">
                  <FileText className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm italic">Módulo de tratamientos en desarrollo</p>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Transacciones y Procesos</h3>
                    <div className="flex gap-2">
                       <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Balance: S/ 0</span>
                    </div>
                  </div>
                  {payments.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                       <table className="w-full text-sm">
                          <thead className="bg-slate-50/50">
                            <tr>
                              <th className="px-4 py-3 text-left font-bold text-xs uppercase text-slate-400">Monto</th>
                              <th className="px-4 py-3 text-left font-bold text-xs uppercase text-slate-400">Método</th>
                              <th className="px-4 py-3 text-left font-bold text-xs uppercase text-slate-400">Notas</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {payments.map(pay => (
                              <tr key={pay.id}>
                                <td className="px-4 py-3 font-bold text-slate-900">S/ {pay.amount_paid}</td>
                                <td className="px-4 py-3"><span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">{pay.payment_method}</span></td>
                                <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-[200px]">{pay.notes || '---'}</td>
                              </tr>
                            ))}
                          </tbody>
                       </table>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-300">
                      <CreditCard className="w-12 h-12 mb-2 opacity-20" />
                      <p className="text-sm italic">Sin pagos registrados</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
