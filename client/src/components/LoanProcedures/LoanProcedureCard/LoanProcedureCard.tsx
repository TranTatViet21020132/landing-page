import React from 'react'
import './LoanProcedureCard.css'
import { Reveal } from '../../Animation/Reveal'
import { Slide } from '../../Animation/Slide'
import { LoanProcedureCardProp } from '../../../types/LandingPage/LoanProcedureCard'

const LoanProcedureCard = (props: LoanProcedureCardProp) => {
  const { data } = props;
  const initialSlideDelay = data.slideDelay || 0;

  return (
    <Reveal hiddenY={data.revealDelay} width='100%'>
      <div className="loan-procedures">

        <div className="loan-procedures-header">
          <h3>{data.header}</h3>
          <h4>{data.subHeader}</h4>
        </div>

        <ul className="loan-procedures-content">
          {data.content.map((item: any, index: number) => {
            const delay = initialSlideDelay * (index + 1) * 2/5;
            return (
              <Slide key={item.id} delay={delay} width='100%'>
                <li className="loanProcedures-item" tabIndex={index}>
                  <div className='item-left'>
                    <div className="item-image">
                      <img src={item.icon} alt="" />
                    </div>

                    <div className="item-content">
                      <h5>{item.item.header}</h5>
                      <span>{item.item.content}</span>
                    </div>
                  </div>

                  <div className="item-counter">
                    <span>{item.id}</span>
                  </div>
                </li>
              </Slide>
            )
          })}
        </ul>

      </div>
    </Reveal>
  )
}

export default LoanProcedureCard
