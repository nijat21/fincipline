import { useEffect, useState } from 'react';
import '../Background.css';


const GradientBackground = () => {
    // const [curX, setCurX] = useState(0);
    // const [curY, setCurY] = useState(0);
    // const [tgX, setTgX] = useState(0);
    // const [tgY, setTgY] = useState(0);


    // const handleMouseMove = (e) => {
    //     setTgX(e.clientX);
    //     setTgY(e.clientY);
    // };

    // useEffect(() => {

    //     const interBubble = document.querySelector('.interactive');

    //     const move = () => {
    //         setCurX(prevCurX => (tgX - prevCurX) / 20);
    //         setCurY(prevCurY => (tgY - prevCurY) / 20);
    //         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    //         requestAnimationFrame(() => {
    //             move();
    //         });
    //     };

    //     window.addEventListener('mousemove', handleMouseMove);
    //     move();

    //     return (() => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     });
    // }, []);


    return (
        <div className="absolute w-full h-screen overflow-hidden">
            <div className="gradient-bg">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div className="interactive"></div>
                </div>
            </div>
        </div>
    );
};

export default GradientBackground;
