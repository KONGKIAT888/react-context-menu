[![npm version](https://badge.fury.io/js/@kongkiat%2Freact-context-menu.svg)](https://badge.fury.io/js/@kongkiat%2Freact-context-menu)

### Note:
 - `@kongkiat/react-context-menu` Developed from [react-contextmenu](https://www.npmjs.com/package/react-contextmenu)
 - Supports React `16.8` and above versions because this plugin solely uses React Hooks.

# react-context-menu

Context menu plugin for React.

## Table of contents

- [Browser Support](#browser-support)
- [Installation](#installation)
- [Sample Usage](#sample-usage)
- [Full Example Usage](#full-example-usage)
- [APIs](#apis)
- [LICENSE](#license)

## Browser Support

- IE 11 and Edge >= 12
- FireFox >= 38
- Chrome >= 47
- Opera >= 34
- Safari >= 8

## Installation

```npm
$ npm install --save @kongkiat/react-context-menu
```

```yarn
$ yarn add @kongkiat/react-context-menu
```

## Sample Usage

```tsx
import React from 'react';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem, Submenu } from '@kongkiat/react-context-menu';

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
```

## Full example usage

```tsx
<ContextMenuTrigger
    id="my-contextmenu"
    disable={false}
    disableWhileShiftPressed={true}
    attributes={{
        'aria-label': 'Some text',
        'aria-labelledby': 'Some text'
    }}
    className="my-context-menu-trigger"
>
    {children}
</ContextMenuTrigger>
```

```tsx
<ContextMenu
    id="my-contextmenu"
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
    onShow={() => console.log('is visible!')}
    onHide={() => console.log('is hidden!')}
/>
```

```tsx
<ContextMenuItem
    disabled={true}
    preventClose={false}
    attributes={{
        'aria-label': 'Some text',
        'aria-labelledby': 'Some text'
    }}
    className="my-context-menu-item"
    onClick={() => console.log("is clicked!")}
>
    {children}
</ContextMenuItem>
```

```tsx
<ContextMenuItem.Submenu
    element={<span>Submenu Item</span>}
    attributes={{
        'aria-label': 'Some text',
        'aria-labelledby': 'Some text'
    }}
    className="my-context-menu-submenu"
>
    {children}
</ContextMenuItem.Submenu>
```

## APIs
#### `<ContextMenuTrigger />`

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th width="10%">Name</th>
      <th width="5%">Type</th>
      <th width="30%">Options</th>
      <th width="55%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>Should be a string.</td>
      <td>`ContextMenu` and `ContextMenuTrigger` id should match.</td>
    </tr>
    <tr>
      <td>as</td>
      <td>ElementType <strong>Default: div </strong></td>
      <td>-</td>
      <td>Define the element type.</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>Object</td>
      <td>-</td>
      <td>Add additional attributes to the element.</td>
    </tr>
    <tr>
      <td>disable</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>false</td>
      <td>Disable contextmenu and open browser default contextmenu.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td>-</td>
      <td>Additional classes.</td>
    </tr>
    <tr>
      <td>children</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>The content inside the trigger element.</td>
    </tr>
    <tr>
      <td>disableWhileShiftPressed</td>
      <td>Boolean</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>Open browser default contextmenu if shift pressed while right click on trigger element.</td>
    </tr>
  </tbody>
</table>

#### `<ContextMenu />`

<table class="table table-bordered table-striped">
  <thead>
  <tr>
    <th width="10%">Name</th>
    <th width="5%">Type</th>
    <th width="30%">Options</th>
    <th width="55%">Description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>Should be a string.</td>
      <td>`ContextMenu` and `ContextMenuTrigger` id should match.</td>
    </tr>
    <tr>
      <td>appendTo</td>
      <td>String</td>
      <td>Should be a string which contains element selector like <strong>body</strong> / <strong>#id</strong> / <strong>.class</strong> . <strong>Default: Enclosed element</strong></td>
      <td>Append context menu inside required element.</td>
    </tr>
    <tr>
      <td>animation</td>
      <td>String</td>
      <td>Enums: <strong>fade</strong> | <strong>zoom</strong> | <strong>pop</strong> | <strong>toTopLef</strong> | <strong>rightToLeft</strong></td>
      <td>Make the contextmenu visible in animated way.</td>
    </tr>
    <tr>
      <td>hideOnLeave</td>
      <td>Boolean</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>Hide contextmenu on blur or mouseOut.</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>Object</td>
      <td>-</td>
      <td>Add additional attributes to the element.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td>-</td>
      <td>Additional classes.</td>
    </tr>
    <tr>
      <td>preventHideOnResize</td>
      <td>Boolean</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>Prevent hiding contextmenu from hiding on window resize.</td>
    </tr>
    <tr>
      <td>preventHideOnScroll</td>
      <td>Boolean</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>Prevent hiding contextmenu from hiding on scroll.</td>
    </tr>
    <tr>
      <td>onShow</td>
      <td>Function</td>
      <td>() => {}</td>
      <td>Trigger this event when Context Menu is visible.</td>
    </tr>
    <tr>
      <td>onHide</td>
      <td>Function</td>
      <td>() => {}</td>
      <td>Trigger this event when Context Menu is hidden.</td>
    </tr>
    <tr>
      <td>onMouseLeave</td>
      <td>Function</td>
      <td>() => {}</td>
      <td>Invoke onMouseLeave on blur or mouseOut.</td>
    </tr>
    <tr>
      <td>children</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>The content inside the context menu.
    </tr>
  </tbody>
</table>

#### `<ContextMenuItem />`

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th width="10%">Name</th>
      <th width="5%">Type</th>
      <th width="30%">Options</th>
      <th width="55%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <td>true / False . Default False</td>
      <td>Disable menu item.</td>
    </tr>
    <tr>
      <td>preventClose</td>
      <td>Boolean</td>
      <td>true / False . Default False</td>
      <td>Context menu is closed as soon as an item is clicked.</td>
    </tr>
    <tr>
      <td>disableWhileShiftPressed</td>
      <td>Boolean</td>
      <td>true / false. <strong>Default: false</strong></td>
      <td>Open browser default contextmenu if shift pressed while right click on trigger element.</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>Object</td>
      <td>-</td>
      <td>Add additional attributes to the element.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td>-</td>
      <td>Additional classes.</td>
    </tr>
    <tr>
      <td>onClick</td>
      <td>Function</td>
      <td>() => {}</td>
      <td>Fire onClick event.</td>
    </tr>
    <tr>
      <td>children</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>The content inside the menu item.</td>
  </tbody>
</table>

#### `<ContextMenuItem.Submenu />`

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th width="10%">Name</th>
      <th width="5%">Type</th>
      <th width="30%">Options</th>
      <th width="55%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>element</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>Element to trigger the submenu.</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>Object</td>
      <td>-</td>
      <td>Add additional attributes to the element.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td>-</td>
      <td>Additional classes.</td>
    </tr>
    <tr>
      <td>children</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>Submenu items.</td>
    </tr>
  </tbody>
</table>

## License

MIT License