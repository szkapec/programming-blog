import React from 'react'

const PasswordChangeMessage = ({message}) => {
    return (
        <section className="change-profile-section">
      <div className="change-password-input-wrapper flex__center">
        <span className="font__bold font__p p__size">{message}</span>
      </div>
    </section>
    )
}

export default PasswordChangeMessage
