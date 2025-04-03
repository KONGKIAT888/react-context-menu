import React, { useCallback, useRef, useState, CSSProperties, ReactNode, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { callHideEvent } from './EventListener';

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean,
    preventClose?: boolean,
    disableWhileShiftPressed?: boolean,
    attributes?: object,
    className?: string,
    children?: ReactNode,
    onClick?: { (event: any): void }
}

export interface SubmenuProps {
    element: ReactNode,
    attributes?: object,
    className?: string;
    children?: ReactNode
}

const ContextMenuItem: React.FC<ContextMenuItemProps> & { Submenu: React.FC<SubmenuProps> } = ({
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

const Submenu: React.FC<SubmenuProps> = ({ children, element, attributes, className = '' }) => {
    const [submenuStyle, setSubmenuStyle] = useState<CSSProperties | null>(null);
    const submenuEl = useRef<HTMLDivElement>(null);
    const submenuItem = useRef<HTMLDivElement>(null);

    const calculateSubmenuPos = useCallback(() => {
        if (submenuItem.current && submenuEl.current) {
            const { innerHeight: windowInnerHeight, innerWidth: windowInnerWidth } = window;
            const {
                left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight
            } = submenuItem.current.getBoundingClientRect();
            const {
                width: submenuWidth, height: submenuHeight
            } = submenuEl.current.getBoundingClientRect();
            let style: CSSProperties = {
                opacity: 1,
                visibility: 'visible'
            };

            if ((itemTop + submenuHeight + itemHeight) > windowInnerHeight) {
                style = {
                    ...style,
                    top: 'inherit',
                    bottom: '0'
                };
            }
            if ((itemLeft + submenuWidth + itemWidth) > windowInnerWidth) {
                style = {
                    ...style,
                    left: 'inherit',
                    right: '100%'
                };
            }

            setSubmenuStyle(style);
        }
    }, []);

    const hideSubmenu = useCallback(() => {
        const style: CSSProperties = {
            opacity: 0,
            visibility: 'hidden'
        };

        setSubmenuStyle(style);
    }, []);

    return (
        <div
            className={classnames('submenu', ...className.split(' '))}
            onMouseOver={calculateSubmenuPos}
            onMouseOut={hideSubmenu}
            ref={submenuItem}
            {...attributes}
        >
            <ContextMenuItem>
                {element}
            </ContextMenuItem>
            <div
                className="submenu__item"
                ref={submenuEl}
                style={submenuStyle ?? undefined}
            >
                {children}
            </div>
        </div>
    );
};

ContextMenuItem.Submenu = Submenu;

export default ContextMenuItem;