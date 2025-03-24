
import nodemailer from 'nodemailer'
export const POST = async (req) => {
  const {subject, content} = await req.json()

  
  try {
const transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dannymay116@zohomail.com',
        pass: 'N1Wg5j627yKx'
    },
    tls: {
    //     rejectUnauthorized: false
    minVersion:'TLSv1.2'
    }
})

const mailOptions = {
    from: 'dannymay116@zohomail.com',
    to: 'torrentboy149@gmail.com',
    subject: subject,
    html: `
    <h2>Hello There</h2>
    <li> title: ${subject} </li>
    <li> content: ${content} </li>
    `
}


 
    await transporter.sendMail(mailOptions)
    return new Response (JSON.stringify({message: 'Email sent successfully'}), {status:201})
 } catch(err) {
    console.error(err)
    return new Response (err, {status: 500})
 }

 
}
