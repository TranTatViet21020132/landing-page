import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormPageHook } from './FormPageHook'
import { useTranslation } from "react-i18next";
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

  const [translate] = useTranslation();

  return (
    <div className="signup-form-page">
      <ToastContainer />
      <div className="signup-form-container">
        <h2>{translate("formPage.header")}</h2>
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
                <h4>{translate("formPage.subHeader.personalDetails")}</h4>
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
                  <label>{translate("formPage.label.firstName")}</label>
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
                  <label>{translate("formPage.label.lastName")}</label>
                </div>
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
                  <label>{translate("formPage.label.phone")}</label>
                </div>
              </div>

              <div className="personal-income">
                <h4>{translate("formPage.subHeader.incomeDetails")}</h4>
                <div className="input-group">
                  <input
                    onChange={handleInputChange}
                    value={data.identification}
                    className="form-control text"
                    required
                    dir="auto"
                    type="text"
                    name="identification"
                    placeholder=""
                  />
                  <label>{translate("formPage.label.identification")}</label>
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
                  <label>{translate("formPage.label.income")}</label>
                </div>
              </div>

              <div className="personal-address">
                <h4>{translate("formPage.subHeader.addressDetails")}</h4>
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
                  <label>{translate("formPage.label.address.province")}</label>
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
                    <label>{translate("formPage.label.address.district")}</label>
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
                    <label>{translate("formPage.label.address.ward")}</label>
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
                    <label>{translate("formPage.label.address.street")}</label>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="loan-details">
              <h4>{translate("formPage.subHeader.loanDetails")}</h4>
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
                <label>{translate("formPage.label.loanAmount")}</label>
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
                  <option value="1">{translate("formPage.option.loanProduct1")}</option>
                  <option value="2">{translate("formPage.option.loanProduct2")}</option>
                  <option value="3">{translate("formPage.option.loanProduct3")}</option>
                  <option value="4">{translate("formPage.option.loanProduct4")}</option>
                </select>
                <label>{translate("formPage.label.loanProducts")}</label>
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
