import { useLocation } from "wouter"

export function GuardianRoute({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation()
  const isLoggedIn = localStorage.getItem("auth") === "true"

  if (!isLoggedIn) {
    navigate("/login")
    return null
  }

  return <>{children}</>
}
