import { createSlice } from "@reduxjs/toolkit";
import bookImage from '@assets/imgs/books/olivertwist.jfif'

const initialState = [, {
    id: 3,
    commenterName: 'Commenter Name',
    img: bookImage,
    reply: [],
    text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
}, {
        id: 4,
        commenterName: 'Commenter Name',
        reply: [],
        img: bookImage,
        text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
    }, {
        id: 2,
        commenterName: 'Commenter Name',
        img: bookImage,
        reply: [{
            id: 20,
            commenterName: 'Commenter Name',
            img: bookImage,
            text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
        }, {
            id: 29,
            commenterName: 'Commenter Name',
            img: bookImage,
            text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
        }],
        text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
    }, {
        id: 5,
        commenterName: 'Commenter Name',
        reply: [],
        img: bookImage,
        text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
    }, {
        id: 6,
        commenterName: 'Commenter Name',
        reply: [],
        img: bookImage,
        text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
    }, {
        id: 10,
        commenterName: 'Commenter Name',
        img: bookImage,
        reply: [{
            id: 8,
            commenterName: 'Commenter Name',
            img: bookImage,
            text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
        }, {
            id: 9,
            commenterName: 'Commenter Name',
            img: bookImage,
            text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
        }],
        text: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Itaque enim veniam hic! Omnis fuga, facere eos ullam voluptates neque esse.Deserunt sapiente id perferendis nostrum explicabo facere deleniti praesentium quis'
    }];

const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {}

})

export default comments.reducer