import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx('status-badge', {
        'bg-green-600': status === 'pending',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className='h-fit w-3'
      />
      <p
        className={clsx('text-12-semibold capitalized', {
          'text-green-400': status === 'scheduled',
          'text-blue-500': status === 'pending',
          'text-red-400': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
