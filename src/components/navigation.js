import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className='container'>
        <div className='nav-columns'>
          <div className='nav-column'>
            <div className='nav-label'>Menu</div>
            <ul className='nav-links'>
              <li>
                <NavLink to='/' exact>
                  go home
                </NavLink>
              </li>
              {/* <li>
                <NavLink to='/approach' exact>
                  Approach
                </NavLink>
              </li>
              <li>
                <NavLink to='/services' exact>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to='/about-us' exact>
                  About us
                </NavLink>
              </li> */}
            </ul>
          </div>
          <div className='nav-column'>
            <div className='nav-label'>Contact</div>
            <div className='nav-infos'>
              <ul className='nav-info'>
                <li className='nav-info-label'>Email</li>
                <li>
                  0x1rory@gmail.
                </li>
                {/* <li>
                  <NavLink to='/audit' exact>
                    Get a free audit
                  </NavLink>
                </li> */}
              </ul>
              <ul className='nav-info'>
                <li className='nav-info-label'>Headquarter</li>
                <li>Web3 World</li>
              </ul>
              {/* <ul className='nav-info'>
                <li className='nav-info-label'>Phone</li>
                <li>+41 (0) 79 510 28 70</li>
              </ul>
              <ul className='nav-info'>
                <li className='nav-info-label'>Legal</li>
                <li>Privacy & Cookies</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
