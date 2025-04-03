import React, { ReactNode, useRef } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

export interface AnimateComponentProps {
    children: ReactNode;
    isVisible: boolean;
    timeout: number;
    className: string;
}

const AnimateComponent: React.FC<AnimateComponentProps> = ({ children, isVisible, timeout, className }) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isVisible}
            timeout={timeout}
            classNames={className}
            unmountOnExit
        >
            {children}
        </CSSTransition>
    )
};

export default AnimateComponent;
