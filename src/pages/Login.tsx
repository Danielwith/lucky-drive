import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/constants/route_path";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validar datos reales acá
    localStorage.setItem("auth", "true");
    navigate(`${PATH.DASHBOARD}/request-reception`);
  };

  return (
    <div className="h-screen flex items-center justify-center md:bg-[url('assets/images/login.png')] bg-center bg-cover bg-no-repeat">
      <div className="md:p-6 h-[85%] rounded-2xl  w-full max-w-4xl space-y-4 bg-neutral-950/80 md:backdrop-blur-md md:shadow-[0_4px_37.3px_0_rgb(0,0,0)] md:mx-8">
        <div className="flex flex-col flex-wrap h-full justify-around items-center">
          <img
            className="place-self-center w-[40%] min-w-[140px] max-w-[150px]"
            src="assets/images/logo.png"
            alt="Lucky Logo"
          ></img>
          <div className="flex flex-col flex-wrap gap-4.5">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-center">Lucky GO</h1>
              <h3 className="text-[.68rem] font-bold text-center">
                Panel de administración
              </h3>
            </div>
            <div className="max-w-[16rem]">
              <Input
                className="mb-2"
                variant={"filled"}
                inputSize={"lg"}
                type="text"
                placeholder="Usuario"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
              <Input
                variant={"filled"}
                inputSize={"lg"}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full rounded-full h-10"
                onClick={handleLogin}
              >
                Ingresar
              </Button>
              <div className="grid grid-cols-[1fr_max-content_1fr] items-center">
                <div className="h-[1px] bg-[#F0EEE040]"></div>
                <div className="my-0 mx-2 text-xs font-normal -translate-y-0.5">
                  O iniciar sesión con
                </div>
                <div className="h-[1px] bg-[#F0EEE040]"></div>
              </div>
              <Button
                className="w-full rounded-full h-10"
                onClick={handleLogin}
              >
                <img src="assets/icon/microsoft.svg" alt="" />
                Microsoft 365
              </Button>
            </div>
          </div>
          <p className="text-xs text-center">Grupo Lucky - V.2025-02-11.01</p>
        </div>
      </div>
    </div>
  );
}
