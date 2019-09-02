import { rect, style, fadeIn, fadeOut, removeProp, createDummy } from "./util";

export default class SharedTansition {
  constructor(from, to) {
    this.to = to;
    this.wait = 0;
    this.time = 250;
    this.from = from;
    this.played = false;
    this.props = undefined;
    this.style = undefined;
    this.animation = undefined;
    this.toAnimationObj = undefined;
    this.timingFunc = "ease-in-out";
    this.fromAnimationObj = undefined;
  }

  points(props) {
    this.props = { ...props };
    return this;
  }

  styles(style) {
    this.style = style;
    return this;
  }

  delay(wait) {
    this.wait = wait;
    return this;
  }

  easing(timingFunc) {
    this.timingFunc = timingFunc;
    return this;
  }

  duration(time) {
    this.time = time;
    return this;
  }

  async play() {
    let to = this.to;
    let from = this.from;

    fadeIn(to);
    fadeOut(from);

    let fakeDelay = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(), this.wait);
      });

    let animationObj = this.returnAnimateObj(from, to);
    this.toAnimationObj = animationObj.to;
    this.fromAnimationObj = animationObj.from;

    let dummy = createDummy(to);

    this.animation = to.animate([this.fromAnimationObj, this.toAnimationObj], {
      duration: this.time,
      easing: this.timingFunc
    });

    if (this.wait) {
      this.animation.pause();
      await fakeDelay();
      this.animation.play();
    }

    return new Promise((resolve, reject) => {
      this.animation.onfinish = () => {
        this.played = true;
        dummy.remove();
        resolve();
      };
    });
  }

  pause() {
    if (this.animation) this.animation.pause();
  }

  reverse() {
    if (!this.played) return;
    let to = this.to;
    let from = this.from;

    let animationObj = this.returnAnimateObj(from, to);
    this.toAnimationObj = animationObj.to;
    this.fromAnimationObj = animationObj.from;

    let dummy = createDummy(to);

    this.animation = to.animate([this.toAnimationObj, this.fromAnimationObj], {
      duration: this.time,
      easing: this.timingFunc
    });

    return new Promise((resolve, reject) => {
      this.animation.onfinish = () => {
        fadeOut(to);
        fadeIn(from);

        removeProp(to, "opacity");
        removeProp(to, "visibility");

        removeProp(from, "opacity");
        removeProp(from, "visibility");

        this.played = false;
        dummy.remove();
        resolve();
      };
    });
  }

  isTransitioning() {
    let state = this.animation.playState;
    return (state = "finished" ? false : true);
  }

  returnAnimateObj(from, to) {
    let toRect = this.props ? this.props.to : rect(to);
    let fromRect = this.props ? this.props.from : rect(from);

    let toStyle = this.style ? this.style.to : style(to);
    let fromStyle = this.style ? this.style.from : style(from);

    let fromObj = {
      top: 0,
      left: 0,
      right: "auto",
      bottom: "auto",
      position: "fixed",
      width: `${fromRect.width}px`,
      fontSize: fromStyle.fontSize,
      height: `${fromRect.height}px`,
      background: fromStyle.background,
      transform: `translate3d(${fromRect.left}px, ${fromRect.top}px, 0)`
    };

    let toObj = {
      top: 0,
      left: 0,
      right: "auto",
      bottom: "auto",
      position: "fixed",
      width: `${toRect.width}px`,
      fontSize: toStyle.fontSize,
      height: `${toRect.height}px`,
      background: toStyle.background,
      transform: `translate3d(${toRect.left}px, ${toRect.top}px, 0)`
    };

    return { from: fromObj, to: toObj };
  }

  static center(node) {
    if (typeof node === "string") {
      node = document.querySelector(node);
    }

    const winWidth = window.innerWidth;
    const props = rect(node);

    const left = (winWidth - props.width) / 2;
    node.style.left = `${left}px`;
  }
}
