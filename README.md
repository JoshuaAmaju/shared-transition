# shared-transition

Transition between DOM elements.
[Demo](https://joshuaamaju.github.io/shared-transition/)

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
await transition
  .delay(delay)
  .easing(easing)
  .duration(duration)
  .play();

await transition.reverse();
```

The play and reverse function returns a promise which resolves when the transition is done.
