import { Link, useNavigate } from "react-router-dom";
import UseAuthManager from "../../store/AuthProvider";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { RegisterSchema } from "../../validations/AuthSchema";
import { ZodError } from "zod";
import { Toast } from "primereact/toast";

const RegisterUser = () => {
  const navigate = useNavigate();
  const { register, loading } = UseAuthManager();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
        fullName: name,
      };
      RegisterSchema.parse(data);
      await register(data);
      navigate("/login");
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      } else if (error.response.status === 409) {
        toast.current.show({
          severity: "error",
          summary: "Gagal",
          detail: "Email sudah terdaftar!",
          life: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center md:p-8 p-8">
        <Toast
          ref={toast}
          position={window.innerWidth <= 767 ? "top-center" : "top-right"}
        />{" "}
        <div className="flex justify-center items-center w-full md:w-1/2 flex-col gap-4">
          <div className="flex justify-center items-center flex-col w-full">
            <h1 className="text-3xl font-semibold">Register </h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="" className="-mb-3">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name"
              className="p-input text-lg p-3 rounded border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.fullName && (
              <small className="p-error">{errors.fullName}</small>
            )}

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
                onClick={handleRegister}
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
                  <p className="font-semibold">Register</p>
                )}
              </Button>
              <div className="flex flex-col gap-1">
                <div className="flex w-full gap-1 items-center justify-center">
                  Sudah punya akun?
                  <Link to="/login" className="text-blue-500 underline">
                    masuk
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

export default RegisterUser;
