const cart = new Map();

const money = (amount) => `$${amount.toFixed(2)}`;

function renderCart() {
  const list = document.querySelector("#items");
  list.replaceChildren();

  let total = 0;
  let count = 0;

  for (const [id, item] of cart) {
    total += item.price * item.quantity;
    count += item.quantity;

    const row = document.createElement("li");
    row.className = "item";

    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = item.emoji;
    emoji.setAttribute("aria-hidden", "true");

    const details = document.createElement("div");
    const name = document.createElement("div");
    name.className = "item-name";
    name.textContent = item.name;

    const price = document.createElement("div");
    price.className = "item-price";
    price.textContent = `${money(item.price)} × ${item.quantity}`;
    details.append(name, price);

    const controls = document.createElement("div");
    controls.className = "qty";

    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.textContent = "−";
    decrease.setAttribute("aria-label", `Quitar una unidad de ${item.name}`);
    decrease.addEventListener("click", () => changeQuantity(id, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const increase = document.createElement("button");
    increase.type = "button";
    increase.textContent = "+";
    increase.setAttribute("aria-label", `Añadir una unidad de ${item.name}`);
    increase.addEventListener("click", () => changeQuantity(id, 1));

    controls.append(decrease, quantity, increase);
    row.append(emoji, details, controls);
    list.append(row);
  }

  document.querySelector("#count").textContent = count;
  document.querySelector("#total").textContent = money(total);
  document.querySelector("#empty").hidden = cart.size > 0;
  document.querySelector("#checkout").disabled = cart.size === 0;
}

function changeQuantity(id, change) {
  const item = cart.get(id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) cart.delete(id);
  renderCart();
}

document.querySelectorAll(".add").forEach((button) => {
  button.addEventListener("click", () => {
    const { id, name, price, emoji } = button.dataset;
    const item = cart.get(id);

    if (item) {
      item.quantity += 1;
    } else {
      cart.set(id, {
        name,
        price: Number(price),
        emoji,
        quantity: 1
      });
    }

    renderCart();
  });
});

document.querySelector("#checkout").addEventListener("click", () => {
  if (cart.size > 0) {
    alert("¡Gracias! El proceso de pago aún no está conectado.");
  }
});

renderCart();