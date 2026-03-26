import pandas as pd
import numpy as np
import os
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_DIR = os.path.join(BASE_DIR, "csv_export")
OUTPUT_SQL = os.path.join(BASE_DIR, "data_seed.sql")

def clean_val(val):
    if pd.isna(val):
        return "NULL"
    if isinstance(val, (int, float)) and math.isnan(val):
        return "NULL"
    val = str(val).strip()
    if val == "" or val.upper() == "NULL":
        return "NULL"
    # Scape single quotes for SQL
    val = val.replace("'", "''")
    return f"'{val}'"

def main():
    print(f"Reading CSVs from {CSV_DIR}...")
    
    with open(OUTPUT_SQL, "w", encoding="utf-8") as out:
        out.write("-- PostgreSQL Data Seed (Migrated from Access CSVs)\n\n")

        # ------------------- 1. Doctors -------------------
        print("Transforming Doctors...")
        df_docs = pd.read_csv(os.path.join(CSV_DIR, "Doctores.csv"))
        out.write("-- Table: doctors\n")
        for _, row in df_docs.iterrows():
            doc_id = row['Id_Doctor']
            fname = clean_val(row.get('Nombres'))
            lname = clean_val(row.get('Apellido Paterno'))
            esp = clean_val(row.get('Especialidad'))
            cop = clean_val(row.get('COP'))
            if fname != "NULL" and doc_id != 0:
                out.write(f"INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES ({doc_id}, {fname}, {lname}, {esp}, {cop}) ON CONFLICT DO NOTHING;\n")
        out.write("\n")

        # ------------------- 2. Patients & Guardians -------------------
        print("Transforming Patients...")
        df_patients = pd.read_csv(os.path.join(CSV_DIR, "Pacientes.csv"))
        df_patients.replace({"False": "0", "True": "1"}, inplace=True)
        
        # --- Deduplication Logic for Patients ---
        # Sort by Id_Paciente assuming newer IDs are more recently updated
        df_patients.sort_values('Id_Paciente', inplace=True)
        
        # Clean DNI column to use as primary duplicate check
        df_patients['DNI_clean'] = df_patients['DNI'].fillna('').astype(str).str.strip()
        df_patients['DNI_clean'] = df_patients['DNI_clean'].replace({'nan': '', 'None': '', '0': ''})
        
        # Drop duplicated DNIs (keeping the most recent)
        df_pat_with_dni = df_patients[df_patients['DNI_clean'] != ''].drop_duplicates(subset=['DNI_clean'], keep='last')
        df_pat_without_dni = df_patients[df_patients['DNI_clean'] == '']
        df_patients = pd.concat([df_pat_with_dni, df_pat_without_dni])
        
        # Drop duplicated Full Names (keeping the most recent) to catch patients without DNI registered twice
        df_patients['FullName'] = (df_patients['Nombres'].fillna('').astype(str).str.strip() + " " + df_patients['ApellidoPaterno'].fillna('').astype(str).str.strip()).str.lower()
        df_patients.drop_duplicates(subset=['FullName'], keep='last', inplace=True)
        # ----------------------------------------

        out.write("-- Table: patients\n")
        # To accumulate guardians
        guardians = []
        
        for _, row in df_patients.iterrows():
            pat_id = row['Id_Paciente']
            if pat_id == 0 or pd.isna(pat_id):
                continue
            
            fname = clean_val(row.get('Nombres'))
            lname1 = clean_val(row.get('ApellidoPaterno'))
            lname2 = clean_val(row.get('ApellidoMaterno'))
            dni = clean_val(row.get('DNI'))
            
            # Format date (Access dates usually come as 'dd/MM/yyyy hh:mm:ss' or 'MM/dd/yyyy' in CSV)
            raw_bdate = str(row.get('Fechanacimiento')).split(' ')[0]
            bdate = clean_val(raw_bdate) if '/' in raw_bdate or '-' in raw_bdate else "NULL"
            if bdate != "NULL" and '/' in raw_bdate:
                # Convert from dd/mm/yyyy to yyyy-mm-dd roughly
                parts = raw_bdate.split('/')
                if len(parts) == 3:
                    bdate = f"'{parts[2]}-{parts[1]}-{parts[0]}'"

            phone1 = clean_val(row.get('Celular'))
            if phone1 == "NULL": phone1 = clean_val(row.get('Telefono'))
            email = clean_val(row.get('Correo Electronico'))
            address = clean_val(row.get('Direccion'))
            district = clean_val(row.get('Distrito'))
            channel = clean_val(row.get('Como llego al consultorio'))

            out.write(f"INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES ({pat_id}, {fname}, {lname1}, {lname2}, {dni}, {bdate}, {phone1}, {email}, {address}, {district}, {channel}) ON CONFLICT DO NOTHING;\n")
            
            # Collect Apoderado1
            apod1_name = row.get('Apoderado1')
            if pd.notna(apod1_name) and str(apod1_name).strip():
                guardians.append({
                    'patient_id': pat_id,
                    'fname': clean_val(apod1_name),
                    'rel': clean_val(row.get('TipoApod1')),
                    'phone': clean_val(row.get('TelfApod1')),
                    'email': clean_val(row.get('emailapod1')),
                    'dni': clean_val(row.get('DNIapod1'))
                })
        out.write("\n")
        
        out.write("-- Table: patient_guardians\n")
        for g in guardians:
            out.write(f"INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES ({g['patient_id']}, {g['fname']}, {g['rel']}, {g['phone']}, {g['email']}, {g['dni']});\n")
        out.write("\n")

        # ------------------- 3. Treatments -------------------
        print("Transforming Treatments...")
        try:
            df_treats = pd.read_csv(os.path.join(CSV_DIR, "Tratamientos.csv"))
            out.write("-- Table: treatments\n")
            for _, row in df_treats.iterrows():
                tr_id = row['Id_Tratamiento']
                name = clean_val(row.get('Nombre tratamiento'))
                cost = row.get('Costo Lince')
                # clean cost
                if pd.isna(cost): cost = "NULL"
                else:
                    try: cost = float(str(cost).replace(',', '.'))
                    except: cost = "NULL"
                
                if name != "NULL" and pd.notna(tr_id):
                    out.write(f"INSERT INTO treatments (id, name, base_cost) VALUES ({tr_id}, {name}, {cost}) ON CONFLICT DO NOTHING;\n")
            out.write("\n")
        except:
            print("Tratamientos.csv not available or empty")

        # ------------------- 4. Appointments -------------------
        print("Transforming Appointments...")
        try:
            df_appts = pd.read_csv(os.path.join(CSV_DIR, "Citas.csv"))
            
            # --- Deduplicate Appointments ---
            # Drops duplicates where the same patient was scheduled on the exact same date and time
            df_appts.sort_values('Id_cita', inplace=True)
            df_appts.drop_duplicates(subset=['id_paciente', 'Fecha_cita', 'Hora_cita'], keep='last', inplace=True)
            # --------------------------------
            
            out.write("-- Table: appointments\n")
            for _, row in df_appts.iterrows():
                appt_id = row['Id_cita']
                pat_id = row.get('id_paciente')
                if pd.isna(pat_id): continue # skip orphan appointments
                
                # Transform Estado -> StatusEnum
                st = str(row.get('Estado')).strip()
                status = "Scheduled"
                if "Asistió" in st: status = "Attended"
                elif "No asistió" in st: status = "No Show"
                elif "Cancel" in st: status = "Cancelled"
                
                notes = clean_val(row.get('Observaciones_cita'))
                
                # Date logic
                dt_raw = row.get('Fecha_cita')
                dt = str(dt_raw).split(' ')[0]
                tm = str(row.get('Hora_cita'))
                
                if pd.isna(dt_raw) or dt == "nan" or dt == "" or dt == "None":
                    s_time = "NULL"
                else:
                    if "/" in dt:
                        p = dt.split('/')
                        if len(p) == 3: dt = f"{p[2]}-{p[1]}-{p[0]}"
                    
                    if pd.notna(tm) and tm != "" and tm != "nan":
                        # Time often comes as "30/12/1899 16:00:00" from Access
                        if " " in tm: tm = tm.split(' ')[1]
                        s_time = f"'{dt} {tm}'"
                    else:
                        s_time = f"'{dt} 00:00:00'"
                    
                out.write(f"INSERT INTO appointments (id, patient_id, scheduled_start, status, notes) VALUES ({appt_id}, {pat_id}, {s_time}, '{status}', {notes}) ON CONFLICT DO NOTHING;\n")
            out.write("\n")
        except Exception as e:
            print(f"Error Appointments: {e}")

        # ------------------- 5. Payments -------------------
        print("Transforming Payments...")
        try:
            df_pay = pd.read_csv(os.path.join(CSV_DIR, "Procesos.csv"))
            out.write("-- Table: payments\n")
            for _, row in df_pay.iterrows():
                pay_id = row['id_procesos']
                pat_id = row.get('Id_paciente')
                if pd.isna(pat_id): continue
                
                amount = row.get('Pago')
                if pd.isna(amount): amount = "0"
                else: 
                    try: amount = float(str(amount).replace(',', '.'))
                    except: amount = "0"
                    
                method = str(row.get('Forma de pago')).strip()
                if method.lower() == "efectivo": method = "Cash"
                elif method.lower() == "visa": method = "Visa"
                elif method.lower() == "yape": method = "Yape"
                elif method.lower() == "transferencia": method = "Bank Transfer"
                else: method = "Other"
                
                notes = clean_val(row.get('Observaciones'))
                out.write(f"INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES ({pay_id}, {pat_id}, {amount}, '{method}', {notes}) ON CONFLICT DO NOTHING;\n")
            out.write("\n")
        except Exception as e:
            print(f"Error Payments: {e}")

        # Fix sequences using coalesce to prevent ID collisions on new inserts
        out.write("-- Reset Sequences\n")
        out.write("SELECT setval('doctors_id_seq', COALESCE((SELECT MAX(id)+1 FROM doctors), 1), false);\n")
        out.write("SELECT setval('patients_id_seq', COALESCE((SELECT MAX(id)+1 FROM patients), 1), false);\n")
        out.write("SELECT setval('appointments_id_seq', COALESCE((SELECT MAX(id)+1 FROM appointments), 1), false);\n")
        out.write("SELECT setval('treatments_id_seq', COALESCE((SELECT MAX(id)+1 FROM treatments), 1), false);\n")
        out.write("SELECT setval('payments_id_seq', COALESCE((SELECT MAX(id)+1 FROM payments), 1), false);\n")

    print(f"Done! Created {OUTPUT_SQL}")

if __name__ == "__main__":
    main()
