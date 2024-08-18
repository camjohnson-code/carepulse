'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { encryptKey } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PassKeyModal = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = localStorage.getItem('admin');
      if (key) router.push('/admin');
      else setOpen(true);
    }
  }, [router]);

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };

  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem('admin', encryptedKey);
      setOpen(false);
      router.push('/admin');
    } else setError('Incorrect passkey. Please try again.');
  };

  return (
    open && (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-start justify-between'>
              Admin Access Verification
              <Image
                src='/assets/icons/close.svg'
                alt='Close button'
                height={20}
                width={20}
                onClick={() => closeModal()}
                className='cursor-pointer'
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin page, please enter the passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <InputOTP
              maxLength={6}
              value={passKey}
              onChange={(value) => setPassKey(value)}
            >
              <InputOTPGroup className='shad-otp'>
                <InputOTPSlot className='shad-otp-slot' index={0} />
                <InputOTPSlot className='shad-otp-slot' index={1} />
                <InputOTPSlot className='shad-otp-slot' index={2} />
                <InputOTPSlot className='shad-otp-slot' index={3} />
                <InputOTPSlot className='shad-otp-slot' index={4} />
                <InputOTPSlot className='shad-otp-slot' index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className='shad-error text-14-regular mt-4 flex justify-center'>
                {error}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={(e) => validatePassKey(e)}
              className='shad-primary-btn w-full'
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export default PassKeyModal;
