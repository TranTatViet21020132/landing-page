import React from 'react'
import './Card.css'
import { Reveal } from '../../Animation/Reveal';
import { CardProp } from '../../../types/LandingPage/Card';

const Card = (props: CardProp) => {
  const { title, description, imageUrl, hiddenY } = props;
  return (
    <Reveal hiddenY={hiddenY}>
      <div className='card-container'>
        <div className="card-image">
          <img src={imageUrl} alt="" />
        </div>

        <div className="card-content">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Reveal>

  )
}

export default Card