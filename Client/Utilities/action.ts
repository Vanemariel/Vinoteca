import config from "../config-api.json";

// All endpoints routes.

/**
 * Server dns.
 * @constant {string}
 */
export const base = config.url;

const api = config.apiVersion;



export const PRODUCTO_CONTROLLER = base + "Api/Producto/" + api + "producto";
/**
 * General use endpoints.
 * @constant {string}
 */

export const PROVEEDOR_CONTROLLER = base + "Api/Proveedor/" + api + "proveedor";
/**
 * General use endpoints.
 * @constant {string}
 */

export const VENTA_CONTROLLER = base + "Api/Venta/" + api + "venta";
/**
 * General use endpoints.
 * @constant {string}
 */

export const COMPRA_CONTROLLER = base + "Api/Compra/" + api + "compra/";

/**
 * HubConnection route used for SignalR connection.
 * @constant {string}
 */
export const DETLLEVENTA_CONTROLLER = base + "Api/DetalleDeVenta/" + "detalleventa/";

/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 *
 */

export const DETALLECOMPRA_CONTROLLER = base + "Api/DetalleDeCompra/" + api + "detallecompra";
/**
 * General use endpoints.
 * @constant {string}
 */


export const CAJA_CONTROLLER = base + "Api/Caja/" + api + "caja/";
/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 */


export const DETALLECAJA_CONTROLLER = base + "Api/DetalleDeCaja/" + api + "detallecaja/";
/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 */
