// src/config.ts
const API_BASE_URL = 'https://orderlist.tokosale.com/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  ORDER_GET: `${API_BASE_URL}/orders`,
  ORDER_ADD: `${API_BASE_URL}/order`,
  ORDER_UPDATE_POSITION: `${API_BASE_URL}/orders_update_position`,
  ORDER_UPDATE: `${API_BASE_URL}/order_update`,
  ORDER_DELETE: `${API_BASE_URL}/delete_order`,
};