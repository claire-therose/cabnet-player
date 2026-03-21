import classNames from 'classnames';

import type React from 'react';

interface IControlButtonProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | React.KeyboardEventHandler<HTMLButtonElement>;
  path: string;
}

const ControlButton: React.FC<IControlButtonProps> = ({ name, onClick, path }) => {
  const className = classNames(
    'control h-6 w-6 px-0 mr-1 flex justify-center inset-shadow-[1px_1px_0px] inset-shadow-zinc-400',
    name
  );
  const title = name[0].toUpperCase() + name.substring(1);

  return (
    <button
      type='button'
      aria-label={name}
      className={className}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onKeyDown={onClick as React.KeyboardEventHandler<HTMLButtonElement>}
      title={title}
      tabIndex={0}
    >
      <svg aria-hidden='true' version='1.1' className='w-[10px] h-[10px]'>
        <path fill='currentColor' d={path} />
      </svg>
    </button>
  );
};

export default ControlButton;
