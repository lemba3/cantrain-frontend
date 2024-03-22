"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChangePasswordForm from '../components/change-password-form';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [reqPassChange, setReqPassChange] = useState(false);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const router = useRouter();

  const signInAndStoreToken = async() => {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      // callbackUrl: props.searchParams?.callbackUrl ?? "/",
    });
    if(!!res?.error) {
      setError(true);
    }
    if (!res?.error) {
      router.push(props.searchParams?.callbackUrl ?? "/");
    }
  }

  const getUser = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API}` + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 401) {
      setError(true);
      return null;
    }
    const user = await res.json();
    return user;
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await getUser();
    // console.log("user", user.user.req_pass_change);
    if(user && !user.user.req_pass_change) {
      await signInAndStoreToken();
    }
    if(user && user.user.req_pass_change) {
      setError(false);
      setReqPassChange(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!reqPassChange && <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>}
        {error && (
          <p className="bg-red-100 text-red-600 text-center p-2">
            Authentication Failed
          </p>
        )}
        {!reqPassChange && <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>}
        {reqPassChange && <ChangePasswordForm email={email} callbackUrl={props.searchParams?.callbackUrl} />}
      </div>
    </div>
  );
};

export default LoginPage;
