'use client'
import { useState, useEffect} from "react"
import { useAuth } from "../context/AuthContext"
 const Form = () => {  

const {currentUser,
  userDataObj,
  signup,
  login,
  addpost
} = useAuth()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [content, setContent] = useState('')

useEffect(() => {
  if(!currentUser || !userDataObj) {
    return; // Return early if not authenticated or userDataObj is not available. 
  }
},[currentUser, userDataObj]);

const handleSubmit = () => { 

    signup(email, password)
}

const addPost = (e) => {
  e.preventDefault()
  addpost(content)
}
  return ( 
    <>
    <form onSubmit={handleSubmit}>
        <label>
            Email address:
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email} type="email" name="email" />
        </label>
        <label>
            Password:
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password} type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
    </form>
    <button onClick={() => login(email,password)}>Login</button>
    {currentUser && <div>
      {currentUser.email}
      <form onSubmit={(e) => addPost(e)}>
        <input 
        onChange={(e) =>  setContent(e.target.value)}
        value={content}
        type="text"name="content" placeholder="Content" />
        <button type="submit">Add Post</button>
      </form>
      </div>}
    </>

   
  )
}

export default Form