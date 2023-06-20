/** usuario type used in the CRUD operations.
 * @type {object}
 * @property {number} IdUsuario
 * @property {string} Nombre
 * @property {number} Apellido
 * @property {number} IdCompra
 */
export type Usuario = {
    IdUsuario: number;
    Nombre: string;
    Apellido: string;
    IdCompra: number
  };

  /** cliente type used in the CRUD operations.
 * @type {object}
 * @property {number} IdCliente
 * @property {string} Nombre
 * @property {string} Direccion
 * @property {number} Telefono
 */
export type Cliente = {
    IdCliente: number;
    Nombre: string;
    Direccion: string;
    Telefono: number;
  }
  
   /** producto type used in the CRUD operations.
 * @type {object}
 * @property {number} IdProducto
 * @property {string} NombreProducto
 * @property {number} Stock
 * @property {string} Detalle
 * @property {number} PrecioVenta
 * @property {number} PrecioCompra
 * @property {number} IdProveedor
 
 */
export type Producto = {
    IdProducto?: number;
    NombreProducto: string;
    Stock: number;
    Detalle: string;
    PrecioVenta: number;
    PrecioCompra: number;
    IdProveedor: number;
  };

   /** proveedor type used in the CRUD operations.
 * @type {object}
 * @property {number} IdProveedor
 * @property {string} Nombre
 * @property {string} Descripcion
 * @property {string} HorarioDesde
 * @property {string} HorarioHasta
 * @property {number} Telefono
 * @property {number} IdProveedor
 */
export type Proveedor = {
    IdProveedor: number;
    Nombre: string;
    Descripcion: string;
    HorarioDesde: string;
    HorarioHasta: string;
    Telefono: number;
    Idproducto: number;
  };

  /** compra type used in the CRUD operations.
 * @type {object}
 * @property {number} IdCompra
 * @property {Date} Fecha
 * @property {bolean} Formapago
 * @property {number} Total
 * @property {number} NumerodeFactura
 * @property {number} IdUsuario
 * @property {number} IdProveedor
 */
export type Compra = {
    IdCompra: number;
    Fecha: Date;
    FormaPago: boolean;
    Total: number;
    NumerodeFactora: number;
    IdUsuario: number;
    IdProveedor: number;
  };

   /** venta type used in the CRUD operations.
 * @type {object}
 * @property {number} IdVenta
 * @property {Date} FechaVenta
 * @property {string} FormaPago
 * @property {number} Total
 * @property {string} IdUsuario
 * @property {string} IdCliente
 */
export type Venta = {
    IdVenta: number;
    FechaVenta: Date;
    FormaPago: string;
    Total: number;
    IdUsuario: string;
    IdCliente: number;
  };