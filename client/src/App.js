import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './components/AuthProvider';
import AuthRequired from './components/AuthRequired';
import Layout from './components/Layout';
import Feed from './components/Feed';
import ArticleList from './components/ArticleList';
import ArticleCreate from './components/ArticleCreate';
import ArticleView from './components/ArticleView';
import Comments from "./components/Comments";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Accounts from "./components/Accounts";
import NotFound from "./components/NotFound";
import FollowersList from "./components/FollowersList";
import FollowingList from "./components/FollowingList";

function App() {
  return (
    <Router>
      {/* AuthProvider : Routes를 감싼다 */}
      <AuthProvider>
        {/* Routes : Route를 감싼다 */}
        <Routes>
          {/* 인증이 필요한 라우트 (트리형 라우트) */}
          <Route path="/" element={
            // 로그인이 필요하다 
            // >> Layout(바뀌지 않는 부분 : header, nav, footer) 으로 들어가기 위해 AuthRequired를 통과해야한다
            <AuthRequired>
              <Layout />
            </AuthRequired>
          }>
            {/* 바뀌는 부분 : contents */}
            <Route index element={<Feed />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="search" element={<Search />} />
            <Route path="create" element={<ArticleCreate />} />
            <Route path="article/:articleId">
              <Route index element={<ArticleView />} />
              <Route path="comments" element={<Comments />} />
            </Route>

            {/* profile/:username/ : 중복되는 부분 >> 트리형이 가능하다 */}
            {/* <Route path="profile/:username" element={<Profile />}/> */}
            {/* <Route path="profile/:username/followers" element={<FollowersList />} /> */}
            {/* <Route path="profile/:username/following" element={<FollowingList />} /> */}

            <Route path="profile/:username">
              <Route index element={<Profile />} />
              <Route path="followers" element={<FollowersList />} />
              <Route path="following" element={<FollowingList/>}/>
            </Route>

            <Route path="accounts/edit" element={<Accounts />} />
          </Route>

          {/* 인증이 필요하지 않은 라우트 (로그인이 필요하지 않음) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;