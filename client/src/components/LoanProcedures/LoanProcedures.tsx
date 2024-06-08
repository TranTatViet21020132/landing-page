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

const loanProcedures: LoanProceduresProp = {
  header: "Thủ tục vay đơn giản",
  subHeader: "Chỉ cần giấy photo",
  revealDelay: 0,
  slideDelay: 0.5,
  content: [
    {
      id: "01",
      icon: procedure1,
      item: {
        header: "CHỨNG MINH NHÂN DÂN",
        content: "Hoặc Bằng lái xe, Cavet xe, Passport, Thẻ nhân viên, Các giấy tờ tùy thân khác...",
      }
    },
    {
      id: "02",
      icon: procedure2,
      item: {
        header: "SỔ HỘ KHẨU / KT3",
        content: "Không cần chủ hộ, Sổ đăng ký tạm trú, hoặc các sổ xác nhận, giấy tình hiện có...",
      }
    },
    {
      id: "03",
      icon: procedure3,
      item: {
        header: "CHỨNG TỪ KHÁC (nếu có)",
        content: "Hóa đơn điện, nước, Giấy phép kinh doanh, Hợp đồng, Bảng lương, Biên lai...03",
      }
    },
  ]
};

const loanConditions: LoanProceduresProp = {
  header: "Điều kiện được vay",
  subHeader: "3 điều kiện đơn giản",
  revealDelay: 0.5,
  slideDelay: 0.5,
  content: [
    {
      id: "01",
      icon: condition1,
      item: {
        header: "KHÔNG PHÂN BIỆT NGÀNH NGHỀ",
        content: "Chỉ cần độ tuổi từ 18 đến 60",
      }
    },
    {
      id: "02",
      icon: condition2,
      item: {
        header: "MỌI NGƯỜI ĐỀU VAY ĐƯỢC",
        content: "Hồ sơ đã vay, bị từ chối, xấu vẫn được",
      }
    },
    {
      id: "03",
      icon: condition3,
      item: {
        header: "HÌNH THỨC VAY TÍN CHẤP",
        content: "Sản phẩm vay Ngân hàng & Tư nhân",
      }
    },
  ]
};

const LoanProcedures = () => {
  return (
    <div className='loanProcedures-container'>
      <LoanProcedureCard data={loanProcedures}/>
      <LoanProcedureCard data={loanConditions}/>
    </div>
  )
}

export default LoanProcedures