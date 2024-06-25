import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

interface AnimateComponentProps {
    children: React.ReactNode;
    isVisible: boolean;
    timeout: number;
    className: string;
}

const AnimateComponent: React.FC<AnimateComponentProps> = ({ children, isVisible, timeout, className }) => {
    const nodeRef = React.useRef(null);

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
