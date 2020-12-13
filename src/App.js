import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LangindPage from './pages/LangindPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import store from './store';
import { Provider } from 'react-redux';
import setAuthenticationToken from './middleware/setAuthenticationToken';
import { userLoaded } from './actions/auth.actions';
import './App.css';
import IsLoggedInRoute from './routes/IsLoggedInRoute';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';
import ChangePassword from './pages/ChangePassword';
import AddPost from './pages/AddPost';
import ChangeProfile from './pages/ChangeProfile';
import AccountPage from './pages/AccountPage';
import UsersPage from './pages/UsersPage';
import UserProfile from './pages/UserProfile';
import Topics from './pages/Topics';
import TopicsPage from './pages/TopicsPage';


if(localStorage.getItem("token")) {
  setAuthenticationToken(localStorage.getItem("token"))
}

const App = () => {

  useEffect(() => {
      store.dispatch(userLoaded())
  }, []);


  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LangindPage} />
          <Route exact path="/contact-us" component={ContactPage}/>
          <PrivateRoute exact path="/users" component={UsersPage}/>
          <Route exact path="/users/user/:user_id" component={UserProfile}/>
          <Route exact path="/topics" component={Topics}/>
          <Route exact path="/topics/topic/:topic_id" component={TopicsPage}/>
          <IsLoggedInRoute exact path="/register" component={RegisterPage} />
          <IsLoggedInRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/change-password" component={ChangePassword}/>
          <PrivateRoute exact path="/add-post" component={AddPost}/>
          <PrivateRoute exact path="/change-profile" component={ChangeProfile}/>
          <PrivateRoute exact path="/account" component={AccountPage}/>
         
        </Switch>
        {/* <Footer /> */}
      </Provider>
    </Router>
  )
}

export default App
