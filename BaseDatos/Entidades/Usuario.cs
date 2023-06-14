using BaseDatos.Entidades;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Vinoteca.BaseDatos;

namespace Vinoteca.BaseDatos.Entidades
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "Este campo es obligatorio")]
        public string Apellido { get; set; }

        [InverseProperty("Usuario")]
        public List<Compra> Compras { get; set; }
    }
}