export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const BASE_URL = 'http://localhost:5001';

export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;

export default BASE_URL;
