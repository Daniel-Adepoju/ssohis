import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav>
        <Link href='/'>Home</Link>
        <Link href="/register">Register</Link>
        <Link href="/send_email">Send Email</Link>
    </nav> 
  )

}

export default Nav