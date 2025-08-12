import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { type AuthFormProps } from "../AuthForm"
import { registerData, signinData } from "./authData"
import { useUserStore } from "../../../zustand/userStore"

type userdata = {
    "username": string;
    "password": string;
    "confirm password": string
}

export const useApi = ({ formState }: AuthFormProps) => {
    const [formData, setFormData] = useState<userdata>({
        "username": "",
        "password": "",
        "confirm password": ""
    })

    const setUser = useUserStore((state)=>state.setUser)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formState && formData.password !== formData['confirm password']) {
            return toast.error("Password doesn't match!!");
        }
        const url = formState ? registerData.apiUrl : signinData.apiUrl;
        const successful = formState ? registerData.successMessage : signinData.successMessage;
        try {
            await axios.post(url, formData)
                .then((res) => {
                    setUser(res.data);
                    toast.success(successful);
                })
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || error.message);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }

    }

    return { handleChange, handleSubmit }
}