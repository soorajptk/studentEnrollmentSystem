import './SingleCourse.css'
import React, { useEffect, useState } from "react";
import {faTrash,faEdit,faCamera} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useParams ,useNavigate, Link} from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from '../../context';
import spinner from '../../images/spinner.gif'

function SingleCourse() {
    const navigate=useNavigate()
const {user,singleData,setSingleData,setReload,setSuccess,setError}=useGlobalContext()
 const { id } = useParams();
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setloading] = useState(false);

  const handleUpload=async(e)=>{
    let data=new FormData()
    data.append('image',e.target.files[0])
    try{
        const response=await axios.post('/api/fileupload',data)
        setSingleData({...singleData,photo:response.data.image})
    }catch(err){

    }
    }

  useEffect(() => {
    setloading(true)
    const FetchData = async () => {
        try {
    const response=await axios.get(`/api/course/${id}`)
    setloading(false)
    setSingleData(response.data.course)        
    } catch (error) {
      setError(error.response)

      }
    };
    FetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleData({...singleData,[name]:value})
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReload('')
    try {
    const response=await axios.patch(`/api/course/${id}`,singleData)
   setSuccess(response.data.msg)
        navigate('/')
        setReload('s')
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleRemovePost = async (e) => {
      e.preventDefault()
    try {
    const response=await axios.delete(`/api/course/${id}`)
       setSuccess(response.data.msg)
        setReload('s')
       navigate('/')
    } catch (error) {
    console.log(error.response) 

    }
  };

  if (loading) {
    return <main className='loading'>
      <img className='spinner' src={spinner} alt="spinner" />
    </main>
  }

  return (
    <section className="viewBlogContainer">
      <form >
        <div className="ImgSection">
          {updateMode && (
            <>
              <label className="imgIcon" htmlFor="blogImage">
                <FontAwesomeIcon icon={faCamera}
                  style={{ backgroundColor: "white", borderRadius: "3px" }}
                />
              </label>
              <input
                style={{ display: "none" }}
                onChange={handleUpload}
                type="file"
                name=""
                id="blogImage"
              />
            </>
          )}
          <img
            className="viewBlogImg"
            src={singleData?.photo}
            alt={singleData?.name}
          />
        </div>
        <div className="viewBlogBody">
          <div className="viewBlogHeader">
            {updateMode ? (
              <input
              value={singleData?.name}
                autoFocus={true}
                onChange={handleChange}
                className="updateModeTitle"
                type="text"
                name="name"
              />
            ) : (
              <>
                <h1 className="viewBlogHeading">
                  {singleData?.name}
                </h1>
                {user?.role === "admin" && (
                  <div className="viewBlogBtn">
                    <button>
                      <FontAwesomeIcon icon={faEdit}
                        onClick={() => setUpdateMode(true)}
                        className="edit"
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faTrash}
                        onClick={handleRemovePost}
                        className="delete"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="viewBlogAuthor">
            {!updateMode ? <h3 >
              <span style={{ color: "lightgreen",marginRight:'1rem'}}>CourseFee:</span>
              {singleData?.courseFee}
            </h3> : <><h3>courseFee</h3>
            <input style={{fontSize:'18px',border:'1px solid grey'}} type="text" onChange={handleChange} name='courseFee' value={singleData?.courseFee} />
            </> }
           {
             !updateMode ?  <h3>
              <span style={{ color: "lightgreen",marginRight:'1rem' }}>Eligibilty:</span>
              {singleData?.Eligibility}
            </h3>: <>
            <h3>Eligibilty</h3>
            <input type="text" style={{fontSize:'18px',border:'1px solid grey'}} name='Eligibility' onChange={handleChange} value={singleData?.Eligibility} />
            </>
           }
            
           
          </div>
          <div className="viewBlogDesc">
            {updateMode ? (
              <textarea
              value={singleData?.desc}
                className="updateModeTextarea"
                name="desc"
                onChange={handleChange}
              ></textarea>
            ) : (
              <p className="Blogdesc">{singleData?.desc}</p>
            )}
          </div>
          {
            !user && <div><Link className='enroll' to={'/register'}>enroll</Link></div>
          }

          {updateMode && (
            <button type="submit" onClick={handleSubmit} className="updateModeBtn">
              publish
            </button>
          )}
        </div>
      </form>
    </section>
  );




}

export default SingleCourse