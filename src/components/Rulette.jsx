import React, { useEffect, useRef } from "react";
import { Button } from "./Button";
import IMG from '../assets'

const Rulette = () => {
    const wheelRef = useRef(null);
    const cardWidth = 188;

    const spinWheel = () => {
        const wheel = wheelRef.current;
        const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
        const randomCard = Math.floor(Math.random() * order.length);
        const position = order.indexOf(order[randomCard]);

        const totalDistance = (8 * 15 * cardWidth) + (position * cardWidth) + (cardWidth / 2);
        const randomOffset = Math.floor(Math.random() * 156) - 78;

        wheel.style.transition = "transform 6s cubic-bezier(0,0.5,0.2,1)";
        wheel.style.transform = `translate3d(-${totalDistance + randomOffset}px, 0, 0)`;

        setTimeout(() => {
            wheel.style.transition = "";
            wheel.style.transform = `translate3d(-${(position * cardWidth) + randomOffset + (cardWidth / 2)}px, 0, 0)`;
        }, 6000);
    };

    return (
        <div className="rulette-block">
            <div className="roulette-wrapper">
                <div className="selector"></div>
                <div className="wheel" ref={wheelRef}>
                {[...Array(49)].map((_, index) => (
                    <div className="row" key={index}>
                        {[...Array(15)].map((i, idx) => (
                            <div key={idx} className="card">
                                <img src={IMG.huskyProduct1} alt="" />
                            </div>
                        ))}
                    </div>
                ))}
                </div>
            </div>

            <Button onClick={spinWheel}>Spin Wheel</Button>
        </div>
    );
};

export default Rulette;
