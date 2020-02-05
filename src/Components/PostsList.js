import React, { useState } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Posts, Status } from '../Stores';

/**
 * Purely demonstratable components
 * 
 * @param {*} props 
 */

const PostsList = (props) => {
    const idents = useSelector((state) => Posts.idents(state), shallowEqual);
    const status = useSelector((state) => Posts.status(state));
    
    if (status !== Status.READY) {
        return (
            <div>
                Busy bee!
            </div>
        )
    }
    
    else {
        console.log("rendering list")
        const postItems = idents.map((ident) => {
            return (
                <PostItem ident={ident.toString()} key={ident.toString()} />
            )
        });

        return (
            <div>
                {postItems}
                <AddItem />
            </div>
        )
    }
}

export default PostsList;

export const PostItem = ({ ident }) => {
    const post = useSelector(state => Posts.getPost(state, ident), shallowEqual);
    if (post) {
        console.log(`rendering ${post.ident}`);
        return (
            <div style={{border: "1px #eee solid"}}>
                <p>{post.ident}</p>
                <p>{post.title}</p>
                <p>{post.body}</p>
                <p>{post.status===Status.READY?"":"worker bee"}</p>
            </div>
        );
    }
    return null;
}

export const AddItem = () => {
    const dispatch = useDispatch();

    const [ newItem, setNewItem ] = useState({});

    const update = (event) => {
        const { name, value } = event.target;
        setNewItem({...newItem, [name]: value});
    }

    const add = (event) => {
        dispatch(Posts.add(newItem));
    }

    return (
        <div>
            <p><input name="title" value={ newItem.title || "" } onChange={update} /></p>
            <p><input name="body" value={ newItem.body || "" } onChange={update} /></p>
            <button onClick={add}>Add</button>
        </div>
    );
}