import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/constants/route_path";
import { Input } from "@/components/ui/input";
import LuckyGO from "/assets/images/logo.png?url";
import { LoginService } from "@/services/login_service";
import { Controller, useForm } from "react-hook-form";
import { ApiFetchTypes, LoginTypes } from "@/lib/types/types";
import { useAuthStore } from "@/lib/store/auth_store";
import { ToastService } from "@/services/init/toast_service";

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuthStore((s) => s);
  const { control, handleSubmit } = useForm<LoginTypes.LoginForm>();

  const handleLogin = (data: LoginTypes.LoginForm) => {
    const credential: LoginTypes.LoginForm = {
      sDocUsu: data.sDocUsu,
      sClaUsu: data.sClaUsu,
      sVerApp: "string",
      sVerAnd: "string",
      sModCel: "string",
      dLatUsu: 0,
      dLonUsu: 0,
    };

    void LoginService.postLogin(credential)
      .then((res: ApiFetchTypes.ApiResponse<LoginTypes.LoginResponse>) => {
        if (res.response) {
          login(res.response.oUsurio.sToken, res.response.oUsurio);
          navigate(`${PATH.DASHBOARD}/request-reception`);
        }
        console.log(res);
      })
      .catch((err: ApiFetchTypes.ApiError) => {
        ToastService.toast(err.message, {
          type: "error",
        });
      });
  };

  return (
    <div className="h-screen flex items-center justify-center md:bg-[url('/assets/images/login.png')] bg-center bg-cover bg-no-repeat">
      <div className="md:p-6 h-[85%] rounded-2xl w-full max-w-4xl space-y-4 bg-neutral-950/80 md:backdrop-blur-md md:shadow-[0_4px_37.3px_0_rgb(0,0,0)] md:mx-8">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col flex-wrap h-full justify-around items-center"
        >
          <img
            className="place-self-center w-[40%] min-w-[140px] max-w-[150px]"
            src={LuckyGO}
            alt="Lucky Logo"
          ></img>
          <div className="flex flex-col flex-wrap gap-4.5 md:min-w-[18rem]">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-center">Lucky GO</h1>
              <h3 className="text-[.68rem] font-bold text-center">
                Panel de administración
              </h3>
            </div>
            <div>
              <Controller
                name="sDocUsu"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese su usuario" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      variant="filled"
                      inputSize="lg"
                      type="text"
                      placeholder="Usuario"
                      autoComplete="username"
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
              <Controller
                name="sClaUsu"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese su contraseña" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      className="mt-2"
                      variant="filled"
                      inputSize="lg"
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full rounded-full h-10" type="submit">
                Ingresar
              </Button>
              <Button
                className="hover:bg-transparent h-4 text-xs font-normal"
                variant={"ghost"}
                type="button"
              >
                ¿Olvidaste tu contraseña?
              </Button>
              <div className="grid grid-cols-[1fr_max-content_1fr] items-center">
                <div className="h-[1px] bg-[#F0EEE040]"></div>
                <div className="my-0 mx-2 text-xs font-normal -translate-y-0.5">
                  O iniciar sesión con
                </div>
                <div className="h-[1px] bg-[#F0EEE040]"></div>
              </div>
              <Button className="w-full rounded-full h-10" type="button">
                <img src="/assets/icon/microsoft.svg" alt="" />
                Microsoft 365
              </Button>
            </div>
          </div>
          <p className="text-xs text-center">Grupo Lucky - V.2025-02-11.01</p>
        </form>
      </div>
    </div>
  );
}
