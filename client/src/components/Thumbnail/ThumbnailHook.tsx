import React, { useState } from 'react'
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";

export function useThumbnailHook() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [registerComplete, setRegisterComplete] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = React.useCallback(() => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      notification.success({
        message: "Đăng ký thành công",
        placement: "top",
        duration: 2,
      });
      setRegisterComplete(true);
    }, 2000);
  }, [setConfirmLoading, setOpen, setRegisterComplete]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOtpOk = React.useCallback(() => {
    // Handle OTP submission logic
    console.log('OTP:', otp);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setShowOtpModal(false);
    }, 2000);

  }, [setConfirmLoading, setShowOtpModal, otp]);

  const handleOtpCancel = () => {
    setShowOtpModal(false);
  };

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData('text');
    console.log(data)
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
    setShowOtpModal
  }
}