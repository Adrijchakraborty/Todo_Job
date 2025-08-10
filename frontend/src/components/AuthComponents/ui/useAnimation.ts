import { useCallback, useMemo, useState } from "react";
import { type AuthFormProps } from "../AuthForm";
import { registerData, signinData } from "../hooks/authData";

export const useAnimation = ({ formState, setFormState }: AuthFormProps) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const content = useMemo(() => {
        return formState
            ? signinData
            : registerData;
    }, [formState]);

    const handleToggle = useCallback(() => {
        if (isTransitioning) return; // Prevent multiple clicks during transition

        setIsTransitioning(true);

        // Use requestAnimationFrame for smoother timing
        requestAnimationFrame(() => {
            setTimeout(() => {
                setFormState();
                setIsTransitioning(false);
            }, 300);
        });
    }, [setFormState, isTransitioning]);

    return { content, handleToggle, isTransitioning }
}