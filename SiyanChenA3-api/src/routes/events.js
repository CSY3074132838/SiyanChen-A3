import {Router} from 'express';
import {listEvents,getEventWithRegistrations,createEvent,updateEvent,deleteEvent} from '../event_db.js';
const r=Router();

r.get('/',async(req,res)=>res.json(await listEvents()));
r.get('/:id',async(req,res)=>{
  const ev=await getEventWithRegistrations(req.params.id);
  if(!ev)return res.status(404).json({error:'Not found'});
  res.json(ev);
});
r.post('/',async(req,res)=>res.status(201).json(await createEvent(req.body)));
r.put('/:id',async(req,res)=>res.json(await updateEvent(req.params.id,req.body)));
r.delete('/:id',async(req,res)=>{
  try{await deleteEvent(req.params.id);res.json({ok:true});}
  catch(e){if(e.code==='HAS_REG')return res.status(409).json({error:e.message});throw e;}
});
export default r;
