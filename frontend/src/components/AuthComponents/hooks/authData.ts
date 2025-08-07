export const signinData = {
    title: 'Welcome to Job Tracker',
    heading: 'Create your account',
    fields: ['username', 'password', 'confirm password'],
    button: 'Register',
    bottomText: 'Already have an account?',
    bottomButton: 'Sign in',
    apiUrl: "/api/user/login",
    successMessage: "Signin successful"
}

export const registerData = {
    title: 'Welcome back to Job Tracker',
    heading: 'Sign in to your account',
    fields: ['username', 'password'],
    button: 'Sign in',
    bottomText: "Don't have an account?",
    bottomButton: 'Register',
    apiUrl: "/api/user/register",
    successMessage: "Registration successful"
}