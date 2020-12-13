import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
          <StyledDashboard>
              <div>
                <Link to="/change-profile" className="dashboard-link-href">
                 <p> Zmiana nazw</p>
                </Link>
              </div>
    
              <div>
                <Link to="/contact-us" className="dashboard-link-href">
                  <p>Kontakt</p>
                </Link>
              </div>
    
              <div>
                <Link to="/change-password" className="dashboard-link-href">
                  <p>Zmiana hasła</p>
                </Link>
              </div>
          </StyledDashboard>
        </div>
    )
}

export default Dashboard

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

    div {
      background-color: #3f78a0;
      padding: 20px;
      margin: 20px auto;
      text-align: center;
      width: 80%;
      max-width: 200px;
      border-radius: 5px;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    @media(min-width: 1100px){
      grid-template-columns: repeat(3, 1fr);
      max-width: 800px;
      margin: 20px auto;

      a {
        margin: 10px 0;
      }
    }
`