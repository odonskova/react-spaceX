import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import '../../spacex/src/style.css';
import FetchData from "./service/FetchData";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Details/Details";

class App extends React.Component {
    fetchedData = new FetchData();

    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rockets: [],
        companyInfo: null,
    };

    componentDidMount() {
        this.updateRocketInfo();
        this.updateCompany();
    }

    updateRocketInfo() {
        this.fetchedData.getRocket()
            .then(data => {
                this.setState({rockets: data.map(item => item.name)});
                return data
            })
            .then(data => data.find(item => item.name === this.state.rocket))
            .then(rocketFeatures => this.setState({rocketFeatures}))
    }

    changeRocket = rocket => {
        this.setState({
            rocket
        }, this.updateRocketInfo)
    }

    updateCompany = () => {
        this.fetchedData.getCompany()
            .then(data => this.setState({companyInfo: data}))
    }

    render() {
        return (
            <BrowserRouter>
                <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>

                <Route exact
                       path="/"
                       render={() => this.state.companyInfo &&
                           <Home company={this.state.companyInfo}/>}/>

                <Route path='/rocket/:rocket'
                       render={({match}) => this.state.rocketFeatures &&
                           <Features features={this.state.rocketFeatures} match={match} />}/>

                <Route path="/calendar" component={Calendar} />

                <Route path="/details/:id" component={Details} />

                {this.state.companyInfo && <Footer companyinfo = {this.state.companyInfo}/>}
            </BrowserRouter>
        );
    }
}


export default App;
