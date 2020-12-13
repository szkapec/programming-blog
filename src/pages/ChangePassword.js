import React, { useState } from 'react'
import { connect } from 'react-redux';
import { checkPasswords, changePassword } from '../actions/auth.actions';
import ErrorMessage from '../components/ErrorMessage';
import PasswordChangeMessage from '../components/PasswordChangeMessage';


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
        <form className="change-profile-section">
          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type actual password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={firstPassword}
              name="firstPassword"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type again password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={secondPassword}
              name="secondPassword"
              onChange={(e) => onChange(e)}
            />
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
          <div className="password-page-button" onClick={(e) =>  submitData(e)}>
            Submit
          </div>
        </form>
      )}

            
            {isAllowedToChangePassword === true && (
                <form className="change-profile-section">
                    <div className="change-password-input-wrapper">
                        <label className="change-password-label p__size font__p font__bold">
                            Type New Password
                   </label>

                        <input
                            placeholder="Type New Password..."
                            value={newPassword}
                            name="newPassword"
                            onChange={(e) => onChange(e)}
                            type="text"
                        />

                        <div
                            className="password-page-button"
                            style={{
                                marginTop: ".5em",
                            }}
                            onClick={(e) => {
                                changePassword(newPassword);
                                // setIsSubmitted(true);
                               
                            }}
                        >
                            Submit
                   </div>
                    </div>
                </form>
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
                isAllowedToChangePassword && errors  && isSubmitted && (
                    <PasswordChangeMessage message="Password hasnt changed"/>
                )
            }
            {
                isAllowedToChangePassword && !errors && isSubmitted && (
                    <PasswordChangeMessage message="Password has changed"/>
                )
            }
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { checkPasswords, changePassword })(ChangePassword)
