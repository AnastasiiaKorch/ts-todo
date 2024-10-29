import React from 'react';
import styled from 'styled-components';

interface DrawerProps {
    isOpen: boolean;
    onClose: ()=>void;
    children: any;
}

const Overlay = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
`;

const DrawerContainer = styled.div<{ isOpen: boolean, onClose:()=>void }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 50vw;
    height: 100vh;
    background-color: white;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
 
`;

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children}) => {
    return (
        <>
            <Overlay isOpen={isOpen} onClick={onClose}/>
            <DrawerContainer isOpen={isOpen} onClose={onClose}>
                {children}
            </DrawerContainer>
        </>
    );
};

export default Drawer;