import { useEventListener } from '@/app/hooks';
import { MenuChannels } from '@/channels/menuChannels';
import { fixAcceleratorText } from '@/menu/accelerators';
import menuList from '@/menu/appMenu';

import { createRef, useMemo, useRef } from 'react';

import type React from 'react';

export default function Menu () {
  const activeMenuIndex = useRef<number | null>(null);
  const menusRef = useMemo(() => menuList.map(() => createRef<HTMLDivElement>()), []);

  useEventListener('keydown', (event) => handleKeyDown(event));

  useEventListener('mousedown', (event) => handleClickOutside(event));

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (e.altKey) activeMenuIndex.current && closeActiveMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (activeMenuIndex.current != null) {
      if (
        menusRef[activeMenuIndex.current].current &&
        !menusRef[activeMenuIndex.current].current?.contains(event.target as Node)
      ) {
        closeActiveMenu();
      }
    }
  };

  const showMenu = (index: number, e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (menusRef[index].current?.classList.contains('active')) {
      closeActiveMenu();
    } else {
      menusRef[index].current?.classList.add('active');
      menusRef[index].current?.parentElement?.classList.add('active');
      activeMenuIndex.current = index;
    }
  };

  const onMenuHover = (index: number) => {
    if (activeMenuIndex.current != null) {
      menusRef[activeMenuIndex.current].current?.classList.toggle('active');
      menusRef[index].current?.classList.toggle('active');
      menusRef[index].current?.parentElement?.classList.toggle('active');
      menusRef[activeMenuIndex.current].current?.parentElement?.classList.toggle('active');

      activeMenuIndex.current = index;
    }
  };

  const closeActiveMenu = () => {
    if (activeMenuIndex.current != null) {
      menusRef[activeMenuIndex.current].current?.classList.remove('active');
      menusRef[activeMenuIndex.current].current?.parentElement?.classList.remove('active');
      activeMenuIndex.current = null;
    }
  };

  const handleAction = (menuItem: Electron.MenuItemConstructorOptions) => {
    closeActiveMenu();
    const actionId = menuItem.id;
    if (actionId) {
      if (actionId === MenuChannels.OPEN_GITHUB_PROFILE) {
        return electron.ipcRenderer.invoke(actionId, menuItem.label);
      }
      return electron.ipcRenderer.send(MenuChannels.EXECUTE_MENU_ITEM_BY_ID, actionId);
    }
  };

  const renderItemAccelerator = (menuItem: Electron.MenuItemConstructorOptions) => {
    if (menuItem.id === MenuChannels.WEB_ZOOM_IN) {
      const firstKey = __DARWIN__ ? '⌘' : 'Ctrl';
      const plus = __DARWIN__ ? '' : '+';
      const thirdKey = '+';
      return `${firstKey}${plus}${thirdKey}`;
    }

    if (menuItem.accelerator) {
      return fixAcceleratorText(menuItem.accelerator);
    }
  };

  return (
    <section className='flex items-stretch'>
      {menuList.map(({ label, submenu }, menuIndex) => {
        return (
          <div className='flex-col' key={`menu_${menuIndex + 1}`}>
            <button
              className='h-8 hover:bg-secondary text-[13px] px-3'
              type='button'
              tabIndex={0}
              onClick={(e) => showMenu(menuIndex, e)}
              onKeyDown={(e) => showMenu(menuIndex, e)}
              onMouseEnter={() => onMenuHover(menuIndex)}
              onDoubleClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.preventDefault()}
            >
              {label}
            </button>
            <div className='menu-popup fixed bg-popover z-10000 min-w-20' ref={menusRef[menuIndex]}>
              {Array.isArray(submenu) &&
                submenu.map((menuItem, menuItemIndex) => {
                  if (menuItem.type === 'separator') {
                    return (
                      <div key={`menu_${menuIndex}_popup_item_${menuItemIndex + 1}`} className='popup-item-separator' />
                    );
                  }

                  return (
                    <button
                      key={`menu_${menuIndex}_popup_item_${menuItemIndex + 1}`}
                      className='flex py-1.5 pl-7 pr-4 justify-between hover:bg-accent hover:text-accent-foreground hover:cursor-pointer w-full text-[13px]'
                      onMouseDown={(e) => e.preventDefault()}
                      onKeyDown={(e) => e.preventDefault()}
                      type='button'
                      tabIndex={0}
                      onClick={() => handleAction(menuItem)}
                    >
                      <div className='popup-item-name'>{menuItem.label}</div>
                      <div className='popup-item-shortcut'>{renderItemAccelerator(menuItem)}</div>
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
