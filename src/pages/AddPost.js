import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createPost, clearPost } from '../actions/posts.actions';
import { Link } from 'react-router-dom';
import FileBase from 'react-file-base64';
import styled from 'styled-components'

const AddPost = ({ createPost, clearPost, posts: { post } }) => {

  let [title, setTitle] = useState("");
  let [textOfThePost, setTextOfThePost] = useState("");
  let [image, setImage] = useState("");

  const onChange = (e) => setTextOfThePost(e.target.value);

  const changeImage = (base64) => setImage(base64)
  
  const submitData = () => {

    if (textOfThePost !== "" && textOfThePost !== null) {
      createPost(textOfThePost, title, image);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");
    setTitle("")
    setTimeout(() => {
      clearPost()
    }, 5000);
  };


  return (
    <StyledConainerAddPost className="make-post-wrapper">
      <h1>Dodaj nowy post</h1>
      {
        post === null ? (
          <form>
            <div> Temat:</div>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />

            <div>Treść:</div>
            <textarea
              type="text"
              value={textOfThePost}
              onChange={(e) => onChange(e)}
            />

            <div>Dodaj zdjęcie:</div>
            <div className="file"> <FileBase type="file" multiple={false} onDone={({ base64 }) => changeImage(base64)} /></div>
            <div></div>
            <div
              onClick={() => submitData()}
              className="add-post-btn"
            >
              Dodaj post
            </div>
          </form>
        ) : (
            <div className="output">
              <p className="post-add">Post dodany!</p>
              <div className="container-output">
                <div className="output-buttons-wrapper">
                  <div className="add" onClick={() => clearPost()}>
                    <p>Dodaj nowy</p>
                  </div>
                  <div className="add">
                    <Link
                      to="/topics"
                      className="white__color__font"
                      style={{ textDecoration: "none" }}
                    >
                      <p>Wszystkie posty</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </StyledConainerAddPost>
  )
}

const mapDispatchToProps = {
  createPost,
  clearPost
}
const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
})
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)


const StyledConainerAddPost = styled.div`
    max-width: 800px;
    width:90%;
    margin: 0 auto;

    h1 {
        text-align: center;
      }
    form {
      background-color: #fff;
      padding: 30px;
      display: grid;
      grid-template-columns: 200px;
      max-width:200px;
      grid-row-gap: 10px;
      text-align:center;
      margin: 0 auto;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
      textarea {
        height: 50px;
      }
    }

    .add-post-btn {
        border: 1px solid black;
        background-color: #fff;
        padding: 5px 10px;
        width: 100px;
        margin: 10px auto;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
          background-color: #fff;
          border: 1px solid #346589;
          color: #346589;
        }
    }
    .output {
        .post-add {
          font-size: 25px;
          margin: 10px;
          text-align:center;
        }
        .container-output {
          width: 100%;
          height: 200px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          a {
              color: black;
            
            }
          p {
            width: 150px;
            padding: 15px 10px;
            background-color: #346589;
            text-align: center;
            margin: 20px 0;
            &:hover {
                text-decoration: underline;
              }
           
          }
        }
        .add-post-btn {
        width: auto;
        margin: 10px 0;
        }
      }


    @media(min-width: 500px) {
     
      form {
        grid-template-columns: 120px 200px;
        max-width: 500px;
        justify-content:center;
      }
    }

    @media(min-width:660px){
      .output {
       
        .container-output {
          height: 100px;
          width: 100%;
          height: 100px;
          display: flex;
          .add {
            display: inline-block;
            p {
              display: inline-block;
              margin: 20px;
            }
          }
  }
}
    }

    @media(min-width: 1100px){
      form {
        font-size: 18px;

        div {
          margin-bottom: 5px;
        }
      }
      .add {
        font-size: 18px;
      }
    }
  
`

