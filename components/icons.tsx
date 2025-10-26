import React from 'react';

type IconProps = React.ComponentProps<'svg'>;

export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const MagicWandIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118v-.09A12.755 12.755 0 0 1 2.25 12c0-2.347.396-4.606 1.102-6.731.213-.666.68-1.258 1.286-1.657a4.498 4.498 0 0 0 2.423-1.457A4.49 4.49 0 0 1 12 2.25c.636 0 1.262.114 1.847.336a4.49 4.49 0 0 1 2.423 1.457 4.498 4.498 0 0 0 1.286 1.657c.706 2.125 1.102 4.384 1.102 6.731s-.396 4.606-1.102 6.731c-.606.4-1.073.99-1.286 1.657a4.498 4.498 0 0 1-2.423 1.457A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-2.47-1.134" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 9.75 4.5-4.5m0 4.5-4.5 4.5" />
    </svg>
);

export const EditIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
