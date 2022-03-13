
import React from 'react'
import './Course.css'
import userLogo from '../../images/logo/user.svg'
import commentLogo from '../../images/logo/comments.svg'
import { Link } from 'react-router-dom'

function Course({courseFee,desc,name,photo,_id}) {
  return (
    <article className='courseSubContainer'> 
        <div className='courseInnerBody'>
            <img className='courseImg' src={photo} alt="pic" />
        </div>
        <div className='courseBody'>
        <div className='courseTitle'>
        <h3 className='courseName'>{name}</h3>
        </div>
        <div>
        <img className='Icon' src={userLogo} alt="user" /><span className='coursespan'>200</span>
        <img className='Icon' src={commentLogo} alt="comment" /><span className='coursespan'>50</span>
        </div>
        </div>
        <div className='previewCourse'>
            <Link className='previewbtn' to={`/previewCourse/${_id}`}>preview course</Link>
        </div>
    </article>
    )
}

export default Course