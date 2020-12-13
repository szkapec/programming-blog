import React from 'react'
import styled from 'styled-components';

const ContactPage = () => {
    return (
        <StyledContainerContactPage className="change-profile-page-wrapper">
            <div className="contact">Zapraszam do kontaktu</div>
            <div className="box-link">
                    <a rel="noreferrer" href="https://github.com/szkapec"><i className="fab fa-github"></i></a>
                    <a rel="noreferrer" href="https://www.linkedin.com/in/mateusz-kapro%C5%84-664b92197/"><i className="fab fa-linkedin"></i></a>
                    <a rel="noreferrer" href="https://www.facebook.com/mateusz.kapron.50/"><i className="fab fa-facebook"></i></a>
                    <a rel="noreferrer" href="https://www.youtube.com/channel/UCfDIy_8Ig3F_B1-CsNi2lQw?view_as=subscriber"><i className="fab fa-youtube"></i></a>

                    <div className="box-contact">
                    <a href="mailto:mateusz.kapron24@gmail.com">mateusz.kapron24@gmai.com</a>
                    <a href="tel:+48661360889">661-360-889</a>
                </div>
                </div>
                
        </StyledContainerContactPage>
    )
}

export default ContactPage

const StyledContainerContactPage = styled.div`
    max-width: 500px;
    width: 80%;
    margin: 30px auto;
    text-align: center;
    
    .contact {
        font-size: 22px;
        margin-bottom: 20px;
    }
    .box-link {
        margin-top: 10px;
        padding: 10px;
        a {
            color: #a4afc1;
            font-size: 25px;
            margin: 0 10px;
            transition: .5s ease-in-out;
            @media(min-width: 300px){
                font-size: 35px;
            }
            &:hover {
                color: #757f90;
            }
        }
        .box-contact {
            margin-top: 15px;
            
            a {
                display: block;
                font-size: 12px;
               
                margin-top: 15px;
                color: black;
                @media(min-width: 300px){
                    font-size: 16px;
                }
                @media(min-width: 550px){
                    font-size: 18px;
                }
            }
        }
    }
`