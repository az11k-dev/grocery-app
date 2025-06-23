import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "./supabaseClient"
import Loader from "../components/specific/Loader.jsx";

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
    }, [navigate]);

    if (loading) return <Loader />

    return children
}