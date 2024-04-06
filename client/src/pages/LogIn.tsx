import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { validateEmail, validatePassword } from "@/utils/validate";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });

  useEffect(() => {
    setErrors((prev) => ({ ...prev, isEmailValid: validateEmail(email) }));
  }, [email]);

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      isPasswordValid: validatePassword(password),
    }));
  }, [password]);

  return (
    <div className="wrapper h-[80dvh] grid place-items-center">
      <form className="max-w-md mx-auto space-y-6">
        <header className="space-y-2 ">
          <h2 className="font-bold text-2xl">Log In</h2>
          <p>
            Welcome back traveler! Log in to Journey to continue connecting with
            fellow explorers.
          </p>
        </header>

        <div>
          <InputField
            name="email"
            type="text"
            label="Email"
            value={email}
            setValue={setEmail}
            isError={!errors.isEmailValid && !!email.length}
          />

          <p className="text-red-500 font-normal text-sm h-4 relative top-1">
            {!errors.isEmailValid && email ? "Email is invalid" : ""}
          </p>
        </div>

        <div>
          <InputField
            name="password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
            isError={!errors.isPasswordValid && !!password}
          />

          <p className="text-red-500 font-normal text-sm h-4 relative top-1">
            {!errors.isPasswordValid && password ? "Password is invalid" : ""}
          </p>
        </div>

        <p>
          New to Journey? &nbsp;
          <Link
            to="/register"
            className="font-bold underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>

        <Button className="w-full bg-accent text-white">Log In</Button>
      </form>
    </div>
  );
}

export default LogIn;
