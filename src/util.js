export function rect(node) {
  return node.getBoundingClientRect();
  // return {
  //   top: node.offsetTop,
  //   left: node.offsetLeft,
  //   width: node.clientWidth,
  //   height: node.clientHeight
  // };
}

export function style(node) {
  return getComputedStyle(node);
}

export function fadeOut(el) {
  Object.assign(el.style, {
    opacity: 0,
    visibility: "hidden"
  });
}

export function fadeIn(el) {
  Object.assign(el.style, {
    opacity: 1,
    visibility: "visible"
  });
}

export function removeProp(el, prop) {
  el.style.removeProperty(prop);
}

export function createDummy(node) {
  let dummy = node.cloneNode(true);
  dummy.style.background = "none";
  dummy.removeAttribute("src");
  dummy.removeAttribute("style");
  dummy.style.visibility = "hidden";
  dummy.removeAttribute("data-key");
  dummy.setAttribute("data-clone", "clone");
  node.parentNode.insertBefore(dummy, node);
  return dummy;
}
