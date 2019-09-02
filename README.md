# shared-transition
Transition between DOM elements.

### script tag
```html
<script src=""></script>
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

[Demo](https://joshuaamaju.github.io/shared-transition/)
