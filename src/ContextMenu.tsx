import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import AnimateComponent from './AnimateComponent';
import { callHideEvent, registerEvent } from './EventListener';
import { throttle } from './Helper';

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

const ContextMenu: React.FC<ContextMenuProps> = ({ children, id, appendTo, hideOnLeave, preventHideOnResize, preventHideOnScroll, attributes, className, animation, onMouseLeave, onHide, onShow }) => {
        const contextMenuEl = useRef<HTMLDivElement>(null);
        const [isVisible, setVisible] = useState(false);
        const [clientPosition, setClientPosition] = useState<{ clientX: number, clientY: number } | null>(null);

        const showMenu = (e: { position: { clientX: number, clientY: number } }) => {
            const { position } = e;
            setVisible(true);
            setClientPosition(position);
        };

        const hideMenu = () => {
            setVisible(false);
            if (onHide) onHide(clientPosition);
        };

        const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            if (onMouseLeave) onMouseLeave(e);
            if (hideOnLeave) callHideEvent(id);
        }, [hideOnLeave, id, onMouseLeave]);

        const clickOutsideCallback = (event: MouseEvent) => {
            if (contextMenuEl.current && !contextMenuEl.current.contains(event.target as Node)) {
                callHideEvent(id);
            }
        };

        const contextMenuCallback = (event: MouseEvent) => {
            let targetElement = event.target as HTMLElement;
            do {
                if (targetElement.classList && targetElement.classList.contains('menu-trigger')) {
                    return;
                }
                targetElement = targetElement.parentElement as HTMLElement;
            } while (targetElement);
            callHideEvent(id);
        };

        const onScrollHideCallback = throttle(() => {
            callHideEvent(id);
        }, 200);

        const onResizeHideCallback = throttle(() => {
            callHideEvent(id);
        }, 200);

        useEffect(() => {
            registerEvent(id, showMenu, hideMenu);

            // detect click outside
            document.addEventListener('mousedown', clickOutsideCallback);

            // detect right click outside
            document.addEventListener('contextmenu', contextMenuCallback);

            // on scroll hide handled
            if (!preventHideOnScroll) {
                window.addEventListener('scroll', onScrollHideCallback);
            }

            // on resize hide handled
            if (!preventHideOnResize) {
                window.addEventListener('resize', onResizeHideCallback);
            }

            return () => {
                document.removeEventListener('mousedown', clickOutsideCallback);
                document.removeEventListener('contextmenu', contextMenuCallback);
                window.removeEventListener('scroll', onScrollHideCallback);
                window.removeEventListener('resize', onResizeHideCallback);
            };
        }, [id, preventHideOnScroll, preventHideOnResize, onScrollHideCallback, onResizeHideCallback]);

        useEffect(() => {
            if (isVisible && clientPosition && contextMenuEl.current) {
                const { clientY, clientX } = clientPosition;
                const { innerHeight: windowInnerHeight, innerWidth: windowInnerWidth } = window;
                const { offsetHeight: elemHeight, offsetWidth: elemWidth } = contextMenuEl.current;

                let newClientY = clientY;
                let newClientX = clientX;

                if (windowInnerHeight < clientY + elemHeight) newClientY = clientY - elemHeight;
                if (windowInnerWidth < clientX + elemWidth) newClientX = clientX - elemWidth;

                contextMenuEl.current.style.top = `${newClientY + 2}px`;
                contextMenuEl.current.style.left = `${newClientX + 2}px`;

                if (onShow) onShow(clientPosition);
            }
        }, [isVisible, clientPosition, onShow]);

        const childrenWithProps = React.Children.map(children, child =>
            React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { id }) : child
        );

        const ContextComponent = () => (
            <div
                className={classnames('contextmenu', className)}
                ref={contextMenuEl}
                onMouseLeave={handleMouseLeave}
                {...attributes}
            >
                {childrenWithProps}
            </div>
        );

        const PortalContextComponent = () => (
            ReactDOM.createPortal(
                <ContextComponent />,
                document.querySelector(appendTo!) as Element
            )
        );

        if (document.readyState === 'complete' && appendTo) {
            return animation ? (
                <AnimateComponent
                    isVisible={isVisible}
                    timeout={200}
                    className={animation}
                >
                    <PortalContextComponent />
                </AnimateComponent>
            ) : (
                <PortalContextComponent />
            );
        }

        return animation ? (
            <AnimateComponent
                isVisible={isVisible}
                timeout={200}
                className={animation}
            >
                <ContextComponent />
            </AnimateComponent>
        ) : <ContextComponent />;
    }
;

export default ContextMenu;
