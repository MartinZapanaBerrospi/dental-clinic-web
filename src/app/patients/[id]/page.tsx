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
          <h1 className="text-2xl font-bold tracking-tight">{patient.first_name} {patient.last_name_paternal}</h1>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            ID: {patient.id} • DNI: {patient.dni_number || '---'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Stats & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-100">
                {patient.first_name[0]}{patient.last_name_paternal[0]}
              </div>
              <div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md uppercase tracking-wider">Paciente Premium</span>
                <p className="mt-1 font-bold text-slate-900">{patient.first_name} {patient.last_name_paternal}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nacimiento</dt>
                  <dd className="font-medium text-slate-700">{patient.birth_date || 'N/A'}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Teléfono</dt>
                  <dd className="font-medium text-slate-700">{patient.phone_primary}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distrito</dt>
                  <dd className="font-medium text-slate-700">{patient.district || 'N/A'}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Info */}
          {guardian && (
            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Apoderado
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-bold">{guardian.first_name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Relación</dt>
                    <dd className="text-sm font-medium">{guardian.relationship}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">DNI</dt>
                    <dd className="text-sm font-medium">{guardian.dni_number || '---'}</dd>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-xs text-slate-400">Telf: {guardian.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clinical History & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            <div className="flex border-b border-slate-50 p-2 bg-slate-50/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-2xl transition-all",
                    activeTab === tab.id
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1">
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">Historial de Citas</h3>
                    <button className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-2 rounded-xl flex items-center gap-1 hover:bg-teal-100 transition-colors">
                      <Plus className="w-3 h-3" /> Nueva Cita
                    </button>
                  </div>
                  {appointments.length > 0 ? (
                    <div className="space-y-3">
                      {appointments.map((appt) => (
                        <div key={appt.id} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30 flex items-center justify-between group hover:border-teal-100 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center shadow-sm">
                              <span className="text-[10px] font-extrabold text-teal-600 leading-none">OCT</span>
                              <span className="text-lg font-black leading-none mt-0.5">24</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{appt.status || 'Scheduled'}</p>
                              <p className="text-xs text-slate-500">Dr(a). {appt.doctors?.first_name || 'Sin asignar'}</p>
                            </div>
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
                            appt.status === 'Attended' ? "bg-green-100 text-green-700" : "bg-teal-50 text-teal-600"
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
