import { callHideEvent, callShowEvent } from './EventListener';
import React, { useRef, useCallback, ReactNode } from 'react';
import classnames from 'classnames';

export interface ContextMenuTriggerProps {
    id: string,
    attributes?: object,
    disable?: boolean,
    className?: string,
    children?: ReactNode
    disableWhileShiftPressed?: boolean;
}

const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ children, id, disableWhileShiftPressed, attributes, disable, className }) => {
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
        <div
            className={classnames('menu-trigger', className)}
            ref={menuTrigger}
            {...attributes}
            onContextMenu={(e) => handleContextMenu(e)}
        >
            {children}
        </div>
    );
};

export default ContextMenuTrigger;
