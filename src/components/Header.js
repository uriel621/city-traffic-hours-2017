import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="collapse bg-dark" id="navbarHeader">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8 col-md-7 py-4">
                                    <h4 className="text-white">About</h4>
                                    <p className="text-muted">My name is Ever and I pretty much felt like doing a simple project using D3 and React. I hope you like it. Thanks</p>
                                </div>
                                <div className="col-sm-4 offset-md-1 py-4">
                                    <h4 className="text-white">Contact</h4>
                                    <ul className="list-unstyled">
                                        <li><a target="blank" href="http://evergarcia.com" className="text-white">My Site</a></li>
                                        <li><a target="blank" href="https://github.com/uriel621" className="text-white">GitHub</a></li>
                                        <li><a target="blank" href="https://www.linkedin.com/in/uriel621/" className="text-white">LinkedIn</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                    <div className="navbar navbar-dark bg-dark box-shadow">
                        <div className="container d-flex justify-content-between">
                            <a target="blank" href="http://evergarcia.com" className="navbar-brand d-flex align-items-center">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> */}
                                <strong>D3 js & React</strong>
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </header>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">Top 10 Cities Where U.S. Drivers Spend The Most Time Stuck In Traffic 2016 and 2017</h1>
                        <p className="lead text-muted">This chart was made with D3 js <span style={{ "color":"red" }}>&hearts;</span></p>
                        <p>
                            <a target="blank" style={{ "width":"130px", "marginRight":"5px" }} href="https://github.com/uriel621/city-traffic-hours-2017" className="btn btn-info my-2">GitHub Code</a>
                            <a target="blank" style={{ "width":"130px", "marginLeft":"5px" }} href="http://inrix.com/scorecard/" className="btn btn-primary my-2">City Data</a>
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}
  
export default Header;