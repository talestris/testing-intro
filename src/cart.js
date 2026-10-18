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
function calculateCartSubtotal(cart) {
  const result = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return result;
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  let delivery = 0;
  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
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
