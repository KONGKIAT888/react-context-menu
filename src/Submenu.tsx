import React, { useCallback, useState, useRef, ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import ContextMenuItem from './ContextMenuItem';

interface SubmenuProps {
    children: ReactNode;
    element: ReactNode;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
}

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
                style={submenuStyle ?? undefined}
            >
                {children}
            </div>
        </div>
    );
}

export default Submenu;