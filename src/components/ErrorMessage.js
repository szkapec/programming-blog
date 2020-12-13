import React from 'react'

const ErrorMessage = ({errorMessage }) => {
    return (
        <div>
        <p
          className="font__bold font__p p__size"
          style={{
            color: "#fb2f2f",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </p>
      </div>
    )
}

export default ErrorMessage
