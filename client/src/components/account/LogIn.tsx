import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useState } from "react";
import { Link } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapper h-[80dvh] grid place-items-center">
      <form className="max-w-md mx-auto space-y-8">
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
          />
        </div>

        <div>
          <InputField
            name="password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
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

        <Button className="w-full bg-accent text-white" text="Log In" />
      </form>
    </div>
  );
}

export default LogIn;
