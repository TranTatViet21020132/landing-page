import React from 'react'
import './LoanDetailCard.css'
import { Reveal } from '../../Animation/Reveal';
import { LoanDetailCard } from '../../../types/LandingPage/LoanDetail';

const Card = (props: LoanDetailCard) => {
  const { title, description, hiddenY, delay } = props;
  return (
    <Reveal hiddenY={hiddenY} delay={delay} width='100%'>
      <div className='loanDetailCard-container'>
        <h4>{title}</h4>
        <div className="loanDetailCard-content">
          {typeof description === "string"
          ?
          <ul className='discription-list'>
            <li>{description}</li>
          </ul>
          :
          <ul className='discription-list'>
            <li>{description.line1}</li>
            <li>{description.line2}</li>
            <li>{description.line3}</li>
            <li>{description.line4}</li>
          </ul>
          }          
        </div>
      </div>
    </Reveal>

  )
}

export default Card