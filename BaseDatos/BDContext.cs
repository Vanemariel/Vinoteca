using Microsoft.EntityFrameworkCore;
using Vinoteca.BaseDatos.Entidades;

namespace Vinoteca.BaseDatos
{
    public class BDContext : DbContext
    {
        public BDContext(DbContextOptions<BDContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        public DbSet<Usuario> TablaUsuarios { get; set; }
    }

}
