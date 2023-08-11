/** usuario type used in the CRUD operations.
 * @type {object}
 * @property {number} idUsuario
 * @property {string} nombre
 * @property {number} apellido
 * @property {number} idCompra
 */
export type Usuario = {
    idUsuario?: number;
    nombre: string;
    apellido: string;
    idCompra: number
  };

  /** cliente type used in the CRUD operations.
 * @type {object}
 * @property {number} idCliente
 * @property {string} nombre
 * @property {string} direccion
 * @property {number} telefono
 */
export type Cliente = {
    idCliente?: number;
    nombre: string;
    direccion: string;
    telefono: number;
  }
  
   /** producto type used in the CRUD operations.
 * @type {object}
 * @property {number} idProducto
 * @property {string} nombreProducto
 * @property {number} stock
 * @property {string} detalle
 * @property {number} precioVenta
 * @property {number} precioCompra
 * @property {number} idProveedor
 
 */
export type Producto = {
    idProducto?: number | null;
    nombreProducto: string;
    stock: number ;
    detalle: string;
    precioVenta: number | null;
    precioCompra: number | null;
    idProveedor: number | null;
  };

   /** proveedor type used in the CRUD operations.
 * @type {object}
 * @property {number} idProveedor
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} horarioDesde
 * @property {string} horarioHasta
 * @property {number} telefono
 * @property {number} idProducto
 */
export type Proveedor = {
    idProveedor?: number | null;
    nombre: string;
    descripcion: string;
    horarioDesde: string | null;
    horarioHasta: string | null;
    telefono: number | null;
    idProducto: number | null;
  };

  /** compra type used in the CRUD operations.
 * @type {object}
 * @property {number} idCompra
 * @property {Date} fecha
 * @property {bolean} formapago
 * @property {number} total
 * @property {number} numerodeFactura
 * @property {number} idUsuario
 * @property {number} idProveedor
 * @property {number} cantidad
 * @property {number} precio
 * @property {number} idProducto
 */
export type Compra = {
  idCompra?: number | null;
  fechaCompra: string | null;
  efectivo: boolean;
  transferencia: boolean;
  total: number ;
  numeroDeFactura: string;
  idUsuario?: number | null;
  cantidad: number;
  precio: number ;
  precioCompra: number;
  idProducto?: number | null;
  idProveedor?: number | null;
  nombreProducto: string | null;
  stock: number
  };

   /** venta type used in the CRUD operations.
 * @type {object}
 * @property {number} idVenta
 * @property {string} fechaVenta
 * @property {boolean} efectivo
 * @property {boolean} transferencia
 * @property {number} total
 * @property {number} idUsuario
 * @property {string} nombre
 * @property {number} cantidad
 * @property {number} precio
 * @property {string} numeroDeFactura
 */
export type Venta = {
  idVenta?: number | null;
  fechaVenta: string | null;
  efectivo: boolean;
  transferencia: boolean;
  total: number ;
  numeroDeFactura: string;
  idUsuario?: number | null;
  cantidad: number;
  precio: number ;
  precioVenta: number;
  idProducto?: number | null;
  nombre?: string | null;
  nombreProducto: string | null;
  stock: number
};
/** detalles type used in the CRUD operations.
 * @type {object}
 * @property {number} idDetalleVenta
 * @property {number} idVenta
 * @property {number} cantidad
 * @property {number} total
 * @property {boolean} efectivo
 * @property {boolean} transferencia
 * @property {string} numeroDeFactura
 * @property {number} idUsuario
 * @property {number} idProducto
 * @property {string} nombre
 * @property {string} nombreProducto
 */
export type DetalleVenta = {
  idDetalleVenta?: number | null;
  idVenta?: number | null;
  cantidad?: number | null;
  total?: number | null;
  efectivo: boolean;
  transferencia: boolean;
  numeroDeFactura: string;
  idUsuario?: number | null;
  idProducto?: number | null;
  nombre?: string | null;
  nombreProducto: string | null;
};

/** detalles type used in the CRUD operations.
 * @type {object}
 * @property {number} idDetalleCompra
 * @property {number} idCompra
 * @property {number} cantidad
 * @property {number} total
 * @property {boolean} efectivo
 * @property {boolean} transferencia
 * @property {string} numeroDeFactura
 * @property {number} idUsuario
 * @property {number} idProducto
 * @property {number} idProveedor
 * @property {string} nombre
 * @property {number} precio
 */
export type DetalleCompra = {
  idVenta?: number | null;
  fechaVenta: string | null;
  efectivo: boolean;
  transferencia: boolean;
  total: number ;
  numeroDeFactura: string;
  idUsuario?: number | null;
  cantidad: number;
  precio: number ;
  precioVenta: number;
  idProducto?: number | null;
  nombre?: string | null;
  nombreProducto: string | null;
  stock: number
};

  