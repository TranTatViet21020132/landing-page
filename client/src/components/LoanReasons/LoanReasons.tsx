import React from 'react'
import { Slide } from '../Animation/Slide'
import { Reveal } from '../Animation/Reveal'
import { FaCircleCheck } from 'react-icons/fa6'
import './LoanReasons.css'

const LoanReasons = () => {
  return (
    <div className='loanReasons-container'>
      <Reveal>
        <div className="loanReasons-header">
          <h3>Vì sao nên chọn vay</h3>
        </div>
      </Reveal>
      
      <div className="loanReasons-content">

          <div className="left-content">
            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Cam kết bảo mật khoản vay tuyệt đối</span>
              </div>
            </Slide>

            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Cam kết bảo mật khoản vay tuyệt đối</span>
              </div>
            </Slide>

            <Slide>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Hỗ trợ nhiệt tình cho mọi trường hợp</span>
              </div>
            </Slide>

          </div>

          <div className="right-content">

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Duyệt hồ sơ nhanh, thẩm định gọn lẹ</span>
              </div>
            </Slide>

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Hợp đồng cho vay rõ ràng minh bạch</span>
              </div>
            </Slide>

            <Slide hiddenX={100}>
              <div className="checkpoint">
                <FaCircleCheck color="#DD3333"/><span>Giải ngân tiền mặt nhanh trong ngày</span>
              </div>
            </Slide>
          </div>

      </div>

    </div>
  )
}

export default LoanReasons