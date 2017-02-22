import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import './App.css';

class Footer extends Component {

    render() {
        return (
            <div className="footer-list">
                <ul>
                    <li className="footer-item footer-item-copyright">Developed by: Mohammad Ovais Siddiqui</li>
                    <li className="footer-item footer-social-item">
                        <a title="Github" className="footer-social-link" target="_blank" href="https://github.com/OvaisFareed"><img src="../images/Bokehlicia-Captiva-Web-github.ico" width="20" height="20" alt="Github"/></a>
                    </li>
                    <li className="footer-item footer-social-item">
                        <a title="Twitter" className="footer-social-link" target="_blank" href="https://twitter.com/MohammadOvais2"><img src="../images/Limav-Flat-Gradient-Social-Twitter.ico" width="20" height="20" alt="Twitter"/></a>
                    </li>
                    <li className="footer-item footer-social-item">
                        <a title="Facebook" className="footer-social-link" target="_blank" href="https://www.facebook.com/mohammadovais.siddiqui"><img src="../images/Yootheme-Social-Bookmark-Social-facebook-box-blue.ico" width="20" height="20" alt="Facebook"/></a>
                    </li>
                    <li className="footer-item footer-social-item">
                        <a title="Google+" className="footer-social-link" target="_blank" href="https://plus.google.com/u/0/+MohammadOvaisSiddiqui"><img src="../images/Limav-Flat-Gradient-Social-Google-Plus.ico" width="20" height="20" alt="Google +"/></a>
                    </li>
                    <li className="footer-item footer-social-item">
                        <a title="LinkedIn" className="footer-social-link" target="_blank" href="https://pk.linkedin.com/in/movaiss"><img src="../images/Danleech-Simple-Linkedin.ico" width="20" height="20" alt="LinkedIn"/></a>
                    </li>
                    <li className="footer-item footer-item-copyright"><img src="../images/Iconsmind-Outline-Copyright.ico" width="10" height="10" alt="Copyright"/> 2017 AlgoRack (pvt).</li>
                </ul>
                </div>
        );
    }
}

export default Footer;