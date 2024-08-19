'use client';

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          height={1000}
          width={1000}
          alt='Uploaded Image'
          className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
          <Image
            src='/assets/icons/upload.svg'
            height={40}
            width={40}
            alt='Upload Icon'
          />
          <div className='file-upload_label'>
            <p className='text-14-regular'>
              <span className='text-green-400'>Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG, or GIF (max 800x400)</p>
          </div>
        </>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
