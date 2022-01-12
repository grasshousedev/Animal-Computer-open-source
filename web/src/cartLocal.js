let cart = [];

const loadCart = () => {
  const cartJSON = localStorage.getItem("cart");
  try {
    return cartJSON !== null ? JSON.parse(cartJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => {
  return loadCart();
};

const createCartItem = (product, option) => {
  const cartIndex = cart.findIndex((cartItem) => {
    return cartItem.id === product._id;
  });
  if (cartIndex === -1) {
    cart.push({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.imageURL1,
      slug: product._id,
      quantity: 1,
      authorId: product.authorId,
    });
  } else {
    cart[cartIndex].quantity += 1;
  }
  saveCart();
};

const updateQuantity = (slug, quantity, config) => {
  const cartIndex = cart.findIndex((cartItem) => {
    if (config) {
      return cartItem.slug === slug && cartItem.config.id === parseInt(config);
    } else {
      return cartItem.slug === slug;
    }
  });
  if (cartIndex > -1) {
    cart[cartIndex].quantity = parseInt(quantity);
    saveCart();
  }
};

const removeCartItem = (id, option) => {
  const cartIndex = cart.findIndex((cartItem) => {
    if (option) {
      return cartItem.id === id && cartItem.config.id === parseInt(option);
    } else {
      return cartItem.id === id;
    }
  });
  if (cartIndex > -1) {
    cart.splice(cartIndex, 1);
    saveCart();
  }
};

const emptyCart = () => {
  localStorage.setItem("cart", []);
};

cart = loadCart();

export { getCart, createCartItem, removeCartItem, emptyCart, updateQuantity };
