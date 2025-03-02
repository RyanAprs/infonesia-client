import { useNavigate } from "react-router-dom";
import UseAuthManager from "../../store/AuthProvider";
import { useState } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { login, loading } = UseAuthManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
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
            <div className="flex flex-col w-full gap-3">
              <Button
                onClick={handleLogin}
                className="bg-blue-300 text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded hover:mainGreen transition-all"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
