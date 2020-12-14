import React, { useState } from 'react'
import { connect } from 'react-redux';
import {changeUserData} from '../actions/auth.actions';
import ErrorMessage from "../components/ErrorMessage";
import styled from 'styled-components';

const ChangeProfile = ({ changeUserData, posts: { errors } })  => {
    let [dataType, setDataType] = useState("");
    let [newUserData, setNewUserData] = useState("");
    let [isTextError, setIsTextError] = useState(false);
  
    const onChange = (dataToChange) => setDataType(dataToChange);
  
    const resetSentData = () => {
      setDataType("");
    };
  
    const sendData = () => {
      if (newUserData === "" || newUserData === null) return setIsTextError(true);
      changeUserData(newUserData, dataType)
      setNewUserData("");
      setDataType("");
    };
    return (
        <div className="change-profile-page-wrapper">
      {dataType === "" ? (
        <StyledChangeProfile>
          <div onClick={() => onChange("userName")}>
            <p>Zmień nazwe użytkownika</p>
          </div>

          <div onClick={() => onChange("name")}>
            <p>Zmień imię</p>
          </div>

          <div onClick={() => onChange("lastName")}>
            <p>Zmień nazwisko</p>
          </div>
          
        </StyledChangeProfile>
        
      ) : (
        <StyledFormChangeName>
          <p>Zmień {dataType==="name"?"imię":dataType==="userName" ? "nazwę użytkownika" : 'nazwisko'}</p>
          <input
            onChange={(e) => {
              setNewUserData(e.target.value);
            }}
            type="text"
            placeholder="Zmień nazwę"
          />

          {errors && isTextError && (
            <ErrorMessage errorMessage="Coś poszło nie tak..." />
          )}

          <StyledButton>
            <div  onClick={() =>
                 sendData()
                 }>
              Wyślij
            </div>

            <div  onClick={() =>
                 resetSentData()
                 }>
              Wróć
            </div>
          </StyledButton>
        </StyledFormChangeName>
      )}
    </div>
    )
}
const mapStateToProps = (state) => ({
    posts: state.posts,
  });

export default connect(mapStateToProps, { changeUserData })(ChangeProfile)

const StyledFormChangeName = styled.form`
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  input {
    width: 180px;
    padding: 5px 10px;
  }

  @media(min-width: 1100px){
    margin: 30px auto;
    font-size: 18px;
    p {
      margin-bottom: 20px;
    }
    input {
      width: 200px;
      padding: 10px 15px;
  }
  }
`

const StyledButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  div {
    width: 100px;
    padding: 5px 15px;
    margin: 20px auto;
    text-align: center;
    background-color: white;
      border: 1px solid rgb(209, 209, 213);
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledChangeProfile = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

    div {
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 8px 0px;
      border: 1px solid rgb(209, 209, 213);
      padding: 20px;
      margin: 20px auto;
      text-align: center;
      width: 80%;
      max-width: 200px;
      border-radius: 5px;

      p {
        cursor: pointer;
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
    }
`