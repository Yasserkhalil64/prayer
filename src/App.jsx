import { useEffect, useState } from "react"
import Prayer from "./component/prayer"

function App() {
  const [prayerTimes , setPrayerTimes]= useState({})
  const [dateTime , setDateTime]= useState("") 
  const [city , setCity]= useState("Cairo")  
  const cities = [
    {name : "القاهرة" , value :"Cairo"},
     {name : "الاسكندرية" , value :"Alexandria"},
      {name : "الجيزة" , value :"Giza"},
       {name : "اسوان" , value :"Aswan"},
        {name : "الاقصر" , value :"Luxor"},
         {name : "المنصورة" , value :"Mansoura"}
  ]
  
  useEffect(()=>{
    const fetchPrayertimes = async ()=>{
      try{
        const response = await fetch (` https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=XX`)
        const data_Prayer = await response.json()
        setPrayerTimes(data_Prayer.data.timings)
        setDateTime(data_Prayer.data.date.gregorian.date)
        console.log(data_Prayer.data.date.gregorian.date);
      } catch(error)
      {
        console.error(error)
      }
    }
    fetchPrayertimes()
  },[city])

  const formatTimes = (time)=>{
    if(!time){
      return"00:00";
    }
    
    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12;
    return`${hours}:${minutes < 10 ? "0" + minutes : minutes } ${perd}`
  }
    return (
<section>
  <div className="container">
    <div className="top_sec">
      <div className="city">
         <h3>المدينة</h3>
         <select name="" id="" onChange={(e)=>setCity(e.target.value)}>
          {cities.map((city_obj)=>(
            <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
          ))}
         </select>
      </div>
      <div className="date">
        <h3>التاريخ</h3>
        <h4>{dateTime}</h4>
      </div>
    </div>
    <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
    <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
    <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}/>
    <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
    <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/>
  </div>
</section>
  )
}

export default App
