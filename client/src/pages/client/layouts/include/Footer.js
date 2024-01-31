import React from 'react'
import { Heart } from 'react-feather'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer footer-static footer-light">
            <p className="clearfix mb-0"><span className="float-md-left d-block d-md-inline-block mt-25">COPYRIGHT &copy; {new Date().getFullYear()}<Link className="ml-25" to="#" target="_blank">WhiteX Digital</Link><span className="d-none d-sm-inline-block">, All rights Reserved</span></span><span className="float-md-right d-none d-md-block">Develop By : Arham Khan<Heart /></span></p>
        </footer>
    )
}

export default Footer
