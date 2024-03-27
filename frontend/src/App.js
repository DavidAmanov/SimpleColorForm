import Square from './colorSquareComp'
import Form from './form';
import './App.css';
import { useState } from 'react';

//basic colors
const colors =["#dee6e9", '#cedbea', '#b2cee8', '#74abdb', '#6b9ece', '#6094b8', '#5e7d99', '#5e7183', '#575e6d', '#bcbbb3'] 

//move window
document.addEventListener('mousemove', e=>{
  Object.assign(document.documentElement,{
    style:`
    --move-x:${(e.clientX-window.innerWidth/2)*-0.01}deg;
    --move-y:${(e.clientY-window.innerHeight/2)*-0.01}deg;`
  })
})


function App() {
  //create props from form data
  const [formData, setFormData] = useState({color: null, age:null});
  const handleFormDataChange = (data) =>{
    setFormData(data)
  }

  return (<>
  <div className='background'>
    <div className='form'>
      <Form onFormDataChange={handleFormDataChange}/>
    </div>
  </div>
  {colors.map((color, index)=>(
    <Square key={index} backgroundColor={formData.color || color} age={formData.age || 1}/>
  ))}
  </>);
}

export default App;
