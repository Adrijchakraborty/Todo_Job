import { useState } from 'react';
import { AuthForm } from '../components';

const AuthPage = () => {
  const [formState, setFormState] = useState<boolean>(false); // false = signin

  return (
    <div className="bg-gray-100 h-[100dvh] flex justify-center items-center">
      <AuthForm
        formState={formState}
        setFormState={() => setFormState((prev) => !prev)}
      />
    </div>
  );
};

export default AuthPage;
