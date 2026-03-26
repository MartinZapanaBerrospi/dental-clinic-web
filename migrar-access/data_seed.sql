-- PostgreSQL Data Seed (Migrated from Access CSVs)
-- Este script limpia las tablas existentes e inserta datos frescos.

-- 0. Cleanup (Manejo de estados previos)
TRUNCATE TABLE patient_guardians CASCADE;
TRUNCATE TABLE payments CASCADE;
TRUNCATE TABLE appointment_treatments CASCADE; -- Si existe
TRUNCATE TABLE patient_treatments CASCADE;
TRUNCATE TABLE appointments CASCADE;
TRUNCATE TABLE patients CASCADE;
TRUNCATE TABLE doctors CASCADE;
TRUNCATE TABLE treatments CASCADE;

-- Table: doctors
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (1, 'Christian William', 'Chavez', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (2, 'Cynthia Paola', 'Salazar', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (3, 'Morella', 'Mejiaz', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (4, 'Jennifer Jessenia', 'Encinas', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (5, 'Jose Octavio', 'Rincon', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (6, 'Erika Yaneth', 'Liviac', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (7, 'Luis Alberto', 'Maldonado', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (8, 'Junior Alfredo', 'Bermejo', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (9, 'Danny Estuardo', 'Quevedo', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (10, 'Christian Jesus', 'Balarezo', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (11, 'Veronica', 'Sernaque', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (12, 'Yara', 'Collantes', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (13, 'Ronald', 'Chirinos', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (14, 'Julio', 'Gonzales', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (15, 'Xiomara', 'Perez', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (16, 'Massiel', 'Salazar2', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (17, 'Ronald', 'Montoya', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (18, 'Carla', 'Flores', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (19, 'MEDICAL DENT', 'MEDICAL', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (20, 'Carlos', 'febres', 'terceras molares, implantes', NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (21, 'Diego', 'Quispe', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (22, 'Kynthia', 'Gamboa', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO doctors (id, first_name, last_name, specialty, cop_number) VALUES (23, 'Carla', 'Vallejo', NULL, NULL) ON CONFLICT DO NOTHING;

-- Table: patients
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1544, 'MASHIRO', 'SAYAS', 'RAMOS', '92913791.0', '2022-05-26', '924289983.0', NULL, NULL, 'LINCE', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1545, 'MARCIO', 'HOLGUIN', 'FLORES', '78475697.0', '2014-02-07', '993475318.0', NULL, NULL, 'LINCE', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1546, 'JEISER OMAR', 'PEREZ', 'VILLOSLADA', '47879040.0', NULL, '952494789.0', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1547, 'Giulio', 'Holguin', 'Flores', '77442325.0', '2011-11-04', '993475318', 'gisela.informes@gmail.com', NULL, 'lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1548, 'Nilton', 'Garcia', 'Rosales', '70448599.0', '2004-09-06', '929742803', 'nilton-garcia@outlook.com', NULL, 'lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1549, 'Alessa valentina', 'Diaz', 'Sanchez', '93334097.0', '2023-04-05', NULL, NULL, NULL, 'LINCE', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1550, 'Alessa valentina', 'Diaz', 'Sanchez', NULL, NULL, NULL, NULL, NULL, 'LINCE', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1551, 'Alessandra', 'Mejia', NULL, NULL, '2024-09-26', NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1552, 'Ingre', 'Haro', NULL, NULL, '1985-08-25', NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1553, 'Raul Leoncio', 'Alarcon', 'Custodio', '41123012.0', '1981-10-26', '946582667', NULL, NULL, 'rimac', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1554, 'Jane johana', 'Flores', 'osco', '45702656.0', '1988-08-17', '937550977', 'johannafo178@gmail.com', NULL, 'Lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1555, 'nuevo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1556, 'luis alberto', 'ortega', 'pernia', '41837386.0', '1983-04-04', '991209972', 'luisortegapernia@gmail.com', NULL, 'lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1557, 'yanfen', 'Hu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1558, 'Cayetana', 'Ortega', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1559, 'Nicole', 'cao', 'cao', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1560, 'Tracy Romina', 'Mori', 'Chavez', NULL, '2006-09-20', '947419698', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1561, 'maria Cecilia', 'lazo', NULL, '47514475.0', '1992-08-07', '961819662', NULL, NULL, 'lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1562, 'scarlett nicole', 'lozano', 'damian', '72199664.0', '1995-08-14', '977147474', 'lscarlett25@gmail.com', NULL, 'lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1563, 'Evelyn Solange', 'Coloma', 'Ñayincopa', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1564, 'Fabian david', 'santi', 'layten', '91000112.0', '2018-10-04', NULL, NULL, NULL, 'la victoria', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1565, 'Fernando ray', 'Hidalgo', NULL, '41963792.0', '1983-08-16', '900425850', 'nanhos@gmail.com', NULL, 'cercado de lima', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1566, 'Maria Luisa', 'Delgado', 'Gutierre<', '6245443.0', '1955-03-08', '987577256', NULL, NULL, 'Lince', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1567, 'alejandro', 'silvestre', 'sanchez', NULL, NULL, '941022866', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1568, 'PAOLA', 'PEREZ', 'NUÑEZ', '76132653.0', NULL, '952431510', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1569, 'Adrián Matías', 'Medina', 'torrillo', '91822130.0', '2020-04-19', NULL, NULL, NULL, 'Lima', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1570, 'rusber', 'ruiz', 'rios', NULL, '2003-03-10', '916 094 495', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1571, 'Dianieli', 'Amasifuen', 'Amasifuen', NULL, '2006-07-31', NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1572, 'FERNANDO', 'NEYRA', 'quispe', '75255716.0', '2004-05-20', NULL, NULL, NULL, 'smp', NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1573, 'Renata', 'Guzman', 'eyes', NULL, NULL, '932114327', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1574, 'Gianna Valeria', 'Guerra', 'Machuca', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1575, 'CIRSTIAN BENJAMIN', 'IGREDA', 'REATEGUI', '45066455.0', '1988-05-01', '981 229 131', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1576, 'DAVID', 'OLIMAR', 'CAYAJANO', NULL, '2005-10-11', '918 495 511', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO patients (id, first_name, last_name_paternal, last_name_maternal, dni_number, birth_date, phone_primary, email, address, district, acquisition_channel) VALUES (1577, 'oscar', 'pino', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;

-- Table: patient_guardians
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1544, 'Aldana Ramos Meza', 'MAMA', '924289983', 'aldanaramosmeza21@gmail.com', '74888805.0');
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1547, 'Gisela Flores', 'MAMA', '9934755318', NULL, NULL);
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1549, 'Luzmila Sanchez Fernandez', 'MAMA', '955 304 960', 'luz.decoracion@gmail.com', '40036594.0');
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1551, 'Evelyn Casso Valderrama', 'MAMA', '986124080', 'eveccaso22@hotmail.com', '42956589.0');
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1564, 'Carla Layten Vera', 'MAMA', '997128344', 'carlalayten@gmail.com', '45812002.0');
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1569, 'Jose Luis Medina Huamanlazo', 'PAPA', '999333924', 'joseluismedina@gamil.com', '70206487.0');
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1572, 'eva quispe tito', 'MAMA', NULL, NULL, NULL);
INSERT INTO patient_guardians (patient_id, first_name, relationship, phone, email, dni_number) VALUES (1573, 'rayza', 'MAMA', NULL, NULL, NULL);

-- Table: treatments
INSERT INTO treatments (id, name, base_cost) VALUES (3, 'Endodoncia', 350.0) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (4, 'Exodoncia', 120.0) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (5, 'Blanqueamiento', 220.0) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (6, 'Destartraje', 140.0) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (7, 'Endodoncia Rotatorio', 320.0) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (8, 'Brackets', NULL) ON CONFLICT DO NOTHING;
INSERT INTO treatments (id, name, base_cost) VALUES (9, 'Curaciones', NULL) ON CONFLICT DO NOTHING;

-- Table: appointments
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6961, 1544, NULL, '2025-10-13 16:00:00', 'Attended', 'se le ofrecio el sabado 18 pero l adra no puede asistir') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6962, 1544, NULL, '2025-10-18 11:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6963, 1544, NULL, NULL, 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6974, 1545, NULL, '2025-10-16 15:00:00', 'Scheduled', 'se le escribe 17/01/26') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6975, 1546, NULL, '2025-10-18 11:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6977, 1547, NULL, '2025-10-22 17:30:00', 'Scheduled', 'evaluara la proforma con su esposo') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6982, 1548, NULL, '2025-10-22 18:00:00', 'Attended', 'posiblemnte para el 5 de noviembre, revisara proforma escrita que la dra le dio') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6984, 1544, NULL, '2025-10-24 8:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6985, 1549, 18, '2025-10-23 14:00:00', 'Attended', 'consultara con su esposo por la proforma, puede en las mañanas (debido a la sedacion)/ se le escribe 17/01/26') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6986, 1550, NULL, '2025-10-23 14:00:00', 'Attended', 'consultara con su esposo por la proforma, puede en las mañanas (debido a la sedacion)') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6987, 1551, 18, '2025-10-23 18:10:00', 'Attended', 'para fluor, que termine de salir las muelitas') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6988, 1551, NULL, '2025-12-18 00:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (6990, 1544, NULL, '2025-10-27 8:00:00', 'Attended', 'terminos sedacion, curaciones, limpieza, fluor barnis') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7008, 1552, NULL, '2025-11-04 19:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7010, 1553, 18, '2025-11-06 18:00:00', 'Attended', 'para cambio de amalgamas se le dijo 150 c/u y curaciones desde 60 soles') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7032, 1554, NULL, '2025-11-13 11:00:00', 'Attended', 'vera sus horarios/ se le escribio 20/01/26') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7036, 1555, 22, '2025-11-18 18:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7044, 1556, 22, '2025-11-22 16:30:00', 'Attended', 'se comunicara para las curaciones pendientes') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7064, 1557, 18, '2025-11-27 17:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7065, 1557, 22, '2025-12-02 17:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7068, 1558, 18, '2025-11-27 19:15:00', 'Attended', 'en mayo 2026') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7070, 1559, 2, '2025-11-29 14:30:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7073, 1560, 22, '2025-12-02 15:00:00', 'Attended', 'se le escribio 29/01/26') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7074, 1557, NULL, '2025-12-04 14:00:00', 'No Show', 'estaba reesfriada, pidio reprogramar') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7088, 1561, NULL, '2025-12-12 16:00:00', 'Attended', 'para extraccion de tercera molar, curaciones, limpieza') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7107, 1559, NULL, '2025-12-22 11:00:00', 'No Show', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7111, 1559, NULL, '2025-12-23 10:30:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7113, 1562, 20, '2025-12-27 10:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7146, 1563, 23, '2026-01-20 10:00:00', 'Attended', 'para endodoncia, se le nevio rx al dr quispe y el dr debe confirmar horario disponible, quispe disponible lunes tarde.') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7150, 1564, 23, '2026-01-20 19:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7151, 1564, 23, '2026-01-24 16:30:00', 'Cancelled', 'fluor barniz falta') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7181, 1565, NULL, '2026-01-30 18:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7183, 1565, NULL, '2026-02-06 17:30:00', 'Scheduled', 'para extraccion de terceras molares') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7186, 1566, NULL, '2026-02-04 17:00:00', 'Attended', 'para curacines rstantes') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7194, 1567, NULL, '2026-02-10 14:00:00', 'No Show', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7210, 1568, NULL, '2026-02-13 18:17:00', 'Attended', 'LUEGO DE TOMARSE PANORAMICA Y QUE SU HIJA TERMINE EEELLA EMPEZARA ORTODONCIA') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7212, 1569, NULL, '2026-02-18 19:00:00', 'Attended', 'luego de primera cita') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7213, 1570, NULL, '2026-02-19 17:00:00', 'No Show', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7214, 1571, NULL, '2026-02-18 16:00:00', 'No Show', 'no asistio a primera cita') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7218, 1569, 2, '2026-02-25 19:00:00', 'Scheduled', 'PIDIO REPROGRAMAR, mama no podria traerlo a la cita, luego papa no responde') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7222, 1557, 23, '2026-02-19 15:44:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7227, 1568, NULL, '2026-02-20 18:45:00', 'Scheduled', 'no se atendio por falta de hora, sera para la semana del 23 de febrero/ ortodoncia/ ya tiene su panoramica') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7235, 1570, NULL, '2026-02-21 14:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7238, 1557, 23, '2026-02-21 10:30:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7241, 1572, 23, '2026-02-24 15:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7242, 1572, NULL, '2026-02-27 16:00:00', 'No Show', '(Hijo de Eva Quispe)solo no llego, no habia confirmado para ver lo de su ortodoncia, ya enviaron su panoramica') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7261, 1570, 23, '2026-03-03 17:00:00', 'Attended', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7262, 1570, NULL, '2026-03-13 18:00:00', 'Scheduled', 'para evalaucion ortodoncia') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7264, 1573, NULL, '2026-03-04 16:30:00', 'No Show', 'de provincia, solo queria curacion que se le salio a su hija') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7266, 1574, NULL, '2026-03-04 19:30:00', 'Scheduled', 'no vino a primera cita, citar viernes o miercoles') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7284, 1557, 23, '2026-03-19 11:00:00', 'Attended', 'vino esta vez por que se le salio la ultima curacion que se le hizo, no se le cobro') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7287, 1575, 23, '2026-03-19 10:00:00', 'Attended', 'curaciones, restos, ortodoncia') ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7288, 1576, NULL, '2026-03-19 15:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7297, 1572, NULL, '2026-03-21 17:00:00', 'Scheduled', NULL) ON CONFLICT DO NOTHING;
INSERT INTO appointments (id, patient_id, doctor_id, scheduled_start, status, notes) VALUES (7300, 1577, NULL, '2026-03-23 11:00:00', 'Scheduled', 'esperando su radigorafi panoramica') ON CONFLICT DO NOTHING;

-- Table: payments
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4832, 1545, 30.0, 'Bank Transfer', 'CONSULTA') ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4839, 1547, 30.0, 'Cash', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4842, 1548, 0.0, 'Cash', 'evaluacion gratuita para seguir ortodoncia') ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4843, 1549, 30.0, 'Cash', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4844, 1550, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4845, 1551, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4846, 1544, 200.0, 'Yape', 'adelanto (de 500) por sedacion con oxido nitroso') ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4847, 1544, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4851, 1544, 1170.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4872, 1553, 246.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4880, 1554, 90.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4884, 1555, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4891, 1556, 270.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4900, 1557, 0.0, 'Other', 'cita de evaluacion') ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4903, 1558, 40.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4907, 1559, 180.0, 'Cash', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4909, 1560, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4910, 1557, 185.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4914, 1561, 30.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4934, 1559, 135.0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4935, 1562, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4948, 1563, 0, 'Other', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4950, 1564, 100.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4973, 1565, 150.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4977, 1566, 215.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4978, 1566, 180.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4982, 1565, 210.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4993, 1568, 68.0, 'Visa', 'RADIOGRAFIA PANORAMICA') ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (4998, 1569, 180.0, 'Yape', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5002, 1557, 100.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5012, 1557, 30.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5014, 1572, 180.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5025, 1570, 100.0, 'Yape', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5026, 1570, 20.0, 'Cash', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5040, 1575, 120.0, 'Visa', NULL) ON CONFLICT DO NOTHING;
INSERT INTO payments (id, patient_id, amount_paid, payment_method, notes) VALUES (5041, 1557, 0.0, 'Visa', 'se le volvio a curar 4.6 que se le salio.') ON CONFLICT DO NOTHING;

-- Reset Sequences
SELECT setval('doctors_id_seq', COALESCE((SELECT MAX(id)+1 FROM doctors), 1), false);
SELECT setval('patients_id_seq', COALESCE((SELECT MAX(id)+1 FROM patients), 1), false);
SELECT setval('appointments_id_seq', COALESCE((SELECT MAX(id)+1 FROM appointments), 1), false);
SELECT setval('treatments_id_seq', COALESCE((SELECT MAX(id)+1 FROM treatments), 1), false);
SELECT setval('payments_id_seq', COALESCE((SELECT MAX(id)+1 FROM payments), 1), false);
