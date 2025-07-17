import { PATH } from "@/lib/constants/route_path";
import { useAuth } from "@/lib/hooks/use-auth";
import { useLocation } from "wouter";

export function GuardianRoute({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate(PATH.LOGIN);
    return null;
  }

  return <>{children}</>;
}
