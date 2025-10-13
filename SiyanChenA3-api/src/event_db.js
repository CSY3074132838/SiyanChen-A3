import { pool } from './db.js';

export async function listEvents(){
  const [r]=await pool.query(`SELECT * FROM events ORDER BY start_time`);
  return r;
}
export async function getEventWithRegistrations(id){
  const [e]=await pool.query(`SELECT * FROM events WHERE id=?`,[id]);
  if(!e.length)return null;
  const [regs]=await pool.query(`SELECT * FROM registrations WHERE event_id=? ORDER BY registered_at DESC`,[id]);
  return {...e[0],registrations:regs};
}
export async function createEvent(ev){
  const [r]=await pool.query(`INSERT INTO events (org_id,category_id,title,city,venue,start_time,end_time,status)
    VALUES (1,1,?,?,?,?,?,?)`,
    [ev.title,ev.city,ev.venue,ev.start_time,ev.end_time,ev.status??'active']);
  return {id:r.insertId,...ev};
}
export async function updateEvent(id,ev){
  await pool.query(`UPDATE events SET title=?,city=?,venue=?,start_time=?,end_time=?,status=? WHERE id=?`,
    [ev.title,ev.city,ev.venue,ev.start_time,ev.end_time,ev.status,id]);
  return true;
}
export async function deleteEvent(id){
  const [[{cnt}]] = await pool.query(`SELECT COUNT(*) AS cnt FROM registrations WHERE event_id=?`,[id]);
  if(cnt>0){const e=new Error('Cannot delete event with existing registrations');e.code='HAS_REG';throw e;}
  await pool.query(`DELETE FROM events WHERE id=?`,[id]);
  return true;
}
export async function createRegistration(eventId,reg){
  try{
    const [r]=await pool.query(`INSERT INTO registrations (event_id,full_name,email,phone,tickets,notes)
    VALUES (?,?,?,?,?,?)`,[eventId,reg.full_name,reg.email,reg.phone,reg.tickets,reg.notes]);
    return {id:r.insertId,...reg};
  }catch(e){
    if(e.code==='ER_DUP_ENTRY'){const err=new Error('Already registered');err.code='DUP';throw err;}
    throw e;
  }
}
