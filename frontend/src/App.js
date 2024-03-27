import Square from './colorSquareComp'
import './App.css';

const colors =["#dee6e9", '#cedbea', '#b2cee8', '#74abdb', '#6b9ece', '#6094b8', '#5e7d99', '#5e7183', '#575e6d', '#bcbbb3']

function App() {
  return (<>
  {colors.map((color)=>(
    <Square backgroundColor={color}/>
  ))}
  </>);
}

export default App;
