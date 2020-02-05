import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Posts, postsReducer, ENTITY_POSTS } from './posts';
import Status from '../DataManager/dataStatus';

const postsApp = combineReducers({
    [ENTITY_POSTS]: postsReducer
});

const middleware = [thunk];

export default createStore(postsApp, applyMiddleware(...middleware));

export { Posts, Status };