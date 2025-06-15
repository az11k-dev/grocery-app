// src/lib/requireAuth.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "./supabaseClient"

export default function RequireAuth({ children }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error || !data.user) {
                navigate("/login")
            } else {
                setUser(data.user)
            }

            setLoading(false)
        }

        checkAuth()
    }, [navigate])

    if (loading) return <p className="text-center">Загрузка...</p>

    return children
}