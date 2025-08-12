import { useEffect } from "react";
import { useUserStore } from "../zustand/userStore";
import axios from "axios";

export const useAppHook = () => {
    const setUser = useUserStore((state) => state.setUser);
    const logout = useUserStore((state) => state.logout);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/user/");
                setUser(res.data);
            } catch (err) {
                console.error(err);
                logout();
            }
        };

        fetchUser();
    }, []);
}