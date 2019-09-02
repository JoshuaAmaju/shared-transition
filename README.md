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

## Note:

if you use the below CSS approach to center fixed DOM elements horizontally.

```css
selector {
  left: 50%;
  position: fixed;
  transform: translate3d(-50%, 0, 0);
}
```

The transition would not work properly, check [here](https://stackoverflow.com/a/15256339) for more details on the issue.

Shared-Transition comes with a center method for centering fixed elements in the DOM horizontally. Use that instead.

Any translate value applied on any of the target elements parent before the
transition plays would cause a distortion in the transition.

### example

```javascript
SharedTransition.center(element);
```
