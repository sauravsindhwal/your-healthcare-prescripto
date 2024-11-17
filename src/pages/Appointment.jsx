import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)
  const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed','Thru', 'Fri', 'Sat']

  const [doctorInfo, setDoctorInfo] = useState(null)
  const [doctorSlot, setDoctorSlot] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDoctorInfo = ()=>{
    const infoDoctor = doctors.find(info=>info._id===docId)
    setDoctorInfo(infoDoctor)   
  }
  
  const getAvailableSlot = async () => {
    setDoctorSlot([]);
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 30);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }
  
      let timeSlot = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlot.push({ dateTime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      if (timeSlot.length) {
        setDoctorSlot(prev => [...prev, timeSlot]);
      }
    }
  }
  

  useEffect(()=>{
console.log(doctorSlot);

  }, [doctorSlot])

  useEffect(()=>{
fetchDoctorInfo()
  }, [docId, doctors])

  useEffect(()=>{
    getAvailableSlot()
}, [doctorInfo])

  return doctorInfo&& (
    <div>
      {/* doctor---details */}
        <div className='flex flex-col sm:flex-row gap-4'>
<div>
  <img className='bg-primary w-full sm:max-w-72] rounded-lg' src={doctorInfo.image} alt="" />
</div>

<div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
  {/* doctor--bio, name etc */}
  <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{doctorInfo.name} 
    <img className='w-5' src={assets.verified_icon} alt="" /></p>
  <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
<p>{doctorInfo.degree} - {doctorInfo.speciality}</p>
<button className='py-0.5 px-2 border text-xs rounded-full'>{doctorInfo.experience}</button>
  </div>
  {/* doctor---about */}
  <div>
    <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{doctorInfo.about}</p>
  </div>
  <p className='text-gray-500 font-medium mt-4'>Appointment fees: 
     <span className='text-gray-600'>${doctorInfo.fees}</span></p>
</div>
        </div>
  {/* Booking Slots */}
<div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
<p>Booking Slots</p>
<div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
  {
doctorSlot.length && doctorSlot.map((item, index)=>(
  <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
  ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
<p>{item[0] && daysofWeek[item[0].dateTime.getDay()]}</p>
<p>{item[0] && item[0].dateTime.getDate()}</p>
    </div>
))
  }
</div>

<div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
{
  doctorSlot.length && doctorSlot[slotIndex].map((item, i)=>(
<p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer rounded-full 
${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={i}>
  {item.time.toLowerCase()}
</p>
  ))
}
</div>
<button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>

</div>
<RelatedDoctors docId={docId} speciality={doctorInfo.speciality}/>

    </div>
  )
}

export default Appointment