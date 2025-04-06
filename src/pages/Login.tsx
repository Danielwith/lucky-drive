import { useLocation } from "wouter"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PATH } from "@/lib/constants/route_path"

export default function Login() {
  const [, navigate] = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Validar datos reales acá
    localStorage.setItem("auth", "true")
    navigate(`${PATH.DASHBOARD}/request-reception`)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg border shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Iniciar Sesión</h1>
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Ingresar</Button>
      </div>
    </div>
  )
}
