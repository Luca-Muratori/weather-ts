import {City} from '../types/interfaces'
import {useEffect, useState, ChangeEvent} from 'react'
import { Card } from 'react-bootstrap'
import {RiSunFill} from 'react-icons/ri'

const MainPage = () => {
    const [city,setCity]=useState<City | null>(null)
    const [query, setQuery] =useState('')
    const skyCondition=city?.weather.map(condition=>{return condition.main})


    useEffect(()=>{fetchCity()}, [])
    

    const handleChange=(e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    const fetchCity=async()=>{
        if(query){
            try{
                const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=a4c7833b67ff9054c8e8fb008fff98c4`)
                const data  = await response.json() as City
                setCity(data)
                console.log('data', data)
                console.log('cities',city)
            }catch(error){
                console.log(error)
            }
        }
    }
    console.log(city)

    const temp = parseInt((Number(city?.main.temp)-273.15).toFixed(2))

    console.table({ temp})
  return (
    <div  style={{display: 'flex',flexDirection: 'column',alignItems: 'center', width: '100%'}}>
        <div>
            <input style={{height: '30px'}} type='text' value={query} onChange={handleChange}/>
            <button style={{height: '35px', marginTop:'10px', marginBottom:'20px'}} type='button' onClick={fetchCity}><RiSunFill/></button>
        </div>
        {query?
            (   <Card  id='weatherCard' className={ temp >= 27 ? "warm" : "cold"  } style={{ }} >
                    <Card.Body>
                        <h1 style={{display:'flex', justifyContent:'center'}}>{city?.name}</h1>
                        <Card.Text>
                        <h3>Temperature: {temp}°C</h3>
                        <h3>Humidity: {city?.main.humidity}%</h3>
                        <h3>
                            Sky Condition:
                            {skyCondition}
                        </h3>
                        </Card.Text>
                    </Card.Body>
                </Card>)
        :( <div>Insert a city</div>)}

        
    </div>
  )
}

export default MainPage