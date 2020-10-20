import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import useLaunches from "../useLaunches/useLaunches";
import './Calendar.css'
import Main from "../Main/Main";
import Loader from "../Loader/Loader";

const Calendar = () => {
    const { data } = useLaunches();
    const [slicedData, setSlicedData] = useState([])

    useEffect(() => {
        document.title = 'Calendar';
        const newData = data.splice(0,6)
        setSlicedData(newData)
    },[data])

    const downloadNewData = () => {
        setSlicedData(prevState => prevState.concat(data.splice(0, 6)))
    }

    return (
        <>
            <Main name="Calendar SpaceX"/>
            <section className="calendar">
                <div className="container">
                    <ul className="calendar-list">
                        {slicedData.length === 0 ? <Loader />
                            : slicedData.map(item => (
                                <li key={`${Math.random()}${item.id}`} className="calendar-item">
                                    <article className="launches">
                                        <div className="launches-image">
                                            <img src={item.links.patch.small} alt={item.name} />
                                        </div>
                                        <div className="launches-content">
                                            <h2 className="launches-title">{item.name}</h2>
                                            <Link to={`/details/${item.id}`} className="button launches-details" >Подробнее</Link>
                                        </div>
                                    </article>
                                </li>
                            )) }
                    </ul>
                </div>
                {
                    data.length !== 0
                        ? <button className="button download" type="button" onClick={downloadNewData}>Load More</button>
                        : null
                }

            </section>
        </>
    )
}
export default Calendar
