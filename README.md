# shared-transition

Transition between DOM elements.

### script tag

```html
<script src="https://unpkg.com/shared-transition@0.0.1/dist/shared-transition.umd.js"></script>
```

### npm

```bash
npm install shared-transition
```

or

```bash
yarn add shared-transition
```

## Usage

```javascript
let transition = new SharedTransition(from, to);
await transition.play();

await transition.reverse();
```

#### The play and reverse function returns a promise which resolves when the transition is done.

## Note:

if you use the below css approach to center fixed DOM elements.

```css
selector {
  left: 50%;
  position: fixed;
  transform: translate3d(-50%, 0, 0);
}
```

The transition would not work properly, check [here](https://stackoverflow.com/a/15256339) for more details on the issue.

Shared-Transition comes with a center method for centering fixed elements in the DOM. Use that instead.

### example

```javascript
SharedTransition.center(element);
```

[Demo](https://joshuaamaju.github.io/shared-transition/)
