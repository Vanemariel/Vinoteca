/** usuario type used in the CRUD operations.
 * @type {object}
 * @property {number} idusuario
 * @property {string} nombre
 * @property {number} apellido
 * @property {number} idcompra
 */
export type Usuario = {
    idusuario: number;
    nombre: string;
    apellido: string;
    idcompra: number
  };

  /** cliente type used in the CRUD operations.
 * @type {object}
 * @property {number} idcliente
 * @property {string} nombre
 * @property {string} direccion
 * @property {number} telefono
 */
export type Cliente = {
    idcliente: number;
    nombre: string;
    direccion: string;
    telefono: number;
  }
  
   /** producto type used in the CRUD operations.
 * @type {object}
 * @property {number} idproducto
 * @property {string} nombreproducto
 * @property {number} stock
 * @property {string} detalle
 * @property {number} precioventa
 * @property {number} preciocompra
 * @property {number} idproveedor
 
 */
export type Producto = {
    idproducto?: number;
    nombreproducto: string;
    stock: number;
    detalle: string;
    precioventa: number;
    preciocompra: number;
    idproveedor: number;
  };

   /** proveedor type used in the CRUD operations.
 * @type {object}
 * @property {number} idproveedor
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} horariodesde
 * @property {string} horariohasta
 * @property {number} telefono
 * @property {number} idproveedor
 */
export type Proveedor = {
    idproveedor: number;
    nombre: string;
    descripcion: string;
    horariodesde: string;
    horariohasta: string;
    telefono: number;
    idproducto: number;
  };

  /** compra type used in the CRUD operations.
 * @type {object}
 * @property {number} idcompra
 * @property {Date} fecha
 * @property {bolean} formapago
 * @property {number} total
 * @property {number} numerodefactura
 * @property {number} idusuario
 * @property {number} idproveedor
 */
export type Compra = {
    idcompra: number;
    fecha: Date;
    formapago: boolean;
    total: number;
    numerodefactora: number;
    idusuario: number;
    idproveedor: number;
  };

   /** venta type used in the CRUD operations.
 * @type {object}
 * @property {number} idventa
 * @property {Date} fechaventa
 * @property {string} formapago
 * @property {number} total
 * @property {string} idusuario
 * @property {string} idcliente
 */
export type Venta = {
    idventa: number;
    fechaventa: Date;
    formapago: string;
    total: number;
    idusuario: string;
    idcliente: number;
  };