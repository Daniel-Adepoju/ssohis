'use client'
import {auth, db} from '../firebase'
import { createContext, useContext,useEffect,useState } from "react";
import {onAuthStateChanged,signOut,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {addDoc, collection, getDocs } from 'firebase/firestore';


const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
 const [currentUser, setCurrentUser] = useState(null)
 const [userDataObj, setUserDataObj] = useState({})
 const [loading, setLoading] = useState(true)   
 
 //Auth Routine

 const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth,email, password)
 }
 const login = (email, password) => {
    return signInWithEmailAndPassword(auth,email, password)
 }
 const logout = () => {
    setCurrentUser(null)
    setUserDataObj({})
    return signOut(auth)
 }

 //Add Post

 const addpost = async (content) => {
   if(currentUser) {
    const docRef = await addDoc(collection(db,'posts'), {
        content,
        createdAt: new Date(),
        userId: currentUser.uid,
    })
    console.log(`Document ${docRef.id} added!`)
   } else {
      console.log('log in to post')
   }
 }

 //Fetch User Data

 useEffect(() => {
    
  const unsubscribe = onAuthStateChanged(auth, async user => {
  try {
  setLoading(true)
  setCurrentUser(user)
  if(!user){
   console.log('No User Found')
    return
  }
   //Fetch data if user exists
   
   const docRef = collection(db, 'posts')
   // const q = query(docRef,where('userId', '==', user.uid))
   const docSnap = await getDocs(docRef)
   let firebaseData = {}
   if (!docSnap.empty) {
    docSnap.forEach((doc) => {
      firebaseData = doc.data()
       console.log(firebaseData)
    })
   }
   setUserDataObj(firebaseData)
  } catch (err) {
   console.error(err)  
} finally {setLoading(false)}
  })
  return unsubscribe;
 },[])

 
 const value = {
    currentUser,
    signup,
    login,
    logout,
    userDataObj,
    loading,
    addpost
 }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider