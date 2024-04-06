import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { register } from "@/services/authServices";
import { validateEmail, validatePassword } from "@/utils/validate";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidForm, setIsValidForm] = useState(false);
  const [status, setStatus] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });

  useEffect(() => {
    setStatus((prev) => ({ ...prev, isEmailValid: validateEmail(email) }));
  }, [email]);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      isPasswordValid: validatePassword(password),
    }));
  }, [password]);

  useEffect(() => {
    setIsValidForm(status.isEmailValid && status.isPasswordValid);
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidForm) return;

    try {
      const response = await register({ email, password });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper h-[80dvh] grid place-items-center">
      <form className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
        <header className="space-y-2 ">
          <h2 className="font-bold text-2xl">Sign Up</h2>
          <p>
            Welcome to Journey! Sign up to start connecting with fellow
            explorers.
          </p>
        </header>

        <div>
          <InputField
            name="email"
            type="text"
            label="Email"
            value={email}
            setValue={setEmail}
            isError={!status.isEmailValid && !!email.length}
          />
          <p className="text-red-500 font-normal text-sm h-4 relative top-1">
            {!status.isEmailValid && email ? "Email is invalid" : ""}
          </p>
        </div>

        <div>
          <InputField
            name="password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
            isError={!status.isPasswordValid && !!password}
          />
          <p className="text-red-500 font-normal text-sm h-4 relative top-1">
            {!status.isPasswordValid && password ? "Password is invalid" : ""}
          </p>
        </div>

        <p>
          Already a traveler? &nbsp;
          <Link to="/login" className="font-bold underline underline-offset-2">
            Login
          </Link>
        </p>

        <Button
          type="submit"
          disabled={!isValidForm}
          className="w-full bg-accent text-white disabled:opacity-40"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Register;
