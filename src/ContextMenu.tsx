import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import AnimateComponent from './AnimateComponent';
import { callHideEvent, registerEvent } from './EventListener';
import { throttle } from './Helper';

interface ContextMenuProps {
    children: React.ReactNode;
    id: string;
    appendTo?: string | null;
    hideOnLeave?: boolean;
    onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onHide?: () => void;
    onShow?: () => void;
    preventHideOnScroll?: boolean;
    preventHideOnResize?: boolean;
    attributes?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    animation?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, id, appendTo, hideOnLeave, preventHideOnResize, preventHideOnScroll, attributes, className, animation, onMouseLeave, onHide, onShow }) => {
        const contextMenuEl = React.useRef<HTMLDivElement>(null);
        const [isVisible, setVisible] = React.useState(false);
        const [clientPosition, setClientPosition] = React.useState<{ clientX: number, clientY: number } | null>(null);

        const showMenu = (e: { position: { clientX: number, clientY: number } }) => {
            const { position } = e;
            setVisible(true);
            setClientPosition(position);
        };

        const hideMenu = () => {
            setVisible(false);
            if (onHide) onHide();
        };

        const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

        React.useEffect(() => {
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

        React.useEffect(() => {
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

                if (onShow) onShow();
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
                <ContextComponent/>,
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
                    <PortalContextComponent/>
                </AnimateComponent>
            ) : (
                <PortalContextComponent/>
            );
        }

        return animation ? (
            <AnimateComponent
                isVisible={isVisible}
                timeout={200}
                className={animation}
            >
                <ContextComponent/>
            </AnimateComponent>
        ) : <ContextComponent/>;
    }
;

export default ContextMenu;
