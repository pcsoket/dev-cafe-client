import React from 'react';
import {
  Switch, BrowserRouter as Router, Route,
} from 'react-router-dom';

import Home from './Home';
import Users from './UsersPage';
import OldPosts from './PostsPage';
import NoMatch from './NoMatch';
import Login from './Login';
import Signup from './Signup';
import Header from './layout/Header';
import MainPageNav from './layout/MainPageNav';
import ManageCategoriesPage from './categories/ManageCategoriesPage';

import './App.scss';
import PostListPage from './posts/PostListPage';
import PostPage from './posts/PostPage';
import Write from './posts/Write';
import EditPostPage from './posts/EditPostPage';
import CategoryMenu from './categories/CategoryMenu';
import AdminPage from './AdminPage';

const App = () => (
  <Router>
    <div className="App">
      <Header/>
      <main className="content">
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/oldPosts" component={OldPosts} />
            <Route path="/posts/:id" component={PostPage} />
            <Route exact path="/posts" component={PostListPage} />
            <Route path="/write/:categoryId" component={Write} />
            <Route path="/edit/:id" component={EditPostPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/categoryManager" component={ManageCategoriesPage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <div className="main-nav">
          <MainPageNav/>
        </div>
      </main>
      <aside className="side">
        <CategoryMenu/>
      </aside>
      <footer className="main-footer">
        <hr/>
        <p>Would you like a cup of coffee?</p>
      </footer>
    </div>
  </Router>
);

export default App;
