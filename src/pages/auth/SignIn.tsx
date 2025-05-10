import { useSignInMutation } from "@/redux/api/auth/authApi";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [signIn, { isLoading: signInLoading, isError: signInError }] =
    useSignInMutation();

  if (signInError) return <p>error</p>;
  if (signInLoading) return <p>loading</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please Fill All Field");
      return;
    }

    console.log("email", email, "passwrod", password);

    const { data }: any = await signIn({ email, password });
    console.log(data, "return dat");
    data?.success ? navigate("/products") : navigate("/auth/signin");
    // if (data?.success && !data) {
    //   emailRef.current?.value;
    //   passwordRef.current?.value;
    // } else {
    //   console.log(data, " return data");
    // }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="email">Please Enter Your email</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="outline p-2 m-1"
          />
        </div>
        <div>
          <label htmlFor="password">Please Enter Your password</label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="password"
            className="outline p-2 m-1"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <p className="p-2 m-1 ">
        Oop! I do not have an account, I will click here ...
        <Link to="/auth/signup" className="underline">
          Register New Account
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
