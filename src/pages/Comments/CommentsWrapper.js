import React from 'react'
import Comment from './Comment'
const CommentsWrapper = ({ comments }) => {
    return comments !==null && comments !== [] && comments !== {} && comments.length>0 && comments.map(comment => <Comment comment={comment} key={comment._id}/> )
}

export default CommentsWrapper
