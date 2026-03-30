import { MenuChannels } from '@/channels/menuChannels';
import { emitEvent } from '@/webContents';

const MenuItems: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'app',
    submenu: [
      {
        label: 'about'
      },
      {
        id: MenuChannels.WINDOW_CLOSE,
        label: 'quit',
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: 'media',
    submenu: [
      {
        label: 'open file',
        accelerator: 'CmdOrCtrl+O'
      },
      {
        label: 'info'
      },
      {
        label: 'screenshot',
        accelerator: 'CmdOrCtrl+I'
      }
    ]
  },
  {
    label: 'tracks',
    submenu: [
      {
        label: 'audio'
      },
      {
        label: 'subtitles'
      }
    ]
  },
  {
    label: 'settings',
    submenu: [
      {
        label: 'account'
      },
      {
        label: 'player'
      },
      {
        label: 'downloads'
      }
    ]
  },
  {
    label: 'view',
    submenu: [
      {
        label: 'cabinet',
        accelerator: 'CmdOrCtrl+B'
      },
      {
        label: 'player',
        accelerator: 'CmdOrCtrl+P'
      },
      {
        label: 'downloads',
        accelerator: 'CmdOrCtrl+D'
      },
      {
        label: 'settings'
      }
    ]
  },
  {
    label: 'help',
    submenu: [
      {
        label: 'search menus',
        accelerator: 'CmdOrCtrl+H'
      },
      {
        label: 'documentation'
      },
      {
        label: 'code base'
      },
      {
        label: 'contact'
      }
    ]
  },
  {
    label: 'Reactronite',
    submenu: [
      {
        label: 'About Reactronite'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WINDOW_CLOSE,
        label: 'Exit',
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        id: MenuChannels.WEB_ACTUAL_SIZE,
        label: 'Reset Zoom',
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0'
      },
      {
        id: MenuChannels.WEB_ZOOM_IN,
        label: 'Zoom In',
        role: 'zoomIn'
      },
      {
        id: MenuChannels.WEB_ZOOM_OUT,
        label: 'Zoom Out',
        role: 'zoomOut',
        accelerator: 'CmdOrCtrl+-'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_FULLSCREEN,
        label: 'Toggle Full Screen',
        role: 'togglefullscreen'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_DEVTOOLS,
        label: 'Toogle Developer Tools',
        role: 'toggleDevTools',
        accelerator: 'CmdOrCtrl+Shift+I'
      }
    ]
  },
  {
    label: 'Authors',
    submenu: [
      {
        id: MenuChannels.OPEN_GITHUB_PROFILE,
        label: 'flaviodelgrosso',
        click: emitEvent(MenuChannels.OPEN_GITHUB_PROFILE, 'flaviodelgrosso')
      }
    ]
  }
];

export default MenuItems;
