import React from 'react';
import ContextMenuItem from 'src/ContextMenuItem';
import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import 'src/style.scss';

function App() {

    return (
        <div className="app">
            <ContextMenuTrigger id="context-menu-1">
                <div className="box">
                    Right Click On Me
                </div>
            </ContextMenuTrigger>
            <ContextMenu
                id="context-menu-1"
                appendTo="body"
                animation="zoom"
                hideOnLeave={false}
                preventHideOnScroll={true}
                preventHideOnResize={true}
                attributes={{
                    'aria-label': 'Some text',
                    'aria-labelledby': 'Some text'
                }}
                className="my-context-menu"
                onMouseLeave={() => console.log('Mouse left')}
                onShow={(e) => console.log('is visible!', e)}
                onHide={(e) => console.log('is hidden!', e)}
            >
                <ContextMenuItem><span>Menu Item 1</span></ContextMenuItem>
                <ContextMenuItem>Menu Item 2</ContextMenuItem>
                <ContextMenuItem>Menu Item 3</ContextMenuItem>
                <ContextMenuItem>Menu Item 4</ContextMenuItem>
                <ContextMenuItem.Submenu element={
                    <span>Submenu Item</span>
                }>
                    <ContextMenuItem>Sub Menu Item 1</ContextMenuItem>
                    <ContextMenuItem>Sub Menu Item 2</ContextMenuItem>
                    <ContextMenuItem>Sub Menu Item 3</ContextMenuItem>
                    <ContextMenuItem>Sub Menu Item 4</ContextMenuItem>
                </ContextMenuItem.Submenu>
            </ContextMenu>
        </div>
    );
}

export default App;