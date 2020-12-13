import React from 'react'
import TopicPost from './TopicPost';


const TopicPostsWrapper = ({isTheMostCommented,
    isTheOldest,
    isTheMostRecent,
    isTheMostLiked,
    posts}) => {
    return posts !== null && posts.length > 0 && posts.map(post => <TopicPost post={post}  isTheMostCommented={isTheMostCommented}
        isTheOldest={isTheOldest}
        isTheMostRecent={isTheMostRecent}
        isTheMostLiked={isTheMostLiked}
        posts={posts.posts} key={post._id}/>)
}

export default TopicPostsWrapper;
