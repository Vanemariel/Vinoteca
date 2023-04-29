using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace Vinoteca.BaseDatos.Comun
{
    [Index(nameof(Id), Name = "Entity_Id", IsUnique = true)]
    public class BaseEntity
    {
        [Key]  /// Definimos explicitamente que es la clave primaria
        [Required(ErrorMessage = "El Id es obligatorio.")]
        public int Id { get; set; }
    }
}
