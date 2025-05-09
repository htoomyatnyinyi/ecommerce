import { useSignInMutation } from "@/redux/api/auth/authApi";
import React, { useRef } from "react";

const SignIn: React.FC = () => {
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

    const { data } = await signIn({ email, password });
    if (data?.success) {
      emailRef.current?.value;
      passwordRef.current?.value;
    }
    console.log(data, " return data");
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
    </div>
  );
};

export default SignIn;
