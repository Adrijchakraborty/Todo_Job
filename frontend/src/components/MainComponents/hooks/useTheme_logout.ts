import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/store";
import axios from "axios";
import toast from "react-hot-toast";

type Theme = 'light' | 'dark'
export const useTheme_logout = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const logout = useUserStore((state) => state.logout);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogout = async () => {
        try {
            await axios.get('/api/user/logout')
                .then((res) => {
                    toast.success(res.data);
                    logout();
                })
        } catch (error) {
            console.log(error)
        }
    }
    return {theme, setTheme, handleLogout}
}