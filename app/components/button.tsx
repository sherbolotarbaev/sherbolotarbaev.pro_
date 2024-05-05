'use client';

import { useRouter } from 'next/navigation';

import { BiLoader } from 'react-icons/bi';
import scss from './scss/button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: Theme;
  width?: number;
  load?: boolean;
  redirect?: string;
  open?: string;
}

type Theme = 'blue';

export default function Button({
  children,
  theme,
  width,
  load,
  redirect,
  open,
  ...props
}: Readonly<Props>) {
  const router = useRouter();

  const style: React.CSSProperties = {};

  const className = [
    scss.button,
    theme && scss[theme],
    load && scss.load,
    props.disabled && scss.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  if (width) {
    style.maxWidth = `${width}px`;
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (redirect) {
      router.push(redirect);
    } else if (open) {
      window.open(open, '_blank');
    } else if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button {...props} onClick={handleClick} style={style} className={className}>
      {load ? <BiLoader size={15} className={scss.loader} /> : children}
    </button>
  );
}