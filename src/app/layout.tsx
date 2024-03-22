import type { Metadata } from 'next';

import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from 'store/ProviderWrapper';
import { cookies, headers } from 'next/headers';
import { getAdminToken } from '../../package/cookies/token';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Astar',
  description: ''
};

// ==============================|| ROOT LAYOUT ||============================== //

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const header_url = headersList.get('next-url') || '';
  const adminToken = await getAdminToken(cookies());
  if (header_url.split('/')[1] === 'user' && adminToken !== '') {
    redirect('/admin');
  }
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
