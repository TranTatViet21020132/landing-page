import React from 'react'
import './LoanProcedures.css'
import procedure1 from '../../assets/images/procedure1.png'
import procedure2 from '../../assets/images/procedure2.png'
import procedure3 from '../../assets/images/procedure3.png'
import condition1 from '../../assets/images/condition1.png'
import condition2 from '../../assets/images/condition2.png'
import condition3 from '../../assets/images/condition3.png'
import LoanProcedureCard from './LoanProcedureCard/LoanProcedureCard'
import { LoanProceduresProp } from '../../types/LandingPage/LoanProcedure'
import { useTranslation } from 'react-i18next'

const LoanProcedures = () => {
  const [translate] = useTranslation();

  const loanProcedures: LoanProceduresProp = {
    header: translate("loanProcedures.header"),
    subHeader: translate("loanProcedures.subHeader"),
    revealDelay: 0,
    slideDelay: 0.5,
    content: [
      {
        id: "01",
        icon: procedure1,
        item: {
          header: translate("loanProcedures.content1.header"),
          content: translate("loanProcedures.content1.content"),
        }
      },
      {
        id: "02",
        icon: procedure2,
        item: {
          header: translate("loanProcedures.content2.header"),
          content: translate("loanProcedures.content2.content"),
        }
      },
      {
        id: "03",
        icon: procedure3,
        item: {
          header: translate("loanProcedures.content3.header"),
          content: translate("loanProcedures.content3.content"),
        }
      },
    ]
  };
  
  const loanConditions: LoanProceduresProp = {
    header: translate("loanConditions.header"),
    subHeader: translate("loanConditions.subHeader"),
    revealDelay: 0.5,
    slideDelay: 0.5,
    content: [
      {
        id: "01",
        icon: condition1,
        item: {
          header: translate("loanConditions.content1.header"),
          content: translate("loanConditions.content1.content"),
        }
      },
      {
        id: "02",
        icon: condition2,
        item: {
          header: translate("loanConditions.content2.header"),
          content: translate("loanConditions.content2.content"),
        }
      },
      {
        id: "03",
        icon: condition3,
        item: {
          header: translate("loanConditions.content3.header"),
          content: translate("loanConditions.content3.content"),
        }
      },
    ]
  };

  return (
    <div className='loanProcedures-container'>
      <LoanProcedureCard data={loanProcedures}/>
      <LoanProcedureCard data={loanConditions}/>
    </div>
  )
}

export default LoanProcedures