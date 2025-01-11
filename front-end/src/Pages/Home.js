import { useNavigate } from 'react-router';
import casanet from '../assets/casanet.png';

export default function Home() {
    const navigate = useNavigate()
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const imgStyle = {
        marginBottom: 'auto',
    };

    const buttonStyle = {
        margin: '12px',
        height: '50px',
        width: '120px',
        borderRadius: '10px',
        background: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '-5px -5px 15px #DDDDDD, 5px 5px 15px #EEEEEE, inset 5px 5px 10px #EEEEEE, inset -5px -5px 10px #ffffff',
        // fontFamily: 'Damion, cursive',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold',
        color: 'rgb(161, 161, 161)',
        transition: '500ms',
    };

    const hoverStyle = {
        ...buttonStyle,
        boxShadow: '-5px -5px 15px #EEEEEE, 5px 5px 15px #EEEEEE, inset 5px 5px 10px #ffffff, inset -5px -5px 10px #DDDDDD',
        color: 'rgb(150, 150, 150)',
    };

    const shakeStyle = {
        animation: 'shake 0.5s',
    };

    const handleHover = (e) => {
        e.target.style.color = hoverStyle.color;
        e.target.style.boxShadow = hoverStyle.boxShadow;
        e.target.style.transition = hoverStyle.transition;
    };

    const handleShake = (e) => {
        e.target.style.animation = shakeStyle.animation;
    };

    const handleLeave = (e) => {
        e.target.style.color = buttonStyle.color;
        e.target.style.boxShadow = buttonStyle.boxShadow;
        e.target.style.transition = buttonStyle.transition;
        e.target.style.animation = 'none';
    };

    return (
        <div style={containerStyle}>
            <img src={casanet} alt="casanet" title="casanet" style={imgStyle} />
            <button
                style={buttonStyle}
                onMouseEnter={handleHover}
                onMouseMove={handleShake}
                onMouseLeave={handleLeave}
                onClick={()=>{navigate('/login')}}
            >
                login
            </button>
        </div>
    );
}
