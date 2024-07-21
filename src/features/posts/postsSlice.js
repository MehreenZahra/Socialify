import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'

const initialState = [
    { id: nanoid(),
        avatar:"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
        title :'Usama Shaukat',
        image:"https://images.pexels.com/photos/11852594/pexels-photo-11852594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "To travel is to take a journey into yourself” is a quote by Danny Kaye that speaks to the introspective aspect of travel. When we travel, we are not just physically moving from one place to another but also embarking on a journey of self-discovery. By stepping out of our comfort zones and exposing ourselves to new experiences, we gain a deeper understanding of ourselves and what we value. This quote reminds us that travel can be a powerful tool for personal growth and self-reflection.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
    },
    {id: nanoid(), 
        avatar:"https://images.pexels.com/photos/8575841/pexels-photo-8575841.jpeg",
        title: 'Mehreen Zahra',
        image:"https://images.pexels.com/photos/4866043/pexels-photo-4866043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "Reading opens doors to new worlds and perspectives, sparking imagination and knowledge. It's a journey of discovery, where each page turns into an adventure, and every story enriches the soul. In the quiet moments with a good book, we find solace, inspiration, and growth. Embrace the magic of reading and let it illuminate your mind. Dive into a book today and let the words transform you.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            const postId = nanoid();
            return [...state, { ...action.payload, postId,title: action.payload.title }];
          },
          prepare( id,avatar ,title, content, image) {
            return {
              payload: {
                id,
                date: new Date().toISOString(),
                avatar,
                title,
                content,
                image,
              
              },
    }},
}})

export const {addPost} = postsSlice.actions
export default postsSlice.reducer