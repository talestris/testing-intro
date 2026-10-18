function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }

  const newCart = [...cart];
  const existingItem = newCart.find((item) => item.id === product.id);
  const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
  const totalRequestedQuantity = currentQuantityInCart + quantity;

  if (totalRequestedQuantity > product.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }

  if (existingItem) {
    existingItem.quantity = totalRequestedQuantity;
  } else {
    newCart.push({ ...product, quantity });
  }
  return newCart;
}
function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }

  const newCart = cart.map((item) => ({ ...item }));
  const existingItem = newCart.find((item) => item.id === productId);

  if (!existingItem) {
    return cart;
  }

  if (newQuantity > existingItem.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }

  existingItem.quantity = newQuantity;
  return newCart;
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal() {}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
