/**
 * Store used purely for demo / testing purposes
 * simulates delayed api requests etc
 */

import { createActions, createReducer } from '../DataManager/manager';
import entityStatus from '../DataManager/dataStatus';

/**
 * Simulates a delay
 * @param {number} milliseconds 
 */
const delay = (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    })
}

const dummy = [
    {
        ident: "12",
        title: "Title 1",
        body: "Body 1"
    },
    {
        ident: "23",
        title: "Title 2",
        body: "Body 2"
    },
    {
        ident: "34",
        title: "Title 3",
        body: "Body 3"
    }
];

// 
export const ENTITY_POSTS = "POSTS";
export const postsReducer = createReducer(ENTITY_POSTS);

const actions = createActions(ENTITY_POSTS);

// Thunks - complex dispatchable functions:

const posts_fetch = () => {
    return (dispatch) => {
        console.log("posts_fetch");
        dispatch(actions.set_status(entityStatus.BUSY));
        delay(5000)
            .then(() => {
                console.log("add range");
                dispatch(actions.add_range(dummy));
            } )
            .catch(() => console.log("oh, shit"));
    }
}

const posts_add = (post) => {
    return (dispatch) => {
        dispatch(actions.item_add(post, false));
        delay(5000)
            .then(() => {
                dispatch(actions.item_set_status(post.ident, entityStatus.READY))
            })
    }
}

/**
 * publicly acessible functions for the store
 */
export const Posts = {
    // useDispatch() functions
    fetchData: () => posts_fetch(),
    getPost: (state, ident) => state[ENTITY_POSTS].items.find(item => item.ident === ident),
    add: (post) => posts_add({...post, ident: Math.floor(Math.random()*100).toString()}),

    // useSelector() functions
    status: (state) => state[ENTITY_POSTS].status,
    items: (state) => state[ENTITY_POSTS].items,
    idents: (state) => state[ENTITY_POSTS].items && state[ENTITY_POSTS].items.map(item => item.ident)
}