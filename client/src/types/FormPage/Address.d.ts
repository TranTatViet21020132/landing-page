export type Province = {
  code: string;
  name: string;
};

export type District = {
  code: string;
  name: string;
  province: string;
};

export type Ward = {
  code: string;
  name: string;
  district: string;
};
