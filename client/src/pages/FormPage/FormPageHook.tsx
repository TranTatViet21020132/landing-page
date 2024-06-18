import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../../apis/UserApi";
import { District, Province, Ward } from "../../types/FormPage/Address";
import { UserSignup } from "../../types/FormPage/UserSignup";
import { LoanApplication } from "../../types/FormPage/LoanApplication";
import { FormContext } from "../../context/formContext";
import { FormContextType } from "../../types/FormPage/FormContext";
import axios from "axios";
import { redirect } from "react-router-dom";

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

  const [dataErrors, setDataErrors] = useState<Partial<Record<keyof UserSignup, string>>>({});
  const [loanDataErrors, setLoanDataErrors] = useState<Partial<Record<keyof LoanApplication, string>>>({});

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

  const validateUserData = (data: UserSignup) => {
    const errors: Partial<Record<keyof UserSignup, string>> = {};

    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!data.first_name) {
      errors.first_name = "First name is required";
    }
    if (!data.last_name) {
      errors.last_name = "Last name is required";
    }
    if (!data.identification || !/^\d{12}$/.test(data.identification)) {
      errors.identification = "Identification must be 12 digits";
    }
    if (data.personal_income < 1000000) {
      errors.personal_income = "Personal income must be at least 1,000,000";
    }
    if (!data.province) {
      errors.province = "Province is required";
    }
    if (!data.district) {
      errors.district = "District is required";
    }
    if (!data.ward) {
      errors.ward = "Ward is required";
    }
    if (!data.street) {
      errors.street = "Street is required";
    }
  
    setDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateLoanData = (loanData: LoanApplication) => {
    const errors: Partial<Record<keyof LoanApplication, string>> = {};
  
    if (!loanData.loan_amount || loanData.loan_amount <= 0) {
      errors.loan_amount = "Loan amount must be greater than zero";
    }
    if (!loanData.reason_id) {
      errors.reason_id = "A loan product is required";
    }
  
    setLoanDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (activeStep === 1) {
      if (!validateUserData(data)) {
        setLoading(false);
        return;
      }

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

      if (!validateLoanData(loanData)) {
        setLoading(false);
        return;
      }

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
          redirect("/");
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
    dataErrors,
    loanDataErrors,
    loading,
    activeStep,
    getDistrictList,
    getWardList,
    handleInputChange,
    handleIndicatorClick,
    handleSubmit,
  };
}
