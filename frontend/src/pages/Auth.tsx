import { useState } from 'react';
import AuthForm from '../components/AuthComponents/AuthForm';
import Overlay from '../components/AuthComponents/Overlay';

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleMode = () => setIsSignUp((prev) => !prev);

    return (
        <div
            className={`relative w-[768px] max-w-full min-h-[520px] shadow-xl rounded-lg overflow-hidden bg-white`}
        >
            <AuthForm isSignUp={false} active={!isSignUp} />
            <AuthForm isSignUp={true} active={isSignUp} />
            <Overlay isSignUp={isSignUp} toggleMode={toggleMode} />
        </div>
    );
}