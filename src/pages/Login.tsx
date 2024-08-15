import { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/EyeFilledIcon";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = () => {
    console.log({ email, password });
    setEmail("");
    setPassword("");
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
            type="email"
            label="Email"
            variant="bordered"
            className="mb-4 w-full"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onPress={handleSubmit} color="primary" className="w-full mb-4 mt-6">
            Log In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
