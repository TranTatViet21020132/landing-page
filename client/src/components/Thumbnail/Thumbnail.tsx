import React from "react";
import { Modal } from "antd";
import OtpInput from "react-otp-input";
import { Reveal } from "../Animation/Reveal";
import { FaCircleCheck } from "react-icons/fa6";
import thumbnail from "../../assets/images/thumbnail.png";

import { useThumbnailHook } from "./ThumbnailHook";
import { useTranslation } from "react-i18next";

import "./Thumbnail.css";
import { FormContext } from '../../context/formContext';
import { FormContextType } from "../../types/FormPage/FormContext";

const Thumbnail: React.FC = () => {
  const {
    open,
    otp,
    confirmLoading,
    registerComplete,
    showOtpModal,
    setOtp,
    showModal,
    handleOk,
    handleCancel,
    handleOtpOk,
    handleOtpCancel,
    handlePaste,
    setShowOtpModal,
  } = useThumbnailHook();

  const { email, setEmail } = React.useContext(FormContext) as FormContextType;

  const [translate] = useTranslation();

  React.useEffect(() => {
    if (registerComplete) {
      setTimeout(() => {
        setShowOtpModal(true);
      }, 2000);
    }
  }, [registerComplete]);

  React.useEffect(() => {
    if (otp.length === 6) {
      handleOtpOk(email);
    }
  }, [otp]);

  return (
    <div className="thumbnail-container">
      <div className="thumbnail-titles">
        <Reveal>
          <h2>{translate("thumbnail.header")}</h2>
        </Reveal>
        <Reveal hiddenY={50}>
          <h1>{translate("thumbnail.subHeader")}</h1>
        </Reveal>

        <div className="checkpoints-container">
          <Reveal hiddenY={50} delay={0.4}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333" />
              <span>{translate("thumbnail.checkpoint1")}</span>
            </div>
          </Reveal>
          <Reveal hiddenY={50} delay={0.55}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333" />
              <span>{translate("thumbnail.checkpoint2")}</span>
            </div>
          </Reveal>
          <Reveal hiddenY={50} delay={0.7}>
            <div className="checkpoint">
              <FaCircleCheck color="#DD3333" />
              <span>{translate("thumbnail.checkpoint3")}</span>
            </div>
          </Reveal>
        </div>

        <Reveal hiddenY={50} delay={0.85}>
          <div className="thumbnail-button" onClick={showModal}>
            <h4>{translate("thumbnail.button.title")}</h4>
          </div>
        </Reveal>
      </div>
      <div className="thumbnail-image">
        <img src={thumbnail} alt="" />
      </div>

      <Modal
        title={translate("thumbnail.registerModal.title")}
        width={400}
        open={open}
        onOk={() => handleOk(email)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        closable={false}
        maskClosable
        okButtonProps={{ style: { background: "#DD3333" } }}
        okText={"Send OTP"}
      >
        <div className="register-form">
          <label htmlFor="email-id">Email</label>
          <input
            type="email"
            placeholder="abc@example.com"
            id="email-id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        title={translate("thumbnail.otpModal.title")}
        width={400}
        open={showOtpModal}
        onOk={() => handleOtpOk(email)}
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
          containerStyle={{ width: "100%", display: "flex", justifyContent: "space-between", height: "5rem" }}
          inputStyle="otp-input"
        />
      </Modal>
    </div>
  );
};

export default Thumbnail;
