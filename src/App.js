import React from 'react';
import PostsList from './Components/PostsList';
import { useDispatch } from 'react-redux';
import { Posts } from './Stores';

function App() {
  const dispatch = useDispatch();
  dispatch(Posts.fetchData());
  return (
    <div>
      <div>Hello</div>
      <PostsList />
    </div>
  );
}

export default App;
