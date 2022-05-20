import {City} from '../types/interfaces'
import {useEffect, useState, ChangeEvent} from 'react'
import {Link} from 'react-router-dom'
import { parse } from 'path'
import { Card } from 'react-bootstrap'
import {RiSunFill} from 'react-icons/ri'

const MainPage = () => {
    const [city,setCity]=useState<City | null>(null)
    const [query, setQuery] =useState('')


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
  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <div>
            <input style={{height: '30px'}} type='text' value={query} onChange={handleChange}/>
            <button style={{height: '35px', marginTop:'10px', marginBottom:'20px'}} type='button' onClick={fetchCity}><RiSunFill/></button>
        </div>

        <Card style={{ marginLeft:'50%', backgroundColor:'red', marginRight:'50%' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <h1>{city?.name}</h1>
                <Card.Text>
                <h3>Temperature:{(Number(city?.main.temp)-273.15).toFixed(2)}°C</h3>
                <h3>Humidity:{city?.main.humidity}%</h3>
                </Card.Text>
            </Card.Body>
        </Card>

    </div>
  )
}

export default MainPage