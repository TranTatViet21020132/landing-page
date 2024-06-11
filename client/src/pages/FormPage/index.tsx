import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormPage.css";
import UserApi from "../../apis/UserApi";
import axios from "axios";

type UserSignup = {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  personal_income: number;
  province: string;
  district: string;
  ward: string;
  street: string;
};

type LoanApplication = {
  loan_amount: number;
  reason_id: string;
  customer_id: string;
};

type ApiResponse = {
  message?: string;
  data?: {
    id?: string;
    customer_id?: string;
    loan_amount?: number;
    reason?: {
      id?: string;
      type?: string;
      created_at?: string;
      updated_at?: string;
    };
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    personal_income?: number;
    is_verify_otp?: true;
    address?: {
      id?: string;
      city?: string;
      province?: string;
      district?: string;
      ward?: string;
      street?: string;
    };
    status?: string;
    created_at?: string;
    updated_at?: string;
  };
  statusCode?: number;
};

type Province = {
  code: string;
  name: string;
};

type District = {
  code: string;
  name: string;
};

type Ward = {
  code: string;
  name: string;
  province: string;
};

function FormPage() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [data, setData] = useState<UserSignup>({
    email: "trantatviet2003@gmail.com",
    phone: "",
    first_name: "",
    last_name: "",
    personal_income: 1000000, //min 1 million
    province: "",
    district: "",
    ward: "",
    street: "",
  });

  const [loanData, setLoanData] = useState<LoanApplication>({
    loan_amount: 0,
    reason_id: "",
    customer_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const getProvince = async () => {
      const provinces = await axios.get("https://api.mysupership.vn/v1/partner/areas/province", {
        headers: {
          Accept: "application/json",
        },
      });
      setProvinces(provinces.data.results);
    };

    getProvince();
  }, []);

  const getDistrictList = async (provinceCode: string) => {
    const districts = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`, {
      headers: {
        Accept: "application/json",
      },
    });
    setDistricts(districts.data.results);
  };

  const getWardList = async (districtCode: string) => {
    const wards = await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`, {
      headers: {
        Accept: "application/json",
      },
    });
    setWards(wards.data.results);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (activeStep === 1) {
      if (name === "personal_income") {
        const parsedValue = parseInt(value);
        setData({ ...data, [name]: isNaN(parsedValue) ? 0 : parsedValue });
      } else {
        setData({ ...data, [name]: value });
      }
    } else {
      if (name === "loan_amount") {
        const parsedValue = parseInt(value);
        setLoanData({ ...loanData, [name]: isNaN(parsedValue) ? 0 : parsedValue });
      } else {
        setLoanData({ ...loanData, [name]: value });
      }
    }
  };

  const handleIndicatorClick = (step: number) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (activeStep === 1) {
      try {
        toast.dismiss();
        toast.info("Validating, please wait...", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });

        let response: ApiResponse;
        response = await UserApi.addInformation(data);

        if (response.statusCode === 200) {
          toast.dismiss();
          toast.success("Validation successful. Proceeding to next step...", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            theme: "dark",
          });

          setLoanData((prev) => ({ ...prev, customer_id: response.data?.id ?? "" }));
          setActiveStep(2);
          window.scrollTo(0, 0);
        } else {
          toast.dismiss();
          toast.error("Validation failed", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Error validating data!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    } else if (activeStep === 2) {
      try {
        toast.dismiss();
        toast.info("Submitting application, please wait...", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });

        console.log("loanData:", loanData);

        let response: ApiResponse;
        response = await UserApi.loan(loanData);

        if (response.statusCode === 200) {
          toast.dismiss();
          toast.success("Application submitted successfully. Redirecting...", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            theme: "dark",
          });
        } else {
          toast.dismiss();
          toast.error("Application submission failed", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Error submitting application!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    }
  };

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
                    {districts?.map((district) => (
                      <option value={JSON.stringify(district)} key={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <label>Quận/Huyện</label>
                </div>
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
                    {wards?.map((ward) => (
                      <option value={JSON.stringify(ward)} key={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  <label>Phường/Xã</label>
                </div>
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
                <label>Loan Amount</label>
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
                  <option value="1">Volvo</option>
                  <option value="2">Saab</option>
                  <option value="3">Fiat</option>
                  <option value="4">Audi</option>
                </select>
                <label>San pham vay</label>
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
