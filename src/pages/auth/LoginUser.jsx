import { Link, useNavigate } from "react-router-dom";
import UseAuthManager from "../../store/AuthProvider";
import { useState } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { LoginSchema } from "../../validations/AuthSchema";
import { ZodError } from "zod";

const LoginUser = () => {
  const navigate = useNavigate();
  const { login, loading } = UseAuthManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      LoginSchema.parse(data);
      setErrors({});

      await login(email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center md:p-8 p-8">
        <div className="flex justify-center items-center w-full md:w-1/2 flex-col gap-4">
          <div className="flex justify-center items-center flex-col w-full">
            <h1 className="text-3xl font-semibold">Masuk </h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="" className="-mb-3">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              className="p-input text-lg p-3 rounded border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && <small className="p-error">{errors.email}</small>}

            <label htmlFor="" className="-mb-3">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-input text-lg p-3 rounded border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}

            <div className="flex flex-col w-full gap-3">
              <Button
                onClick={handleLogin}
                className="bg-blue-500 text-white hover:bg-blue-400 p-4 w-full flex justify-center rounded transition-all"
                disabled={loading}
              >
                {loading ? (
                  <ProgressSpinner
                    style={{ width: "24px", height: "24px" }}
                    strokeWidth="8"
                    animationDuration="1s"
                    color="white"
                  />
                ) : (
                  <p>Masuk</p>
                )}
              </Button>
              <div className="flex flex-col gap-1">
                <div className="flex w-full gap-1 items-center justify-center">
                  Belum punya akun?
                  <Link to="/register" className="text-blue-500 underline">
                    daftar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
