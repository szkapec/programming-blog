import React from 'react'

import { Link } from "react-router-dom";
import Topics from './Topics';
import styled from 'styled-components';

const LandingPage = () => {
      
  return (
    <div className="landing-wrapper">
          <StyledName>
            <h1>Mateusz Kaproń</h1>
            <div>Blog o programowaniu</div>
          </StyledName>
          <Topics none={true}/>
    </div>
  );
};

export default LandingPage


const StyledName = styled.div`
    text-align: center;
    line-height: 25px;
    letter-spacing: 2px;
    div {
      font-family: 'Roboto', sans-serif;
      color: #707375;
      
    }
`