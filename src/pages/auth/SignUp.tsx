import { useSignUpMutation } from "@/redux/api/auth/authApi";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [signUp, { isLoading: signUpLoading, isError: signUpError }] =
    useSignUpMutation();

  if (signUpError) return <p>errror</p>;
  if (signUpLoading) return <p>loadign</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please Fill All Field");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    console.log("Username:", name, "email", email, "passwrod", password);

    const { data } = await signUp({ name, email, password, confirmPassword });
    // if (data?.success) {
    //   usernameRef.current.value(null);
    //   usernameRef.current.value(null);
    // }
    console.log(data, " return data");
  };

  return (
    <div>
      <h1>Sign UP Page</h1>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="username">Please Enter Your Username</label>
          <input
            id="username"
            type="text"
            ref={usernameRef}
            placeholder="username"
            className="outline p-2 m-1"
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">
            Please Enter Your confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
            placeholder="confirmPasswordRef"
            className="outline p-2 m-1"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p className="p-2 m-1 ">
        Oop! I alreay have an account, I will click here ...
        <Link to="/auth/signin" className="underline">
          Sign In To My Account.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
