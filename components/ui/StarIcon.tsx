'use client';

interface StarIconProps {
  className?: string;
  color?: string;
  size?: number;
}

export function StarIcon({ 
  className = '', 
  color = 'rgb(255,186.558,0)', 
  size = 14 
}: StarIconProps) {
  return (
    <svg 
      viewBox="0 0 14 14" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <path 
        d="M8.77732 4.80312C8.84924 4.9975 9.0025 5.15076 9.19688 5.22268L12.2001 6.33399C12.8184 6.56277 12.8184 7.43723 12.2001 7.66601L9.19688 8.77732C9.0025 8.84924 8.84924 9.0025 8.77732 9.19688L7.66601 12.2001C7.43723 12.8184 6.56277 12.8184 6.33399 12.2001L5.22268 9.19688C5.15076 9.0025 4.9975 8.84924 4.80312 8.77732L1.79987 7.66601C1.1816 7.43723 1.1816 6.56277 1.79987 6.33399L4.80312 5.22268C4.9975 5.15076 5.15076 4.9975 5.22269 4.80312L6.33399 1.79987C6.56277 1.1816 7.43723 1.1816 7.66601 1.79987L8.77732 4.80312Z" 
        fill={color} 
        fillRule="evenodd" 
      />
    </svg>
  );
}