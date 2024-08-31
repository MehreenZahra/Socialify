import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import getUserInitials from '../features/utils/getUserInitials';
// import { generateUniqueId } from '../utils/generateUniqueId';

const initialState = [
    { id: nanoid(),
        avatar:"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
        title:'Usama Shaukat',
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
    {id: nanoid(), 
      avatar:"https://images.pexels.com/photos/8575841/pexels-photo-8575841.jpeg",
      title: 'Mehreen Zahra',
      image:"https://images.pexels.com/photos/4419497/pexels-photo-4419497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "Escape to the tranquil beauty of nature. Discover hidden gems on your next adventure. Get ready to unwind and reconnect with the world around you. #travel #naturelover",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
  {id: nanoid(), 
    avatar:"https://images.pexels.com/photos/24181535/pexels-photo-24181535/free-photo-of-man-in-shirt-and-patterned-waistcoat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: 'Tina Mehta',
    image:"https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Code, create, and innovate. Bring your ideas to life with the power of web development. Build something amazing today! #webdevelopment #coding",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/4947563/pexels-photo-4947563.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Frank Foodie',
  image:"https://images.pexels.com/photos/24182556/pexels-photo-24182556/free-photo-of-pizza-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content: "Savor the flavor of Italy with our latest recipe. Learn to make the perfect pizza at home. Get cooking and enjoy! #foodie #pizzarecipe",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Wendy Wander',
  image:"https://images.pexels.com/photos/24549099/pexels-photo-24549099/free-photo-of-beautiful-orange-sunset-with-clouds-over-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content: "Chase sunsets and make memories. Explore the world's most breathtaking beaches. Your next adventure awaits! #travel #beachlife",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Andy Baker',
  image:"https://images.pexels.com/photos/24246004/pexels-photo-24246004/free-photo-of-mexican-dish-with-chili-on-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content: "Nourish your body with healthy delights. Discover new salad recipes and flavors. Eat well, live well! #foodie #healthyliving",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/7848986/pexels-photo-7848986.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Tech Titan',
  image:"https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content: "Build a better digital world. Learn to code and unlock new possibilities. Join the web development community today! #webdevelopment #career",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Sweet Sara',
  image:"https://images.pexels.com/photos/24182671/pexels-photo-24182671/free-photo-of-strawberries-and-chocolate-on-cake-on-leaves.jpeg?auto=compress&cs=tinysrgb&w=600",
  content: "Indulge in rich flavors and sweet treats. Bake the perfect chocolate cake with our recipe. #foodie #chocolatecake",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/24181535/pexels-photo-24181535/free-photo-of-man-in-shirt-and-patterned-waistcoat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  title: 'David Coder',
  content: "Join forces and build something amazing. Learn about code collaboration and teamwork. #webdevelopment #teamwork",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Sweet Sara',
  content: "Build a better digital world with web development.Learn to code and unlock new possibilities.Create seamless user experiences and stay ahead.Join the web development community and grow.Transform your ideas into reality, one line of code at a time.",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/12169270/pexels-photo-12169270.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Wanderer Sara',
  image:"https://images.pexels.com/photos/24532104/pexels-photo-24532104/free-photo-of-cascade-of-large-creeks-on-wide-river-in-rhine-falls-in-switzerland.jpeg?auto=compress&cs=tinysrgb&w=600",
  content: "Chase waterfalls and explore the great outdoors. Get ready for your next adventure. #travel #outdoorlove",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
{id: nanoid(), 
  avatar:"https://images.pexels.com/photos/12169270/pexels-photo-12169270.jpeg?auto=compress&cs=tinysrgb&w=600",
  title: 'Wanderer Sara',
  image:"https://images.pexels.com/photos/24532104/pexels-photo-24532104/free-photo-of-cascade-of-large-creeks-on-wide-river-in-rhine-falls-in-switzerland.jpeg?auto=compress&cs=tinysrgb&w=600",
  content: "Chase waterfalls and explore the great outdoors. Get ready for your next adventure. #travel #outdoorlove",
  date: sub(new Date(), { minutes: 5 }).toISOString(),
},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            const postId = nanoid();
            const user = JSON.parse(localStorage.getItem('currentUser'));
            // const userId = generateUniqueId(); 
            const post = { ...action.payload, id: postId,userId : user.userId ,postId, title: action.payload.title, avatar: action.payload.avatar || getUserInitials(user.firstName, user.lastName) };
            console.log('Current user:', user); 
            // const userId = user.userId || generateUniqueId(); 
            if (!post.avatar) {
              post.avatar = getUserInitials(action.payload.title); // only update avatar if it's not provided
            }
            return [...state,post]
          },
          prepare( id,avatar ,title, content, image) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            // const initials = getUserInitials(user.firstName);
            return {
              payload: {
                id: user.userId,
                date: new Date().toISOString(),
                avatar: avatar,
                title,
                content,
                image,
              
              },
    }},
        // deletePost (state, action){
        //   const postId = action.payload;
        //   return state.filter((post) => post.id !== postId);
        // },
        // deletePost(state, action) {
          // const postId = action.payload.postId;
          // const userId = action.payload.userId;
          // const postIndex = state.posts.findIndex((post) => post.postId === action.payload.postId);
          // if (postIndex !== -1 && state.posts[postIndex].userId === action.payload.userId) {
          //   state.posts.splice(postIndex, 1);
          //   return true;
          // }
          // return false;
          // deletePost: (state, action) => {
            // deletePost (state, action){
            //   const postId = action.payload;
            //   return state.filter((post) => post.id !== postId);
            // },
            // deletePost(state, action) {
            
            
            //   state.posts = state.posts.find((post) => post.postId !== action.payload);
            // }
            deletePost(state, action) {
              console.log('Delete post reducer called, postId:', action);
              const postId = action.payload;
              const userId = JSON.parse(localStorage.getItem('currentUser')).userId;
              state = state.filter((post) => post && post.id !== postId || post.userId !== userId);
              return state;
            }
            
        },
      
})

export const {addPost, deletePost} = postsSlice.actions
export default postsSlice.reducer