import React from 'react'
import './footer.css'
import { BsFacebook, BsInstagram,BsTwitter,BsMailbox } from "react-icons/bs";
function Footer() {
  return (
    <section className='footer'>
        <div className='branches'>
        <article className='one'>
            <h4>ICT ACADEMY HQ</h4>
            <p className='paraColor'>L-9, Thejaswini Building, Technopark, Thiruvananthapuram, Kerala, India.</p>
            <p className='paraColor'>Phone: 7594051437</p>
        </article>
        <article className='two'>
            <h4>ICT ACADEMY-CENTRAL REGION</h4>
            <p className='paraColor'>Ground Floor,Rajamally Building, Infopark, Koratty, Thrissur, Kerala,</p>
            <p className='paraColor'>India. Phone: 7594051437</p>
            </article>
        <article className='three'>
           <h4>ICT ACADEMY-NORTH REGION</h4>
            <p className='paraColor'>2nd Floor, Ul Cyberpark Building, Nellikode PO, Kozhikode, Kerala, India.</p>
            <p className='paraColor'>Phone: 7594051437</p> 
            </article>
        <article className='four'>
            <h4>ICT ACADEMY-SOUTH REGION</h4>
            <p className='paraColor'>L-9, Thejaswini Building, Technopark, Thiruvananthapuram, Kerala, India.</p>
            <p className='paraColor'>Phone: 7594051437</p>
            </article>
        </div>
        <div className='socialIcons'>
            <BsFacebook className='icons' />
            <BsInstagram className='icons'/>
            <BsMailbox className='icons'/>
            <BsTwitter className='icons'/>
        </div>
        <div className='foot'>
            ICTAK © 2021
        </div>
    </section>
  )
}

export default Footer