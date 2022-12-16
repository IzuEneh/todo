import "./style.css";

const body = document.querySelector("body");
const content = document.createElement("div");
content.classList.add("content");

const sideBar = document.createElement("div");
sideBar.classList.add("side-bar");

const main = document.createElement("div");
main.classList.add("main");

content.appendChild(sideBar);
content.appendChild(main);
body.appendChild(content);
