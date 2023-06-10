using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omnichannel.Contracts
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;
           
        public static class Producto
        {
            public const string New = Base + "/proveedor";
            public const string GetAll = Base + "/proveedor";            
            public const string GetById = Base + "/proveedor/{id}";
            public const string Delete = Base + "/proveedor/{id}";
            public const string Update = Base + "/proveedor";
           
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

    }
}
