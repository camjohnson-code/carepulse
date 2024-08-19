'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const middleColumnIndex = Math.floor(columns.length / 2);

  return (
    <div className='data-table w-full'>
      <Table className='shad-table w-full'>
        <TableHeader className='bg-dark-200'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='shad-table-row-header'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              {columns.map((_, index) => (
                <TableCell
                  key={index}
                  className={`${
                    index === middleColumnIndex
                      ? 'flex items-center justify-center'
                      : ''
                  }`}
                >
                  {index === middleColumnIndex && (
                    <Image
                      src='/assets/icons/loader.svg'
                      width={24}
                      height={24}
                      alt='Loading'
                      className='animate-spin'
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='shad-table-row'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='table-actions'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='shad-gray-btn'
        >
          <Image
            src='/assets/icons/arrow.svg'
            width={24}
            height={24}
            alt='Previous Page'
          />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='shad-gray-btn'
        >
          <Image
            src='/assets/icons/arrow.svg'
            width={24}
            height={24}
            alt='Next Page'
            className='rotate-180'
          />
        </Button>
      </div>
    </div>
  );
}
