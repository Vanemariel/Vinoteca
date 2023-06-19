import config from "../config-api.json";

// All endpoints routes.

/**
 * Server dns.
 * @constant {string}
 */
export const base = config.url;

const api = config.apiVersion;



export const PRODUCTO_CONTROLLER = base + api + "producto";
/**
 * General use endpoints.
 * @constant {string}
 */

export const PROVEEDORES_CONTROLLER = base + api + "proveedor";
/**
 * General use endpoints.
 * @constant {string}
 */

export const VENTA_CONTRLLER = base + api + "venta";
/**
 * General use endpoints.
 * @constant {string}
 */

export const COMPRA_CONTROLLER = base + api + "compra/";

/**
 * HubConnection route used for SignalR connection.
 * @constant {string}
 */
export const DETLLEVENTA_CONTROLLER = base + "detalleventa/";

/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 *
 */

export const DETALLECOMPRA_CONTROLLER = base + api + "detallecompra";
/**
 * General use endpoints.
 * @constant {string}
 */


export const CAJA_CONTROLLER = base + api + "caja/";
/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 */


export const DETALLECAJA_CONTROLLER = base + api + "detallecaja/";
/**
 * File handling routes for getting and sending files (not in use).
 * @constant {string}
 */
