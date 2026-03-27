import { useRendererListener } from '@/app/hooks';
import { MenuChannels } from '@/channels/menuChannels';

import { useState } from 'react';

import TitlebarLogo from './titlebar-logo';
import TitlebarMediaTitle from './titlebar-media-title';
import WindowControls from './window-controls';

import type { WindowState } from '@/windowState';

const handleDoubleClick = () => {
  electron.ipcRenderer.invoke(MenuChannels.WINDOW_TOGGLE_MAXIMIZE);
};

export default function Titlebar () {
  const [windowState, setWindowState] = useState<WindowState>('normal');

  useRendererListener('window-state-changed', (_, windowState: WindowState) => setWindowState(windowState));

  // Hide titlebar in full screen mode on macOS
  if (windowState === 'full-screen' && __DARWIN__) {
    return null;
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className='window-titlebar window-topbar flex items-stretch h-8 bg-zinc-900 select-none sticky top-0 z-50'
    >
      {__LINUX__ && (
        <>
          {/* Since TitlebarMediaTitle has the grow modifier, WindowControls will always be on the far right */}
          <TitlebarLogo />
          <TitlebarMediaTitle />
          <WindowControls windowState={windowState} />
        </>
      )}
    </div>
  );
}
