import React from 'react'
import './AdvantageCards.css'
import Card from './Card/Card'
import advan1 from '../../assets/images/advan1.png'
import advan2 from '../../assets/images/advan2.png'
import advan3 from '../../assets/images/advan3.png'
import advan4 from '../../assets/images/advan4.png'

const cardContent = [
  {
    title: "LÃI SUẤT CỰC TỐT",
    description: "Lãi suất tối đa từ 1,5%/tháng Lãi suất tối đa APR 18%/năm",
    imageUrl: advan1,
    hiddenY: 25,
  },
  {
    title: "HẠN MỨC RẤT CAO",
    description: "Giải ngân tiền mặt trong ngày Được duyệt vay lên tới 20 Tỷ",
    imageUrl: advan2,
    hiddenY: -25,
  },
  {
    title: "TRẢ GÓP LINH HOẠT",
    description: "Kỳ hạn vay tối thiểu 3 tháng Kéo dài tối đa đến 36 tháng",
    imageUrl: advan3,
    hiddenY: 25,
  },
  {
    title: "THƯƠNG HIỆU UY TÍN",
    description: "Chúng tôi kết nối minh bạch Giữa khách hàng và nơi cho vay",
    imageUrl: advan4,
    hiddenY: -25,
  }
]

const AdvantageCards = () => {
  return (
    <div className='advantageCards-container'>
      {cardContent.map((item, index) => (
        <Card
        title={item.title}
        description={item.description} 
        imageUrl={item.imageUrl}
        hiddenY={item.hiddenY}
        />
      ))}
    </div>
  )
}

export default AdvantageCards