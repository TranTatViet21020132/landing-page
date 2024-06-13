import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../../apis/UserApi";
import { District, Province, Ward } from "../../types/FormPage/Address";
import { UserSignup } from "../../types/FormPage/UserSignup";
import { LoanApplication } from "../../types/FormPage/LoanApplication";
import { FormContext } from "../../context/formContext";
import { FormContextType } from "../../types/FormPage/FormContext";
import axios from "axios";

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
    identification?: string;
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

export function useFormPageHook() {
  const { email } = React.useContext(FormContext) as FormContextType;
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [data, setData] = useState<UserSignup>({
    email: email,
    phone: "",
    first_name: "",
    last_name: "",
    identification: "",
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

  return {
    provinces,
    districts,
    wards,
    data,
    setData,
    loanData,
    setLoanData,
    loading,
    activeStep,
    getDistrictList,
    getWardList,
    handleInputChange,
    handleIndicatorClick,
    handleSubmit,
  };
}
