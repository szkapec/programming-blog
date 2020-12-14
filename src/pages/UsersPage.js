import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getUsers, searchByUsername } from '../actions/users.actions';
import UserWrapper from './Users/UsersWrapper';
import styled from 'styled-components';


const UsersPage = ({ getUsers, searchByUsername, auth }) => {

    useEffect(() => {
        getUsers()
    }, [])

    let [searchedUsername, setSearchedUsername] = useState('')
    const searchForUser = (e) => {
        e.preventDefault();
        if (searchedUsername === '' || searchedUsername === null) {
            getUsers();
        } else {
            searchByUsername(searchedUsername);
            setSearchedUsername('')
        }
    }

    return (
        <StyledComponentsTopicSearch>
            <header className="search-user">
                <p>Wyszukiwarka użytkowników</p>
                <form>
                    <input placeholder="Wyszukaj..." value={searchedUsername} onChange={(e) => setSearchedUsername(e.target.value)} />
                    <button onClick={(e) => searchForUser(e)}>
                        wyszukaj
                    </button>
                </form>
            </header>
            <div className="users-wrapper">
                <UserWrapper users={auth.users} key={auth._id} />
            </div>
        </StyledComponentsTopicSearch>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { getUsers, searchByUsername })(UsersPage)


const StyledComponentsTopicSearch = styled.div`
    width: 90%;
    max-width:700px;
    margin:  auto;
   
    header {
        margin: 0 auto;
        text-align:center
    }
    input, button {
        border: 1px solid black;
        padding: 5px 15px;
        margin: 10px 0;
        background-color: #fff;
        color: black;
        transition: .3s ease-in-out;
    }
    button:hover {
            background-color: #346589;
            color: white;
    }
    
    .users-wrapper {
        .topic-wrapper {
            margin: 20px 0;
        }
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .topic-user {
            display: flex;
            align-items: center;
            
            p {
                margin-left: 20px;
            }
        }
        .topic-section {
            margin: 5px 0 30px 0;
            border: 1px solid #e9e9e9;
            background-color: #fff;
            padding: 5px 10px;
            max-width: 100px;
            text-align: center;
            transition: .3s ease-in-out;
            &:hover {
                text-decoration: underline;

            }

            a {
                text-decoration: none;
                color: black;;
            }

        }
    }
`