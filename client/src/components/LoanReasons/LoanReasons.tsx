import React from 'react'
import { Slide } from '../Animation/Slide'
import { Reveal } from '../Animation/Reveal'
import { FaCircleCheck } from 'react-icons/fa6'
import './LoanReasons.css'
import { useTranslation } from 'react-i18next'

const LoanReasons = () => {
  const [translate] = useTranslation();

  return (
    <div className='loanReasons-container'>
      <Reveal>
        <div className="loanReasons-header">
          <h3>{translate("loanReasons.checkpoint1")}</h3>
        </div>
      </Reveal>
      
      <div className="loanReasons-content">

          <div className="left-content">
            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint1")}</span>
              </div>
            </Slide>

            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint2")}</span>
              </div>
            </Slide>

            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint3")}</span>
              </div>
            </Slide>

          </div>

          <div className="right-content">

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint4")}</span>
              </div>
            </Slide>

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint5")}</span>
              </div>
            </Slide>

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>{translate("loanReasons.checkpoint6")}</span>
              </div>
            </Slide>
          </div>

      </div>

    </div>
  )
}

export default LoanReasons