import { rect, style, fadeIn, fadeOut, removeProp } from "./util";

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
    this.assignedAttrs = undefined;
    this.toAnimationObj = undefined;
    this.timingFunc = "ease-in-out";
    this.fromAnimationObj = undefined;

    this.init();
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

  init() {
    let to = this.to;
    let from = this.from;

    fadeIn(to);
    fadeOut(from);

    if (!this.props) {
      this.props = {
        to: rect(to),
        from: rect(from)
      };
    }

    let toRect = this.props.to;
    let fromRect = this.props.from;

    let toStyle = this.style ? this.style.to : style(to);
    let fromStyle = this.style ? this.style.from : style(from);

    // let scaleX = fromRect.width / toRect.width;
    // let scaleY = fromRect.height / toRect.height;

    this.assignedAttrs = {
      width: to.style.width,
      height: to.style.height,
      transform: to.style.transform
    };

    Object.assign(to.style, {
      width: `${fromRect.width}px`,
      height: `${fromRect.height}px`
      // transform: `scale3d(${scaleX}, ${scaleY}, 1)`
    });

    let newToRect = rect(to);

    let top = fromRect.top - newToRect.top;
    let left = fromRect.left - newToRect.left;

    Object.assign(to.style, {
      transform: `translate3d(${left}px, ${top}px, 0)`
    });

    this.fromAnimationObj = {
      width: `${fromRect.width}px`,
      fontSize: fromStyle.fontSize,
      height: `${fromRect.height}px`,
      background: fromStyle.background,
      borderRadius: fromStyle.borderRadius,
      transform: `translate3d(${left}px, ${top}px, 0)`
    };

    this.toAnimationObj = {
      width: `${toRect.width}px`,
      fontSize: toStyle.fontSize,
      height: `${toRect.height}px`,
      background: toStyle.background,
      transform: "translate3d(0, 0, 0)",
      borderRadius: toStyle.borderRadius
    };
  }

  async play() {
    let to = this.to;

    let fakeDelay = timeout =>
      new Promise(resolve => {
        setTimeout(() => resolve(), timeout);
      });

    removeProp(to, "transform");

    Object.assign(to.style, this.assignedAttrs);

    this.animation = to.animate([this.fromAnimationObj, this.toAnimationObj], {
      duration: this.time,
      easing: this.timingFunc
    });

    // this.animation.pause();

    if (this.wait) {
      this.animation.pause();
      await fakeDelay(this.wait);
      this.animation.play();
    }

    return new Promise(resolve => {
      this.animation.onfinish = () => {
        this.played = true;
        resolve();
      };
    });
  }

  pause() {
    if (this.animation) this.animation.pause();
    return this;
  }

  reverse() {
    if (!this.played) return;
    let to = this.to;
    let from = this.from;

    // let toRect = this.props.to;
    // let fromRect = this.props.from;

    // let toStyle = this.style ? this.style.to : style(to);
    // let fromStyle = this.style ? this.style.from : style(from);

    // Object.assign(to.style, {
    //   width: `${fromRect.width}px`,
    //   height: `${fromRect.height}px`
    //   // transform: `scale3d(${scaleX}, ${scaleY}, 1)`
    // });

    // let newToRect = rect(to);

    // let top = fromRect.top - newToRect.top;
    // let left = fromRect.left - newToRect.left;

    // this.fromAnimationObj = {
    //   width: `${fromRect.width}px`,
    //   fontSize: fromStyle.fontSize,
    //   height: `${fromRect.height}px`,
    //   background: fromStyle.background,
    //   borderRadius: fromStyle.borderRadius,
    //   transform: `translate3d(${left}px, ${top}px, 0)`
    // };

    // this.toAnimationObj = {
    //   width: `${toRect.width}px`,
    //   fontSize: toStyle.fontSize,
    //   height: `${toRect.height}px`,
    //   background: toStyle.background,
    //   transform: "translate3d(0, 0, 0)",
    //   borderRadius: toStyle.borderRadius
    // };

    // this.animation = to.animate([this.toAnimationObj, this.fromAnimationObj], {
    //   duration: this.time,
    //   easing: this.timingFunc
    // });

    this.animation.reverse();

    return new Promise(resolve => {
      this.animation.onfinish = () => {
        fadeOut(to);
        fadeIn(from);

        removeProp(to, "opacity");
        removeProp(to, "visibility");

        removeProp(from, "opacity");
        removeProp(from, "visibility");

        this.played = false;
        resolve();
      };
    });
  }

  isTransitioning() {
    let state = this.animation.playState;
    return (state = "finished" ? false : true);
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
