import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        let {navTitle} = this.props; 
        return (
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{navTitle}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/applicators">Applicators</a >
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/terminals">Terminals</a >
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/childParts">Child Parts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/oids">OIDS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/product">Product</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar

