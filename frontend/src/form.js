import './form.css';
import React, {useState} from 'react';

export default function Form({onFormDataChange}){
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        color:'',
    })
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // POST request function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/api', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(formData)
            })
            if(response.ok){
                console.log('Data sent seccessfully')
            } else{
                console.log(response, 'Failed!')
            }
        } catch(error){
            console.log('Failed!', error)
        }
        onFormDataChange(formData)
    }

    return(
        //markup
        <form className="form" onSubmit={handleSubmit}>      
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Input name..."
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Input your age..."
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Input favorite color..."
        />
        <button className='btn' type="submit">Submit</button>
      </form>
    )
}