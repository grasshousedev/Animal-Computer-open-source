import { API_SERVER } from "./setting";

// const apiURL = "/api"
// export const endpoint = `${API_SERVER}${apiURL}`

export const endpoint = API_SERVER;

export const googleLogin = `/rest-auth/google/`;
export const addToCartURL = `/add-to-cart/`;
export const removeFromCartURL = (id) => `/remove-from-cart/${id}/delete/`;
export const orderSummaryURL = `/order-summary/`;
export const orderUserListURL = `/api/v1/user/orders/`;
export const addressURL = `/addresses/`;
export const addressCreateURL = `/addresses/create/`;
export const addressUpdateURL = (id) => `/addresses/${id}/update/`;
export const addressDeleteURL = (id) => `/addresses/${id}/delete/`;
export const userDetailsURL = `/user-details/`;
export const updateUserURL = (id) => `/update-user/${id}/`;
export const changePasswordURL = `/rest-auth/password/change/`;
export const resetPasswordURL = `/rest-auth/password/reset/`;
export const confirmResetURL = `/rest-auth/password/reset/confirm/`;
export const brandsURL = (product) => `/brands/${product}/`;
export const processorsURL = `/processors/`;
export const displaysURL = `/displays/`;
export const categoriesURL = `/categories/`;
export const earningsURL = (when) => `/earnings/${when}/`;
export const messageCreateURL = `/messages/create/`;
export const contentURL = (content) => `/content/${content}/`;
export const checkoutURL = `/checkout/`;
export const specificListURL = (label) => `/list/${label}/`;
export const productURL = (slug) => `/product/${slug}/`;
export const productsListURL = (product_type) => `/products/${product_type}/`;
export const quantityUpdateURL = `/order/quantity/`;
export const ratingsURL = `/ratings/`;
export const ratingCreateURL = `/ratings/create/`;
export const searchURL = `/products`;
export const filterURL = `/filter/products`;
// export const specialURL = `/special/products`;
export const specialURL = `/api/v1/special/products`;
export const countriesURL = `/countries/`;
export const headersURL = `/api/v1/auth/headers`;

// Admin specific
export const orderListURL = `/orders/`;
export const orderFilterURL = `/orders/filter`;
export const orderDetailURL = (id) => `/order/${id}/`;
export const orderUpdateURL = (id) => `/order/${id}/update/`;
export const shipmentDetailURL = `/shipment`;
export const shipmentCreateURL = `/shipment/create/`;
export const messagesURL = `/messages/`;
export const messageUpdateURL = (id) => `/messages/${id}/update/`;
export const messageUnreadURL = `/messages/unread/`;
export const notificationsURL = `/notifications/`;
export const notificationUpdateURL = (id) => `/notifications/${id}/update/`;
export const notificationUpdateAllURL = `/notifications/update/all`;
export const maintenanceUpdateURL = `/maintenance/1/update/`;
export const maintenanceURL = `/maintenance/`;
export const discountURL = `/discount/`;
