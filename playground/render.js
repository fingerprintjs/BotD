export function createElement(tag, text) {
  let el = document.createElement(tag);
  el.textContent = text;
  document.body.appendChild(el);
}

export function createColoredElement(tag, text, color) {
  let el = document.createElement(tag);
  el.textContent = text;
  el.style.color = color;
  document.body.appendChild(el);
}

export function createNamedElement(tag, id, text) {
  let el = document.createElement(tag);
  el.id = id
  el.textContent = text;
  document.body.appendChild(el);
}

export function updateNamedElement(id, text, color) {
  let el = document.getElementById(id)
  el.textContent = text
  if(color !== undefined)
    el.style.color = color;
}

export function updateNamedElementBool(id, text, value) {
  let el = document.getElementById(id)
  el.textContent = `${text} ${value}`
  if(typeof value === "boolean")
    if(value)
      el.style.color = "green";
    else
      el.style.color = "red";
}

export function removeNamedElement(id) {
  let el = document.getElementById(id)
  el.remove()
}

export function createLink(href, text) {
  let a = document.createElement("a");
  a.textContent = text;
  a.href = href;
  document.body.appendChild(a);
}