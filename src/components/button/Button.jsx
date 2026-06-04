import './Button.css'

function Button ({handleClick, type, disabled, name, label}){
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