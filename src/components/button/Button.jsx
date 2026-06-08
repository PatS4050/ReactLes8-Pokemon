import './Button.css'
import axios from "axios";

function Button ({ type, disabled, name, label, endpoint, dataReceived}){
    const handleClick = async ()=>{
        const response =     await axios.get(endpoint)
        console.log(response)
        dataReceived(response)
        // return setPokemon(response)
        // setPokemon (response)
    }
    return (
        <button
            onClick={handleClick}
            type={type}
            disabled={disabled}
            name={name}
            >
            {label}
        </button>
    );
}
export default Button