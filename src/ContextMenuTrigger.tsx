import { callHideEvent, callShowEvent } from './EventListener';
import React, { useRef, useCallback, ReactNode, ElementType } from 'react';
import classnames from 'classnames';

export interface ContextMenuTriggerProps<T extends ElementType = 'div'>  {
    id: string,
    as?: T;
    attributes?: object,
    disable?: boolean,
    className?: string,
    children?: ReactNode
    disableWhileShiftPressed?: boolean;
}

const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ as: Component = 'div', children, id, disableWhileShiftPressed, attributes, disable, className }) => {
    const menuTrigger = useRef<HTMLDivElement>(null);

    const handleContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disable) return;
        if (disableWhileShiftPressed && e.nativeEvent.shiftKey) {
            callHideEvent(id);
            return;
        }
        e.preventDefault();
        e.stopPropagation();

        const { clientX, clientY } = e.nativeEvent;
        const opts = {
            position: {
                clientY,
                clientX
            },
            id
        };

        callShowEvent(opts);
    }, [id, disable, disableWhileShiftPressed]);

    return (
        <Component
            className={classnames('menu-trigger', className)}
            ref={menuTrigger}
            {...attributes}
            onContextMenu={(e) => handleContextMenu(e)}
        >
            {children}
        </Component>
    );
};

export default ContextMenuTrigger;
