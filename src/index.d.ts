import { HTMLAttributes, ReactNode } from 'react';

declare module '@kongkiat/react-context-menu' {
    import * as React from 'react';
    export interface AnimateComponentProps {
        children: ReactNode;
        isVisible: boolean;
        timeout: number;
        className: string;
    }

    export interface ContextMenuProps {
        id: string,
        appendTo?: string,
        animation?: 'fade' | 'zoom' | 'pop' | 'toTopLef' | 'rightToLeft',
        hideOnLeave?: boolean,
        attributes?: object,
        className?: string,
        children?: ReactNode,
        preventHideOnResize?: boolean,
        preventHideOnScroll?: boolean,
        onShow?: { (event: any): void },
        onHide?: { (event: any): void },
        onMouseLeave?: { (event: any): void }
    }

    export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
        disabled?: boolean,
        preventClose?: boolean,
        disableWhileShiftPressed?: boolean,
        attributes?: object,
        className?: string,
        children?: ReactNode,
        onClick?: { (event: any): void }
    }

    export interface ContextMenuTriggerProps {
        id: string,
        attributes?: object,
        disable?: boolean,
        className?: string,
        children?: ReactNode
        disableWhileShiftPressed?: boolean;
    }

    export interface SubmenuProps {
        element: ReactNode,
        attributes?: object,
        className?: string;
        children?: ReactNode
    }

    export const ContextMenu: React.FunctionComponent<ContextMenuProps>;
    export const ContextMenuItem: React.FunctionComponent<ContextMenuItemProps>;
    export const ContextMenuTrigger: React.FunctionComponent<ContextMenuTriggerProps>;
}