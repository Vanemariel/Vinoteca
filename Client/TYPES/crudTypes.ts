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
 * @property {string} numeroDeFactura
 * @property {number} idUsuario
 * @property {number} cantidad
 * @property {number} precio
 * @property {string} nombre
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
  nombre?: string | null;
  //Porque estos de abajo no van arriba??
  precioVenta: number;
  idProducto?: number | null;
  nombreProducto: string | null;
  stock: number
};
/** detalles type used in the CRUD operations.
 * @type {object}
 * @property {string} idVenta
 * @property {number} idUsuario
 * @property {number} idProducto
 * @property {string} nombre
 * @property {string} nombreProducto
 * @property {boolean} Efectivo
 * @property {boolean} Transferencia
 * @property {number} Cantidad
 * @property {number} Total
 * @property {number} IdDetalleVenta
 * @property {number} IdVenta
 * @property {string} numeroDeFactura
 */
export type DetalleVenta = {
  idVenta: number | null;
  cantidad?: number | null;
  total?: number | null;
  efectivo?: boolean;
  transferencia: boolean;
  numeroDeFactura: string;
  nombreUsuario?: string | null;
  idProducto?: number | null;
  fechaVenta: string;
  nombreCliente?: string | null;
  nombreProducto?: string | null;
 
};

/** detalles type used in the CRUD operations.
 * @type {object}
 * @property {number} idCompra
 * @property {number} idUsuario
 * @property {number} idProducto
 * @property {string} nombre
 * @property {string} nombreProducto
 * @property {boolean} efectivo
 * @property {boolean} transferencia
 * @property {number} cantidad
 * @property {number} total
 * @property {number} IdDetalleCompra
 * @property {number} IdCompra
 * @property {string} numeroDeFactura
 */
export type DetalleCompra = {
  idCompra?: number | null;
  cantidad?: number | null;
  total?: number | null;
  efectivo?: boolean;
  transferencia: boolean;
  numeroDeFactura: string;
  nombreUsuario?: string | null;
  idProducto?: number | null;
  fechaCompra: string;
  nombreProveedor?: string | null;
  nombreProducto: string | null;
};

  