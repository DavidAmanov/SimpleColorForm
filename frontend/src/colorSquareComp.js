import React, {useState, useEffect} from 'react';

export default function Square ({backgroundColor, age}){
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(()=>{
        function updatePosition (){
            let newLeft = window.innerWidth - Math.random()* window.innerWidth;
            let newTop = window.innerHeight - Math.random()*window.innerHeight;
            setLeft(newLeft);
            setTop(newTop);
        }

        const intervalId = setInterval(updatePosition, 225-(age*3));
        return ()=>{clearInterval(intervalId)}
    }, [age])

    return(
        <div style={{width: 50, height: 50, backgroundColor: backgroundColor, position: 'absolute', left: left, top: top}}></div>
    )
}