import React from 'react';
import classnames from 'classnames';
import ContextMenuItem from './ContextMenuItem';

interface SubmenuProps {
    id: string;
    children: React.ReactNode;
    element: React.ReactNode;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
}

const Submenu: React.FC<SubmenuProps> = ({
    id,
    children,
    element,
    attributes = {},
    className = ''
}) => {
    const [submenuStyle, setSubmenuStyle] = React.useState<React.CSSProperties>({});
    const submenuEl = React.useRef<HTMLDivElement>(null);
    const submenuItem = React.useRef<HTMLDivElement>(null);

    const calculateSubmenuPos = React.useCallback(() => {
        const { innerHeight: windowInnerHeight, innerWidth: windowInnerWidth } = window;
        const {
            left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight
        } = submenuItem.current!.getBoundingClientRect();
        const {
            width: submenuWidth, height: submenuHeight
        } = submenuEl.current!.getBoundingClientRect();
        let style: React.CSSProperties = {
            opacity: 1,
            visibility: 'visible'
        };

        // Adjust for bottom overflow
        if ((itemTop + submenuHeight + itemHeight) > windowInnerHeight) {
            style = {
                ...style,
                top: 'inherit',
                bottom: '0',
                maxHeight: windowInnerHeight - itemTop - itemHeight,
                overflowY: 'auto'
            };
        } else {
            style = {
                ...style,
                top: 'inherit',
                bottom: 'inherit',
                maxHeight: 'inherit',
                overflowY: 'inherit'
            };
        }

        // Adjust for right overflow
        if ((itemLeft + submenuWidth + itemWidth) > windowInnerWidth) {
            style = {
                ...style,
                left: 'inherit',
                right: '100%'
            };
        } else {
            style = {
                ...style,
                left: itemWidth,
                right: 'inherit'
            };
        }

        setSubmenuStyle(style);
    }, []);

    const hideSubmenu = React.useCallback(() => {
        const style: React.CSSProperties = {
            opacity: 0,
            visibility: 'hidden'
        };

        setSubmenuStyle(style);
    }, []);

    return (
        <div
            className={classnames('submenu', className)}
            onMouseOver={calculateSubmenuPos}
            onMouseOut={hideSubmenu}
            onFocus={() => null}
            onBlur={() => null}
            ref={submenuItem}
            {...attributes}
        >
            <ContextMenuItem>
                {element}
            </ContextMenuItem>
            <div
                className="submenu__item"
                ref={submenuEl}
                style={submenuStyle}
            >
                {children}
            </div>
        </div>
    );
};

export default Submenu;
