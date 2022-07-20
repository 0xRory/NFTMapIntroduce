import React from "react";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";

const Banner = () => {
  return (
    <section className='main'>
      <div className='container'>
        <div className='row'>
          <h2>
            <div className='line'>
              <span>開始 Web3.0 前端套件學習檢視</span>
            </div>
            <div className='line'>
              <span>doooooooooo.</span>
            </div>
          </h2>
          <div className='btn-row bg-black'>
            <img src={require(`../assets/logo.png`)} />
            {/* <a href='/'>
              More about us <RightArrow />
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
