import React, { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useThumbnailHook() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [registerComplete, setRegisterComplete] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = React.useCallback(
    async (email: string) => {
      setConfirmLoading(true);

      try {
        const response = await axios.post("http://localhost:8080/api/register", {
          email,
        });

        if (response && response.status === 200) {
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            notification.success({
              message: response.data.message,
              placement: "top",
              duration: 2,
            });
            setRegisterComplete(true);
          }, 2000);
        }
      } catch (err: any) {
        if (err?.response?.data.statusCode === 400) {
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            notification.error({
              message: err?.response?.data.message,
              placement: "top",
              duration: 2,
            });
            setRegisterComplete(false);
          }, 2000);
        } else {
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            notification.error({
              message: `Đăng ký thất bại, ${err.message}`,
              placement: "top",
              duration: 2,
            });
            setRegisterComplete(false);
          }, 2000);
        }
      }
    },
    [setConfirmLoading, setOpen, setRegisterComplete]
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOtpOk = React.useCallback(
    async (email: string) => {
      // Handle OTP submission logic
      console.log("OTP:", otp);
      try {
        const response = await axios.post("http://localhost:8080/api/register/check-otp", {
          email,
          otp,
        });

        if (response && response.status === 200) {
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            notification.success({
              message: response.data.message,
              placement: "top",
              duration: 2,
            });
            setRegisterComplete(true);
            setShowOtpModal(false);
            navigate("/form-page");
          }, 2000);
        }
      } catch (err: any) {
        if (err?.response?.data.statusCode === 400) {
          setTimeout(() => {
            setShowOtpModal(true);
            setOtp("");
            notification.error({
              message: err?.response?.data.message,
              placement: "top",
              duration: 2,
            });
          }, 2000);
        } else {
          setTimeout(() => {
            setOtp("");
            notification.error({
              message: `Internal Server, ${err.message}`,
              placement: "top",
              duration: 2,
            });
          }, 2000);
        }
      }
    },
    [setConfirmLoading, setShowOtpModal, otp]
  );

  const handleOtpCancel = () => {
    setShowOtpModal(false);
  };

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    console.log(data);
  };

  return {
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
    setShowOtpModal,
  };
}
