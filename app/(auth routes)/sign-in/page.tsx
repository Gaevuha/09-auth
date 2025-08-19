'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import css from './SignInPage.module.css';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const handleLogin = async (formData: FormData) => {
    setError('');

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    } as LoginRequest;

    try {
      const user = await login(data); // повертає User
      setUser(user);
      router.push('/profile');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
