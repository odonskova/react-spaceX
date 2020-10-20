import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import YouTube from 'react-youtube';

import Main from "../Main/Main";
import './Details.css';
import useLaunches from "../useLaunches/useLaunches";
import Loader from "../Loader/Loader";

const Details = (props) => {
    const [launch, setLaunch] = useState(null);
    const { getLaunch } = useLaunches();

    useEffect(() => {
        setLaunch(getLaunch(props.match.params.id))
        // eslint-disable-next-line
    }, [getLaunch]);

    const history = useHistory()

    return (
        <>
            {!launch
                ? <div className="loader"><Loader /></div>
                : <>
                    <Main name={launch.name}/>
                    <section className="details">
                        <div className="container">
                            <div className="details-row">
                                <div className="details-image">
                                    <img src={launch.links.patch.small} alt={launch.name}/>
                                </div>
                                <div className="details-content">
                                    <p className="details-description">{launch.details}</p>
                                </div>
                            </div>
                            <div>
                                <YouTube
                                    className="details-youtube"
                                    videoId={launch.links.youtube_id}
                                />
                            </div>
                        </div>
                        <button
                            onClick={history.goBack}
                            className="button button-back">
                            Go back
                        </button>
                    </section>
                </>
            }
        </>
    )
}

export default Details
