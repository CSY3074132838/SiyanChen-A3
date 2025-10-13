import {Router} from 'express';
import {createRegistration} from '../event_db.js';
const r=Router({mergeParams:true});
r.post('/',async(req,res)=>{
  try{
    const c=await createRegistration(req.params.id,req.body);
    res.status(201).json(c);
  }catch(e){
    if(e.code==='DUP')return res.status(409).json({error:e.message});
    throw e;
  }
});
export default r;
