import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormPageHook } from './FormPageHook'
import "./FormPage.css";

const FormPage: React.FC = () => {
  const {
    provinces,
    districts,
    wards,
    data,
    setData,
    loanData,
    loading,
    activeStep,
    getDistrictList,
    getWardList,
    handleInputChange,
    handleIndicatorClick,
    handleSubmit,
  } = useFormPageHook();

  return (
    <div className="signup-form-page">
      <ToastContainer />
      <div className="signup-form-container">
        <h2>Signup Form</h2>
        <div className="step-indicator-container">
          <div className={`indicator ${activeStep === 1 ? "active" : ""}`} onClick={() => handleIndicatorClick(1)}>
            <span>1</span>
          </div>
          <div className="line" />
          <div className={`indicator ${activeStep === 2 ? "active" : ""}`} onClick={() => handleIndicatorClick(2)}>
            <span>2</span>
          </div>
        </div>
        <form className="signup-contents" onSubmit={handleSubmit}>
          {activeStep === 1 ? (
            <div>
              <div className="personal-infos">
                <h4>Thông tin cá nhân</h4>
                <div className="input-group">
                  <input
                    onChange={handleInputChange}
                    value={data.first_name}
                    className="form-control text"
                    required
                    dir="auto"
                    type="text"
                    name="first_name"
                    placeholder=""
                  />
                  <label>Tên</label>
                </div>
                <div className="input-group">
                  <input
                    onChange={handleInputChange}
                    value={data.last_name}
                    className="form-control text"
                    required
                    dir="auto"
                    type="text"
                    name="last_name"
                    placeholder=""
                  />
                  <label>Họ</label>
                </div>
              </div>

              <div className="personal-income">
                <h4>Thông tin thu nhập</h4>
                <div className="input-group">
                  <input
                    onChange={handleInputChange}
                    value={data.phone}
                    className="form-control text"
                    required
                    dir="auto"
                    type="text"
                    name="phone"
                    placeholder=""
                  />
                  <label>Số điện thoại</label>
                </div>
                <div className="input-group">
                  <input
                    onChange={handleInputChange}
                    value={data.personal_income}
                    className="form-control text"
                    required
                    dir="auto"
                    min={1000000}
                    type="number"
                    name="personal_income"
                    placeholder=""
                  />
                  <label>Thu nhập cá nhân (VNĐ/tháng)</label>
                </div>
              </div>

              <div className="personal-address">
                <h4>Thông tin địa chỉ</h4>
                <div className="input-group">
                  <select
                    id="province"
                    dir="auto"
                    name="province"
                    onChange={(e) => {
                      const selectedOption = JSON.parse(e.target.value);
                      setData({ ...data, province: selectedOption.name });
                      getDistrictList(selectedOption.code);
                    }}
                    value={JSON.stringify(provinces.find((province) => province.name === data.province))}
                    className="form-control dropdown"
                    required
                  >
                    {provinces?.map((province) => (
                      <option value={JSON.stringify(province)} key={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <label>Tỉnh/Thành phố</label>
                </div>
                {data.province && (
                  <div className="input-group">
                    <select
                      id="district"
                      dir="auto"
                      name="district"
                      onChange={(e) => {
                        const selectedOption = JSON.parse(e.target.value);
                        setData({ ...data, district: selectedOption.name });
                        getWardList(selectedOption.code);
                      }}
                      value={JSON.stringify(districts.find((district) => district.name === data.district))}
                      className="form-control dropdown"
                      required
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts?.map((district) => (
                        <option value={JSON.stringify(district)} key={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <label>Quận/Huyện</label>
                  </div>
                )}
                {data.district && (
                  <div className="input-group">
                    <select
                      id="ward"
                      dir="auto"
                      name="ward"
                      onChange={(e) => {
                        const selectedOption = JSON.parse(e.target.value);
                        setData({ ...data, ward: selectedOption.name });
                      }}
                      value={JSON.stringify(wards.find((ward) => ward.name === data.ward))}
                      className="form-control dropdown"
                      required
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards?.map((ward) => (
                        <option value={JSON.stringify(ward)} key={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    <label>Phường/Xã</label>
                  </div>
                )}
                {data.ward && (
                  <div className="input-group">
                    <input
                      onChange={handleInputChange}
                      value={data.street}
                      className="form-control text"
                      required
                      dir="auto"
                      type="text"
                      name="street"
                      placeholder=""
                    />
                    <label>Số nhà, Phố</label>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="loan-details">
              <h4>Thông tin khoản vay</h4>
              <div className="input-group">
                <input
                  onChange={handleInputChange}
                  value={loanData.loan_amount}
                  className="form-control text"
                  required
                  dir="auto"
                  type="number"
                  name="loan_amount"
                  placeholder=""
                />
                <label>Số tiền vay</label>
              </div>
              <div className="input-group">
                <select
                  id="reason_id"
                  dir="auto"
                  name="reason_id"
                  onChange={handleInputChange}
                  value={loanData.reason_id}
                  className="form-control dropdown"
                  required
                >
                  <option value="1">Dịch vụ thẻ</option>
                  <option value="2">Sản phẩm vay</option>
                  <option value="3">Tiết kiệm</option>
                  <option value="4">Tài khoản</option>
                </select>
                <label>Sản phẩm vay</label>
              </div>
            </div>
          )}

          <button className="signup-btn" type="submit" disabled={loading}>
            {activeStep === 2 ? (loading ? "Submitting..." : "Submit") : loading ? "Submitting..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
