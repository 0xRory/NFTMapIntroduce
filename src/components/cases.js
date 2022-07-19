import React from "react";
import { Link } from 'react-router-dom'
import { ReactComponent as CasesNext } from "../assets/arrow-right.svg";
import { ReactComponent as CasesPrev } from "../assets/arrow-left.svg";


const caseStudies = [
  {
    id: 1,
    subtitle: "是否擁有NFT",
    title: "Using Token Gated Membership",
    img: "curology-min",
    route: "/owner-nft"
  },
  {
    id: 2,
    subtitle: "Mint NFT",
    title: "Using NFT Drop",
    img: "yourspace-min",
    route: "mint-nft"
  },
  {
    id: 3,
    subtitle: "分享到社群吧",
    title: "For your best look ever",
    img: "lumin-min",
    route: "share-nft"
  }
];

const Cases = () => {
  return (
    <section className='cases'>
      <div className='container-fluid'>
        <div className='cases-navigation'>
          <div className='cases-arrow prev disabled'>
            <CasesPrev />
          </div>
          <div className='cases-arrow next'>
            <CasesNext />
          </div>
        </div>
        <div className='row'>
          {caseStudies.map(caseItem => (
            <Link to={caseItem.route}>
              <div className='case' key={caseItem.id}>
                <div className='case-details'>
                  <span>{caseItem.subtitle}</span>
                  <h2>{caseItem.title}</h2>
                </div>
                <div className='case-image'>
                  <img
                    src={require(`../assets/${caseItem.img}.png`)}
                    alt={caseItem.title}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
