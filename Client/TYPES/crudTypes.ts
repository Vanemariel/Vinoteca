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
    stock: number | null;
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
 * @property {string} fecha
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
    fecha: string;
    formaPago: boolean;
    total: number ;
    //numerodeFactura: number;
    idUsuario: number | null;
    idProveedor?: number | null;
    cantidad: number ;
    precio: number ;
    idProducto: number | null;
  };

   /** venta type used in the CRUD operations.
 * @type {object}
 * @property {number} idVenta
 * @property {Date} fechaVenta
 * @property {boolean} formaPago
 * @property {number} total
 * @property {number} idUsuario
 * @property {number} idCliente
 * @property {number} cantidad
 * @property {number} precio
 */
export type Venta = {
  idVenta?: number | null;
  fechaVenta: string;
  formaPago: boolean;
  total: number ;
  //numerodeFactura: number;
  idUsuario?: number | null;
  cantidad: number;
  precio: number ;
  idProducto?: number | null;
  idCliente?: number | null;
  };

  