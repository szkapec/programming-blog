import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux';
import {getPosts, getMostRecentPosts, getMostCommentedPosts, theMostLikedPosts, searchTopics  } from '../actions/posts.actions';

import TopicPostsWrapper from './TopicPosts/TopicPostsWrapper'
import './scss/Topics/topics.css';
import Spinner from '../Spinner'
const Topics = ({getPosts, getMostRecentPosts, getMostCommentedPosts, theMostLikedPosts, searchTopics, posts, none}) => {

    let [dataFromSearch, setDataFromSearch] = useState('')
    let [topicsSortType, setTopicsSortType] = useState({
        isTheOldest: false,
        isTheMostRecent: true,
        isTheMostCommented: false,
        isTheMostLiked: false,
    })

    let {isTheOldest, isTheMostRecent,
        isTheMostCommented,
        isTheMostLiked} = topicsSortType

    const onChange = (e) => {setDataFromSearch(e.target.value)};

    const searchForTopics = dataFromSearch => {
     
        if(dataFromSearch !== '' || dataFromSearch !== null) {
            searchTopics(dataFromSearch)
            setDataFromSearch('')

        } else {
            setTopicsSortType({isTheMostRecent: true, isTheMostCommented: false, isTheMostLiked:false , isTheOldest: false})
            getMostRecentPosts()
            
        }
    }

        useEffect(() => {
            if(isTheOldest) getPosts();
            else if (isTheMostCommented) getMostCommentedPosts();
            else if (isTheMostLiked) theMostLikedPosts();
            else getMostRecentPosts();

        }, [])

        const changeTopics = (changedType) => {
            console.log(changedType)
            if(changedType === "isTheMostLiked") {
                setTopicsSortType({
                    isTheMostRecent: false, 
                    isTheMostCommented: false, 
                    isTheMostLiked:true, 
                    isTheOldest: false
                 });
                 theMostLikedPosts();
            }
            
             else if(changedType === "isTheOldest"){
                setTopicsSortType({
                    isTheMostRecent: false, 
                    isTheMostCommented: false, 
                    isTheMostLiked:false, 
                    isTheOldest: true
                 });
                 getPosts();
             }
             
             else if(changedType === "isTheMostCommented"){
                setTopicsSortType({
                    isTheMostRecent: false, 
                    isTheMostCommented: true, 
                    isTheMostLiked:false, 
                    isTheOldest: false
                 });
                 getMostCommentedPosts();
             }
             
             else {
                setTopicsSortType({
                    isTheMostRecent: true, 
                    isTheMostCommented: false, 
                    isTheMostLiked:false, 
                    isTheOldest: false
                 });
                 getMostRecentPosts();
             }
        }

        
    return ( <div>
            <div className="search"  className={none?'main':'main'} style={{display: none?'none':'grid'}}>
              
                <div>
                    <input type="checkbox" value={isTheOldest} checked={isTheOldest} onChange={() => changeTopics("isTheOldest")}/>
                    <span onClick={() => changeTopics("isTheOldest")}>Najstarszy</span>
                </div>
                <div>
                    <input type="checkbox" value={isTheMostRecent} checked={isTheMostRecent}  onChange={() => changeTopics("isTheMostRecent")}/>
                    <span  onClick={() => changeTopics("isTheMostRecent")}>Najnowszy</span>
                </div>
                <div>
                    <input type="checkbox" value={isTheMostLiked} checked={isTheMostLiked} onChange={() => changeTopics("isTheMostLiked")}/>
                    <span onClick={() => changeTopics("isTheMostLiked")}>Lubiany</span>
                </div>
                <div>
                    <input type="checkbox" value={isTheMostCommented} checked={isTheMostCommented}  onChange={() => changeTopics("isTheMostCommented")}/>
                    <span onClick={() => changeTopics("isTheMostCommented")}>Komentowany</span>
                </div>
                {/* <form action="">
                    <textarea value={dataFromSearch} onChange={(e) => onChange(e)}/>
                    <button onClick={() => searchForTopics(dataFromSearch)}>
                        Wyszukaj
                    </button>
                   
                </form> */}
                
                </div>
                <div className="topics-wrapper">
                <TopicPostsWrapper
                    isTheMostCommented={isTheMostCommented}
                    isTheOldest={isTheOldest}
                    isTheMostRecent={isTheMostRecent}
                    isTheMostLiked={isTheMostLiked}
                    posts={posts.posts}
                />
           
            </div>
           
        </div>
    )
}
const mapStateToProps = state => ({
    posts: state.posts,
})
const mapDispatchToprops = {
    getPosts, getMostRecentPosts, getMostCommentedPosts, theMostLikedPosts, searchTopics 
}

export default connect(mapStateToProps, mapDispatchToprops)(Topics)
