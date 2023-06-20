using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vinoteca.Server.Contracts
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;
           
        public static class Producto
        {
            public const string New = Base + "/producto";
            public const string GetAll = Base + "/producto";            
            public const string GetById = Base + "/producto/{id}";
            public const string Delete = Base + "/producto/{id}";
            public const string Update = Base + "/producto";
           
        }
        public static class Proveedor
        {
            public const string New = Base + "/proveedor";
            public const string GetAll = Base + "/proveedor";
            public const string GetById = Base + "/proveedor/{id}";
            public const string Delete = Base + "/proveedor/{id}";
            public const string Update = Base + "/proveedor";

        }

        public static class Usuario
        {
            public const string New = Base + "/usuario";
            public const string GetAll = Base + "/usuario";
            public const string GetById = Base + "/usuario/{id}";
            public const string Delete = Base + "/usuario/{id}";
            public const string Update = Base + "/usuario";

        }

        public static class Cliente
        {
            public const string New = Base + "/cliente";
            public const string GetAll = Base + "/cliente";
            public const string GetById = Base + "/cliente/{id}";
            public const string Delete = Base + "/cliente/{id}";
            public const string Update = Base + "/cliente";

        }

        public static class Venta
        {
            public const string New = Base + "/venta";
            public const string GetAll = Base + "/venta";
            public const string GetById = Base + "/venta/{id}";
            public const string Delete = Base + "/venta/{id}";
            public const string Update = Base + "/venta";

        }

        public static class Compra
        {
            public const string New = Base + "/compra";
            public const string GetAll = Base + "/compra";
            public const string GetById = Base + "/compra/{id}";
            public const string Delete = Base + "/compra/{id}";
            public const string Update = Base + "/compra";
        }
        public static class Caja
        {
            public const string New = Base + "/caja";
            public const string GetAll = Base + "/caja";
            public const string GetById = Base + "/caja/{id}";
            public const string Delete = Base + "/caja/{id}";
            public const string Update = Base + "/caja";
        }

        public static class DetalleDeCaja
        {
            public const string New = Base + "/detalledecaja";
            public const string GetAll = Base + "/detalledecaja";
            public const string GetById = Base + "/detalledecaja/{id}";
            public const string Delete = Base + "/detalledecaja/{id}";
            public const string Update = Base + "/detalledecaja";
        }

        public static class DetalleDeVenta
        {
            public const string New = Base + "/detalledeventa";
            public const string GetAll = Base + "/detalledeventa";
            public const string GetById = Base + "/detalledeventa/{id}";
            public const string Delete = Base + "/detalledeventa/{id}";
            public const string Update = Base + "/detalledeventa";
        }

        public static class DetalleDeCompra
        {
            public const string New = Base + "/detalledecompra";
            public const string GetAll = Base + "/detalledecompra";
            public const string GetById = Base + "/detalledecompra/{id}";
            public const string Delete = Base + "/detalledecompra/{id}";
            public const string Update = Base + "/detalledecompra";
        }
    }
}
