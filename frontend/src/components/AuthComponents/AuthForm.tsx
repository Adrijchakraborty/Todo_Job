interface Props {
  isSignUp: boolean;
  active: boolean;
}

export default function AuthForm({ isSignUp, active }: Props) {
  const baseClass = 'absolute top-0 h-full w-1/2 transition-all duration-700';
  const signInClasses = `${baseClass} left-0 ${!isSignUp && active ? 'translate-x-full z-20' : 'z-10'}`;
  const signUpClasses = `${baseClass} left-1/2 ${isSignUp && active ? 'translate-x-[-100%] z-20' : 'z-10'}`;

  return (
    <div className={isSignUp ? signUpClasses : signInClasses}>
      <form className="bg-white h-full flex flex-col justify-center items-center px-12 text-center">
        <h1 className="text-2xl font-bold mb-2">
          {isSignUp ? 'Create Account 🚀' : 'Sign In 👋'}
        </h1>

        {isSignUp && <input className="input" type="text" placeholder="👤 Name" required />}
        <input className="input" type="email" placeholder="📧 Email" required />
        <input className="input" type="password" placeholder="🔒 Password" required />

        {!isSignUp && (
          <a href="#" className="text-sm text-gray-600 mt-2 hover:text-pink-600">
            Forgot your password? 🤔
          </a>
        )}

        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full font-semibold text-xs uppercase hover:bg-pink-600 transition-all"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
