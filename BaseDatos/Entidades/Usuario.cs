using System.ComponentModel.DataAnnotations;
using Vinoteca.BaseDatos.Comun;

namespace Vinoteca.BaseDatos.Entidades
{
    public class Usuario : BaseEntity
    {
        [Required(ErrorMessage = "Este campo es obligatorio")]        
        public string Email { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio")]
        public byte[] Password { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio")]
        public string Apellido { get; set; }



    }
}