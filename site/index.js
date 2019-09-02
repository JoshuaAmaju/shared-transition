let preview = document.querySelector(".preview");
let overlay = preview.querySelector(".overlay");
let list = document.querySelector("ul");

let images = [
  "https://images.unsplash.com/photo-1567336063833-7bbfa8b20b97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1567320743368-9db24e12ebf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=765&q=80",
  "https://images.unsplash.com/photo-1567272265565-b3b186ce7b23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1562184552-d33c64b991ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1567275047905-85271aa79cb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
  "https://images.unsplash.com/photo-1567119715747-ff9c10f46115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
  "https://images.unsplash.com/photo-1567178313731-ddb016721292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1567197427669-a0d3603a3586?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1567067953023-85fa3c3e94dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1567178979268-6b5320a51c7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1602&q=80",
  "https://images.unsplash.com/photo-1567067163238-d6ed791e4cd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1567186381030-67ee94d4b6c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
];

images.map(image => {
  let img = element("img", image);
  let item = document.createElement("li");

  item.onclick = () => new Preview(img);

  item.appendChild(img);
  list.appendChild(item);
});

function Preview(img) {
  let image = document.createElement("img");
  image.src = img.src;
  image.style.width = `${image.naturalWidth}px`;
  image.style.height = `${image.naturalHeight}px`;

  preview.appendChild(image);

  let transition = new SharedTransition(img, image);

  const play = async () => {
    await transition.play();
    preview.classList.add("show");
    overlay.classList.add("background");
  };

  const close = async () => {
    overlay.classList.remove("background");
    await transition.reverse();
    preview.classList.remove("show");
    image.remove();
  };

  play();

  overlay.onclick = close;
}

function element(type, src) {
  let el = document.createElement(type);
  el.src = src;
  return el;
}

// SharedTransition.center(details);

let transition;
