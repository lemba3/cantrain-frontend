import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ChangePasswordFormProps {
  email: string;
  callbackUrl: string | undefined;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({email, callbackUrl}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const callChangePassword = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API}` + "/auth/change-password", {
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
      return null;
    }
    const user = await res.json();
    if(user) {
      // sign in process
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        // callbackUrl: props.searchParams?.callbackUrl ?? "/",
      });
      if(!!res?.error) {
        // setError(true);
      }
      if (!res?.error) {
        router.push(callbackUrl ?? "/");
      }
    }
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // compare pass and confirm pass and prevent submit
    if(password !== confirmPassword) {
      setError(true);
      return;
    }
    callChangePassword();
  }

  return (
      <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2>
          <p className="bg-yellow-100 text-yellow-600 text-center p-2 mb-2">
            Change your password to activate account
          </p>
          {error && (
            <p className="bg-red-100 text-red-600 text-center p-2">
              Passwords not matching
            </p>
          )}
          <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" id="password" name="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handlePasswordChange}
                      required />
              </div>
              <div className="mb-6">
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" id="confirm_password" name="confirm_password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handleConfirmPasswordChange}
                      required />
              </div>
              <div className="flex items-center justify-between">
                  <button type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      Submit
                  </button>
              </div>
          </form>
      </div>
  );
};

export default ChangePasswordForm;
