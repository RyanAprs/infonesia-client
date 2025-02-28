import { Link, useNavigate } from "react-router-dom";
import UseAuthManager from "../../store/AuthProvider";
import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";

const LoginUser = () => {
  const navigate = useNavigate();
  const { login, loading, error } = UseAuthManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center md:p-8 py-8">
        <Toast
          ref={toast}
          position={window.innerWidth <= 767 ? "top-center" : "top-right"}
        />
        <div className="flex justify-center items-center w-full md:w-1/2 flex-col gap-4">
          <div className="flex justify-center items-center flex-col w-full">
            <h1 className="text-3xl font-semibold">Masuk </h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="" className="-mb-3">
              Email:
            </label>
            <InputText
              type="email"
              placeholder="Email"
              className="p-input text-lg p-4 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="" className="-mb-3">
              Password:
            </label>
            <Password
              feedback={false}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
            <div className="flex flex-col w-full gap-3">
              <Button
                onClick={handleLogin}
                className="bg-blue-300 text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl hover:mainGreen transition-all"
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
                  <Link to="/register" className="text-mainGreen font-semibold">
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
