import { callHideEvent, callShowEvent } from './EventListener';
import React, { useRef, useCallback, ReactNode, ElementType } from 'react';
import classnames from 'classnames';

export interface ContextMenuTriggerProps {
    id: string,
    as?: ElementType;
    attributes?: object,
    disable?: boolean,
    className?: string,
    children?: ReactNode
    disableWhileShiftPressed?: boolean;
    onClick?: (event: React.MouseEvent<ElementType, MouseEvent>) => void;
}

const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ as: Component = 'div', children, id, disableWhileShiftPressed, attributes, disable, className, onClick }) => {
    const menuTrigger = useRef<HTMLDivElement>(null);

    const handleContextMenu = useCallback((e: React.MouseEvent<ElementType, MouseEvent>) => {
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
            onClick={(e: React.MouseEvent<ElementType, MouseEvent>) => onClick && onClick(e)}
            onContextMenu={(e: React.MouseEvent<ElementType, MouseEvent>) => handleContextMenu(e)}
        >
            {children}
        </Component>
    );
};

export default ContextMenuTrigger;
