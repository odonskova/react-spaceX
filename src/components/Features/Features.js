import React, {useEffect, useRef} from "react";
import './Features.css';
import Rellax from "rellax";
import Main from "../Main/Main";


const Features = props => {
    const {name, height, diameter, mass, payload_weights: payloadWeights, description} = props.features
    const rocket = props.match.params.rocket
    const relaxRef = useRef()

    useEffect(() => {
        document.title = name;
        new Rellax(relaxRef.current, {
            speed: 40,
        })
    }, [name])

    return (
        <>
            <Main rocket={name}/>
            <section className="features">
                <h2 className="features-title">
                    { name } <br/>Overview
                </h2>
                <div className="overview">

                    <table className="table">
                        <caption className="table-title">
                            Size
                        </caption>
                        <thead>

                        <tr>
                            <td className="table-column">HEIGHT</td>
                            <td className="table-column"> {height.meters} m / {height.feet} ft</td>
                        </tr>
                        <tr>
                            <td className="table-column">DIAMETER</td>
                            <td className="table-column">{diameter.meters} m / {diameter.feet} ft</td>
                        </tr>
                        <tr>
                            <td className="table-column">MASS</td>
                            <td className="table-column">{mass.kg.toLocaleString()} kg / {mass.lb.toLocaleString()} lb</td>
                        </tr>
                        {payloadWeights.map((item, index) => (
                            <tr key={index}>
                                <td className="table-column">PAYLOAD TO {item.id.toUpperCase()}</td>
                                <td className="table-column">{item.kg.toLocaleString()} kg / {item.lb.toLocaleString()} lb</td>
                            </tr>
                        ))}
                        </thead>
                    </table>
                    <img
                        ref={relaxRef}
                        src={`../../img/${rocket.replace('_', '-').toLowerCase()}.png`}
                        alt="rocket"
                        className="rocket"
                    />
                    <article>
                        <h3 className="features-subtitle">DESCRIPTION</h3>
                        <p className="features-text">
                            {description}
                        </p>
                    </article>
                </div>
            </section>
        </>
    )
}

export default Features
