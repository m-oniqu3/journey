import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { ActionEnum } from "@/context/reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { RoutesEnum } from "@/routes";
import { api } from "@/services/api";
import { login } from "@/services/auth-services";
import { validateEmail, validatePassword } from "@/utils/validate";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const { dispatch, state } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout>();

  const [isValidForm, setIsValidForm] = useState(false);
  const [status, setStatus] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });

  useEffect(() => {
    if (state.isLoggedIn) {
      const timer = setTimeout(() => {
        navigate(RoutesEnum.HOME);
      }, 3000);

      // Save the timer ID in state
      setRedirectTimer(timer);

      // cleanup function to cancel the timer if component unmounts or user navigates away
      return () => {
        clearTimeout(timer);
      };
    }
  }, [state, navigate]);

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      isEmailValid: validateEmail(email),
      isPasswordValid: validatePassword(password),
    }));
  }, [email, password]);

  useEffect(() => {
    setIsValidForm(status.isEmailValid && status.isPasswordValid);
  }, [status]);

  function handleRedirect() {
    // cancel the timer if it exists
    if (redirectTimer) {
      clearTimeout(redirectTimer);
    }

    navigate(RoutesEnum.HOME);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidForm) return;
    console.log(password, email);

    try {
      const response = await login({ email, password });
      console.log(response);

      // set user and token
      dispatch({ type: ActionEnum.SET_USER, payload: response.user });
      dispatch({ type: ActionEnum.SET_IS_LOGGED_IN, payload: true });
      dispatch({ type: ActionEnum.SET_TOKEN, payload: response.token });

      // update api headers
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      api.defaults.headers.common["Content-Type"] = "application/json";

      // navigate home
      navigate(RoutesEnum.HOME);
    } catch (error) {
      console.log(error);
    }
  }

  if (state.isLoggedIn) {
    return (
      <article>
        <p>you are already logged in and will be redirected. </p>
        <button onClick={handleRedirect}> Go home </button>
      </article>
    );
  }

  return (
    <div className="wrapper h-[80dvh] grid place-items-center">
      <form className="max-w-md mx-auto space-y-2" onSubmit={handleSubmit}>
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
          New to Journey? &nbsp;
          <Link
            to="/register"
            className="font-bold underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>

        <Button
          type="submit"
          disabled={!isValidForm}
          className="w-full bg-accent text-white disabled:opacity-40"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
