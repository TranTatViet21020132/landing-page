import React, { useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import './Progress.css'

const Progress = () => {
  const [visible, setVisible] = useState(false);
  
  const toggleVisible = React.useCallback(() => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 20){ 
      setVisible(true) 
    }  
    else if (scrolled <= 20){ 
      setVisible(false) 
    } 
  }, []); 
  
  const scrollToTop = React.useCallback(() =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }, []); 
  
  window.addEventListener('scroll', toggleVisible); 

  return (
    <div className='back-to-top-btn'
      onClick={scrollToTop}
      style={{opacity: visible ? '1' : '0'}}
    >
      <FaArrowUp className='back-to-top-icon'/>
    </div>
  )
}

export default Progress