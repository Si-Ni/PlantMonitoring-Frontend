import { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AUTH_USER_ROUTE = "/authUser";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [userID, setUserID] = useState<string>("");
  const [userPWD, setUserPWD] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = () => {
    if (!userID || !userPWD) return;
    setIsLoading(true);
    axios
      .post(AUTH_USER_ROUTE, { userID, userPWD }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          login();
          navigate("/dashboard");
        } else {
          setError("Authentication failed");
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUserIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(e.target.value);
    setError(null);
  };

  const handleUserPWDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPWD(e.target.value);
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 bg-content">
        <CardBody className="flex flex-col items-center">
          <h2 className="text-2xl bg-gradient-to-r from-primary via-pink-500 to-danger bg-clip-text text-transparent mb-6">
            PlantMonitoring{" "}
            <span role="img" aria-label="wave">
              🌱
            </span>
          </h2>
          <Input
            label="Username"
            type="text"
            variant="bordered"
            className="mb-4 w-full"
            placeholder="Enter your Username"
            value={userID}
            isInvalid={Boolean(error)}
            onChange={handleUserIDChange}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-xl text-gray-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-xl text-gray-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="mb-8 w-full"
            value={userPWD}
            errorMessage={error}
            isInvalid={Boolean(error)}
            onChange={handleUserPWDChange}
          />
          <Button onPress={handleSubmit} color="primary" className="w-full mb-4 mt-6" isLoading={isLoading}>
            Log In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
