'use client'
import { useState } from 'react'
const SendPage = () => {
const [subject, setSubject] = useState('')
const [content, setContent] = useState('')

   const sendEmail = async () => {
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content })
      })
      console.log('client side success')
      return res
   } catch (err) {
    console.error(err.message)
   }
  }
  function handlesubmit(e) {
    e.preventDefault()
    sendEmail()
  }
  return (
    <>
    <form onSubmit={handlesubmit}> 
      <label>
        Subject:
        <input
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
        type="text" name="text" />
      </label>
      <label>
        Content:
        <textarea 
        onChange={(e) => setContent(e.target.value)}
        value={content}
        name="message" rows="6" cols="80">
        </textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default SendPage