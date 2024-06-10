'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogInOtpMutation, useSendOtpMutation } from '@/app/redux/api/auth';

import { toast } from 'sonner';

import Input from '@/app/components/input';
import OuathButtons from '@/app/components/oauth-buttons';
import Button from '@/app/components/button';
import Link from 'next/link';

import scss from '@/app/components/scss/form.module.scss';

type FormData = {
  email: string;
  otp: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [logIn, { isLoading }] = useLogInOtpMutation();
  const [sendOtp, { isLoading: isOtpSending }] = useSendOtpMutation();

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleClearInput = (name: keyof FormData) => {
    if (name === 'email') {
      setIsOtpSent(false);
      setValue('otp', '');
    }

    setValue(name, '');
  };

  const handleErrorAlert = (message?: string) => {
    toast.error(message || 'Try again. Something happened on our end', {
      position: 'top-right',
      duration: 5000,
    });
  };

  const handleSubmitForm: SubmitHandler<FormData> = async ({ email, otp }) => {
    if (!isOtpSent) {
      try {
        const data = await sendOtp({
          email,
        }).unwrap();

        if (data.email) {
          setIsOtpSent(true);
        }
      } catch (error: any) {
        handleErrorAlert(error.data?.message);
      } finally {
        return;
      }
    }

    try {
      const data = await logIn({
        email,
        otp,
      }).unwrap();

      if (data) {
        router.push('/guestbook');
      }
    } catch (error: any) {
      handleErrorAlert(error.data?.message);
    }
  };

  return (
    <>
      <form
        className={scss.form}
        onSubmit={handleSubmit(handleSubmitForm)}
        style={{
          maxWidth: '26rem',
          marginInline: 'auto',
          padding: '1.95rem 2.25rem',
          // background: 'var(--bg-300)',
          // border: '0.8px solid var(--color-300)',
          // borderRadius: 'var(--border-radius-500)',
        }}
      >
        <div className={scss.text} style={{ textAlign: 'center' }}>
          <h2 className={scss.title}>Welcome back 😎</h2>

          <p className={scss.desc}>Please sign in to your account to continue.</p>
        </div>

        <div className={scss.container}>
          <Input
            label="Email"
            placeholder="Enter your email..."
            error={errors.email && errors.email.message}
            load={isLoading}
            register={register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
              },
              onChange: () => {
                setIsOtpSent(false);
                handleClearInput('otp');
              },
            })}
          />

          {isOtpSent && (
            <>
              <Input
                label="Verification code"
                placeholder="Paste verification code..."
                error={errors.email && errors.email.message}
                load={isLoading}
                register={register('otp', {
                  required: 'Please enter verification code',
                })}
              />

              <div className={scss.text}>
                <p className={scss.desc}>We sent a code to your inbox.</p>
              </div>
            </>
          )}

          <Button theme="blue" load={isLoading || isOtpSending}>
            {!isOtpSent ? 'Continue' : 'Sign in'}
          </Button>

          <div className={scss.devider}>
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <OuathButtons />

          <Link className={scss.link} href="/sign-up">
            {"Don't have an account? Sign Up"}
          </Link>
        </div>
      </form>
    </>
  );
}