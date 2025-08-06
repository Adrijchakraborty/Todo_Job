interface OverlayProps {
  isSignUp: boolean;
  toggleMode: () => void;
}

export default function Overlay({ isSignUp, toggleMode }: OverlayProps) {
  return (
    <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-30 transition-transform duration-700">
      <div
        className={`bg-gradient-to-r from-pink-500 to-pink-400 text-white h-full w-[200%] flex transition-transform duration-700
          ${isSignUp ? 'translate-x-[-50%]' : 'translate-x-0'}`}
      >
        <div className="w-1/2 flex flex-col items-center justify-center px-10 text-center">
          <h1 className="text-2xl font-bold">Welcome Back! 🎉</h1>
          <p className="text-sm my-4">To keep connected with us please login with your personal info</p>
          <button
            onClick={toggleMode}
            className="ghost border border-white text-white px-6 py-2 rounded-full font-semibold text-xs uppercase hover:bg-white hover:text-pink-500 transition"
          >
            Sign In
          </button>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center px-10 text-center">
          <h1 className="text-2xl font-bold">Hello, Friend! ✨</h1>
          <p className="text-sm my-4">Enter your personal details and start your journey with us</p>
          <button
            onClick={toggleMode}
            className="ghost border border-white text-white px-6 py-2 rounded-full font-semibold text-xs uppercase hover:bg-white hover:text-pink-500 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}