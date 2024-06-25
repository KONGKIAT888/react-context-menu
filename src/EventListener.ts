import { uniqueId } from './Helper';

interface Event {
    id: string;
    showMenu: (opts: any) => void;
    hideMenu: () => void;
}

const events: { [key: string]: Event } = {};

let activeEvent: Partial<Event> = {};

const registerEvent = (id: string, showMenu: (opts: any) => void, hideMenu: () => void): string => {
    const _ = uniqueId();

    events[_] = {
        id,
        showMenu,
        hideMenu
    };

    return id;
};

const callShowEvent = (opts: { id: string }): void => {
    if (activeEvent.hideMenu) activeEvent.hideMenu();
    Object.keys(events).forEach(key => {
        if (events[key].id && events[key].id === opts.id) {
            events[key].showMenu(opts);
            activeEvent = events[key];
        }
    });
};

const callHideEvent = (menuId: string): void => {
    if (activeEvent.id === menuId || menuId === 'ID_NOT_REQUIRED') {
        if (activeEvent.hideMenu) activeEvent.hideMenu();
        activeEvent = {};
    }
};

export { registerEvent, callShowEvent, callHideEvent };
