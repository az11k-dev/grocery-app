// src/lib/requireAuth.jsx
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
                navigate("/")
                window.scrollTo({ top: 0});
            } else {
                setUser(data.user)
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .maybeSingle(); // 👈 вместо .single()
                if (error || !data) {
                    await supabase.auth.signOut();
                    window.scrollTo({ top: 0});
                    navigate("/welcome");
                }
            }

            setLoading(false)
        }

        checkAuth()

    }, [navigate]);

    if (loading) return <Loader />

    return children
}