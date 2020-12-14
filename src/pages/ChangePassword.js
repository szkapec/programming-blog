import React, { useState } from 'react'
import { connect } from 'react-redux';
import { checkPasswords, changePassword } from '../actions/auth.actions';
import ErrorMessage from '../components/ErrorMessage';
import PasswordChangeMessage from '../components/PasswordChangeMessage';
import styled from 'styled-components';


const ChangePassword = ({ auth: { errors, isAllowedToChangePassword }, checkPasswords, changePassword }) => {

    let [areNotPasswordsFullfield, setNotArePasswordsFullfield] = useState(false)
    let [arePasswordsWrong, setArePasswordsWrong] = useState(false)
    let [isSubmitted, setIsSubmitted] = useState(false)
    let [formData, setFormData] = useState({
        firstPassword: '',
        secondPassword: '',
        newPassword: '',
    })
    let { firstPassword, secondPassword, newPassword } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitData = e => {
        if (firstPassword !== secondPassword) {
            setArePasswordsWrong(true);
            setNotArePasswordsFullfield(false);
        } else if (firstPassword === '' || firstPassword === null || secondPassword === "" || secondPassword === null) {
            setNotArePasswordsFullfield(true);
        } else {
            checkPasswords(firstPassword)
        }
    }
    return (
        <div className="change-profile-page-wrapper">

            {isAllowedToChangePassword === false && (
                <StyledChangeProfile className="change-profile-section">
                    <div className="change-password">
                        <div>
                            <label className="change-password-label">
                                Aktualne hasło: 
                            </label>
                            <input
                                className="change-password-input"
                                placeholder="Type Something..."
                                type="password"
                                value={firstPassword}
                                name="firstPassword"
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div>
                            <label className="change-password-label">
                                Powtórz hasło: 
                            </label>
                            <input
                                className="change-password-input"
                                placeholder="Type Something..."
                                type="password"
                                value={secondPassword}
                                name="secondPassword"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>

                    {areNotPasswordsFullfield && (
                        <ErrorMessage errorMessage="You haven't fullfiled some input" />
                    )}

                    {arePasswordsWrong && (
                        <ErrorMessage errorMessage="Passwords are wrong" />
                    )}

                    {errors === false && (errors !== {} || errors !== null) && (
                        <ErrorMessage errorMessage="Something went wrong..." />
                    )}
                    <StyledButton className="password-page-button" onClick={(e) => submitData(e)}>
                        Wyślij
          </StyledButton>
                </StyledChangeProfile>
            )}


            {isAllowedToChangePassword === true && (
                <StyledChangeProfile className="change-profile-section">
                    <div className="change-password">
                        <label className="change-password-label">
                            Nowe hasło
                        </label>

                        <input
                            placeholder="nowe hasło..."
                            value={newPassword}
                            name="newPassword"
                            onChange={(e) => onChange(e)}
                            type="password"
                        />

                        <StyledButton
                            className="password-page-button"
                            style={{
                                marginTop: ".5em",
                            }}
                            onClick={(e) => {
                                changePassword(newPassword);
                                // setIsSubmitted(true);

                            }}
                        >
                            Wyślij
                   </StyledButton>
                    </div>
                </StyledChangeProfile>
            )}
            {/* {isAllowedToChangePassword && errors && (
                <ErrorMessage errorMessage="Password hasn't changed, something went wrong..." />
            )} */}

            {arePasswordsWrong && (
                <ErrorMessage errorMessage="Password are wrong" />
            )}

            {/* {
                isAllowedToChangePassword !== false && (isAllowedToChangePassword !== {} || isAllowedToChangePassword !== null) && (
                    <ErrorMessage errorMessage="Udało sie!"/>
                )
            } */}
            {
                isAllowedToChangePassword && errors && isSubmitted && (
                    <PasswordChangeMessage message="Password hasnt changed" />
                )
            }
            {
                isAllowedToChangePassword && !errors && isSubmitted && (
                    <PasswordChangeMessage message="Password has changed" />
                )
            }
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { checkPasswords, changePassword })(ChangePassword)



const StyledButton = styled.div`
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
`

const StyledChangeProfile = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

    .change-password {
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 8px 0px;
      border: 1px solid rgb(209, 209, 213);
      padding: 30px;
      margin: 20px auto;
      text-align: center;
      width: 80%;
      max-width: 400px;
      border-radius: 5px;

      input {
          margin: 10px 0 10px 15px;
      }
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
      max-width: 800px;
      margin: 20px auto;
      font-size: 18px;
    }
`