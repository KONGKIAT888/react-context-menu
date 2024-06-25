import React, { useCallback, useRef, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { callHideEvent } from './EventListener';

interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    disabled?: boolean;
    preventClose?: boolean;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
    children,
    onClick,
    disabled = false,
    preventClose = false,
    className,
    ...rest
}) => {
    const contextMenuItem = useRef<HTMLDivElement>(null);

    const handleClickEvent = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (disabled) return;
            if (onClick) onClick(e);

            if (!preventClose) callHideEvent('ID_NOT_REQUIRED');
        },
        [disabled, onClick, preventClose]
    );

    return (
        <div
            className={classnames('contextmenu__item', { 'contextmenu__item--disabled': disabled }, className)}
            onClick={handleClickEvent}
            ref={contextMenuItem}
            {...rest}
        >
            {children}
        </div>
    );
};

export default ContextMenuItem;