import React from 'react'
import { Modal } from 'antd';
import OtpInput from 'react-otp-input';
import { Reveal } from '../Animation/Reveal'
import { FaCircleCheck } from "react-icons/fa6";
import thumbnail from '../../assets/images/thumbnail.png'

import { useThumbnailHook } from './ThumbnailHook';

import './Thumbnail.css'

const Thumbnail: React.FC = () => {
  const {
    open,
    otp,
    confirmLoading,
    registerComplete,
    showOtpModal,
    setOtp,
    navigate,
    showModal,
    handleOk,
    handleCancel,
    handleOtpOk,
    handleOtpCancel,
    handlePaste,
    setShowOtpModal
  } = useThumbnailHook();

  React.useEffect(() => {
    if (registerComplete) {
      setTimeout(() => {
        setShowOtpModal(true);
      }, 2000);
    }
  }, [registerComplete]);

  React.useEffect(() => {
    if (otp.length === 6) {
      setTimeout(() => {
        navigate("/form-page");
      }, 2000);
    }
  }, [otp]);

  return (
    <div className='thumbnail-container'>
      <div className='thumbnail-titles'>
        <Reveal>
          <h2>Vay Nhanh - Lãi Mỏng</h2>
        </Reveal>
        <Reveal hiddenY={50}>
          <h1>NHẬN TIỀN TRONG 1 GIỜ</h1>
        </Reveal>

        <div className="checkpoints-container">
          <Reveal hiddenY={50} delay={0.4}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333"/><span>Tư vấn miễn phí và nhiệt tình</span>
            </div>
          </Reveal>
          <Reveal hiddenY={50} delay={0.55}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333"/><span>Chỉ cần chuẩn bị giấy tờ photo</span>
            </div>
          </Reveal>
          <Reveal hiddenY={50} delay={0.7}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333"/><span>Hạn mức duyệt vay 20Tr - 20Tỷ</span>
            </div>
          </Reveal>
        </div>

        <Reveal hiddenY={50} delay={0.85}>
          <div className="thumbnail-button" onClick={showModal}>
            <h4>VAY NGAY</h4>
          </div>
        </Reveal>
      </div>
      <div className="thumbnail-image">
        <img src={thumbnail} alt="" />
      </div>

      <Modal
        title="ĐĂNG KÝ NGAY"
        width={400}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        closable={false}
        maskClosable
        okButtonProps={{style: {background: "#DD3333"}}}
        okText={"Send OTP"}
      >
        <div className="register-form">
          <label htmlFor="email-id">Email</label>
          <input type="email" placeholder='abc@example.com' id='email-id' required/>
        </div> 
      </Modal>

      <Modal
        title="NHẬP MÃ OTP"
        width={400}
        open={showOtpModal}
        onOk={handleOtpOk}
        confirmLoading={confirmLoading}
        onCancel={handleOtpCancel}
        centered
        closable={false}
        maskClosable
        okButtonProps={{ style: { background: "#DD3333" } }}
        okText={"Verify"}
        footer={null}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          onPaste={handlePaste}
          numInputs={6}
          renderSeparator={<></>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{width: "100%", display: "flex", justifyContent: "space-between", height: "5rem"}}
          inputStyle="otp-input"
        />
      </Modal>
    </div>
  )
}

export default Thumbnail