import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'

const FilterPage = () => {

    const {users, setUsers, filteredUsers, setFilteredUsers, setShowToolbar} = useContext(MainContext)

    const [age, setAge] = useState(35)
    const [gender, setGender] = useState(null)
    // const [city, setCity] = useState(null)
   
    const nav = useNavigate()

    const selectCityRef = useRef()
    const selectAgeRef = useRef()

    function selectAge() {
        const ageValue = selectAgeRef.current.value
        setAge(ageValue)
    }        
   
    function saveFilter() {
        const city = selectCityRef.current.value
        // setCity(miestas)
       console.log(city, users);
        if(city){            
            let cityFilter = users.filter(x => x.city === city)
            setUsers(cityFilter)   
            console.log(cityFilter, users);
        }
        
        if(gender){
            let genderFilter = users.filter(x => x.gender === gender)            
            setUsers(genderFilter)
            console.log(gender);
        }          
            console.log(age, users);
            const ageFilter = users.filter(x => x.age === age)
            setUsers(ageFilter)
            
            console.log(ageFilter, users)
          
        setShowToolbar(true)
        nav("/likesDislikes")
    }



    // function saveFilter() {
    //     const city = selectCityRef.current.value

    //     if (city) {
    //         console.log(city, users);
    //         const cityFilter = users.filter(x => x.city === city)
    //         const ageFilter = cityFilter.filter(x => x.age >= age)
    //         // setFilteredByCityAndAge(ageFilter)
    //         if (gender) {
    //             const genderAgeCityFilter = ageFilter.filter(x => x.gender === gender)
    //             console.log(ageFilter, genderAgeCityFilter)
    //             // setGenderCityAgeFiltered(genderAgeCityFilter)
    //         }

    //     }
    // }


  return (
    <div className='filter'>    
        <div>    
            <p>Lithuanian - Ukrainian Filter</p>       
            <select className='select-input' ref={selectCityRef}>
                <option ></option>
                <option >Akmenė</option>
                <option >Alytus</option>
                <option >Anykščiai</option>
                <option >Ariogala</option>
                <option >Birštonas</option>
                <option >Biržai</option>
                <option >Druskininkai</option>
                <option >Elektrėnai</option>
                <option >Ignalina</option>
                <option >Jonava</option>
                <option >Joniškis</option>
                <option >Jurbarkas</option>
                <option >Kaišiadorys</option>
                <option >Kaunas</option>
                <option >Kėdainiai</option>
                <option >Kelmė</option>
                <option >Klaipėda</option>
                <option >Kretinga</option>
                <option >Kupiškis</option>
                <option >Lazdijai</option>
                <option >Lentvaris</option>
                <option >Marijampolė</option>
                <option >Mažeikiai</option>
                <option >Molėtai</option>
                <option >Naujoji Akmenė</option>
                <option >Neringa</option>
                <option >Pabradė</option>
                <option >Pakruojis</option>
                <option >Palanga</option>
                <option >Panevėžys</option>
                <option >Pasvalys</option>
                <option >Plungė</option>
                <option >Prienai</option>
                <option >Radviliškis</option>
                <option >Raseiniai</option>
                <option >Rokiškis</option>
                <option >Skuodas</option>
                <option >Šakiai</option>
                <option >Šiauliai</option>
                <option >Šilalė</option>
                <option >Šilutė</option>
                <option >Širvintos</option>
                <option >Tauragė</option>
                <option >Telšiai</option>
                <option >Trakai</option>
                <option >Ukmergė</option>
                <option >Utena</option>
                <option >Varėna</option>
                <option >Vilkaviškis</option>
                <option >Vilnius</option>
                <option >Visaginas</option>
                <option >Zarasai</option>
                <option >Žagarė</option>
                <option >Žiežmariai</option>
            </select>
            <p>(select city)</p>
           
        </div>

        <div className='d-flex'>
              <button onClick={() => setGender("moteris")} >Woman</button>
            <button onClick={() =>setGender("vyras")}>Man</button>
        </div>
            <div className='d-flex flex-column align-center'>
                <div className='d-flex align-center '>
                    <p>15</p>
                    <div>
                         <input className='select-age' ref={selectAgeRef} type="range" min="15" max="90" step="5" onInput={selectAge}/>      
                    </div>
                    <p>90</p>
                </div>
                    <div className='value'>
                         <label htmlFor='range' >(select age)</label>
                        <p className='span'>Value: <span >{age}</span></p>
                       
                    </div>
               
            </div>
            
        <div className='save-filter' >
            <button onClick= {saveFilter} >Save Filter</button>
        </div>
            

    </div>
  )
}

export default FilterPage
