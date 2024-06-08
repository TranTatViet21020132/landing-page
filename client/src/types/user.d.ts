export type User = {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

export type Register = {
  email: string;
  otp?: string;
}