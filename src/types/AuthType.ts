// return data
export type ResponseUserData = {
  id: string;
  email: string;
  // role: "user" | "employer";
  role: string;
};

// send data
export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
