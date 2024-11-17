import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState(
    {
      name: 'Edward Vincet',
      image: assets.profile_pic,
      email: 'edward_hotmail.com',
      phone: '+1 123 456 7890',
      address:{
        line1: '57th Cross, Richmond',
        line2: 'Circle, Church Road, London'
      },
      gender: 'male',
      dob: '20-10-1998'
    }
  )
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
        <img className='w-36 rounded' src={userData.image} alt="" />
     {
      isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name}
      onChange={e=>setUserData(prev => ({...prev, name:e.target.value}))}/>
      :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
     }
     <hr className='bg-zinc-400 h-[1px] border-none'/>
     <div>
     <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
     <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
      <p className='font-medium'>Email id:</p>
      <p className='text-blue-500'>{userData.email}</p>
      <p className='font-medium'>Phone:</p>
      {
      isEdit ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone}
      onChange={e=>setUserData(prev => ({...prev, phone:e.target.value}))}/>
      :<p className='text-blue-400'>{userData.phone}</p>
}

     <p className='font-medium'>Address:</p>
{

  isEdit ? <p><input className='bg-gray-50' type="text" value={userData.address.line1} 
    onChange={(e)=> setUserData(prev=>({...prev, address: {...prev.address, line1:e.target.value}}))}/>
 <br />
<input className='bg-gray-50' type="text" value={userData.address.line2}
onChange={(e)=> setUserData(prev => ({...prev, address: {...prev.address, line2:e.target.value}}))} /></p>
  :<p className='text-gray-500'>{userData.address.line1}<br />{userData.address.line2}</p>
}

     </div>
     </div>

     <div>
      <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p>Gender</p>
  
      {
        isEdit ? <select value={userData.gender}
        onClick={(e)=>setUserData(prev => ({...prev, gender:e.target.value}))}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p>{userData.gender}</p>
      }
      <p>Birthday</p>
      {
        isEdit ? <input type="date" value={userData.dob}
        onChange={(e)=>setUserData(prev => ({...prev, dob:e.target.value}))}
        />
        : <p>{userData.dob}</p>
      }
    
          </div>

     </div>
   
   <div className='mt-10'>
   {
      isEdit ? <button className='border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(false)}>Save Information</button>
      : <button className='border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
     }
   </div>
    </div>
  )
}

export default MyProfile