'use client';

import { DataTable } from '@/components/table/DataTable';
import StatCard from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';
import { columns } from '@/components/table/columns';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [appointments, setAppointments] = useState({
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const fetchedAppointments = await getRecentAppointmentList();
      setAppointments(fetchedAppointments);
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={32}
            width={162}
            alt='CarePulse logo'
            className='h-8 w-fit'
          />
        </Link>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700' data-testid='admin-dashboard-subheader'>
            Start the day with managing new appointments
          </p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled Appointments'
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending Appointments'
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={appointments.cancelledCount}
            label='Cancelled Appointments'
            icon='/assets/icons/cancelled.svg'
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} loading={loading} />
      </main>
    </div>
  );
};

export default Admin;