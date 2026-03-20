import { useRendererListener } from '@/app/hooks';

import { useState } from 'react';

import Menu from './menu';

import type { WindowState } from '@/windowState';

export default function Menubar () {
  const [windowState, setWindowState] = useState<WindowState>('normal');

  useRendererListener('window-state-changed', (_, windowState: WindowState) => setWindowState(windowState));

  // Hide titlebar in full screen mode on macOS
  if (windowState === 'full-screen' && __DARWIN__) {
    return null;
  }

  return (
    <div className='window-topbar flex items-stretch h-8 bg-black select-none sticky top-0 z-50'>
      {__LINUX__ && (
        <>
          <Menu />
        </>
      )}
    </div>
  );
}
