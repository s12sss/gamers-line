'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToSpeedtest() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/speedtest');
  }, [router]);

  return null;
}
