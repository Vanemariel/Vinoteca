using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Omnichannel.Contracts;
using Vinoteca.BaseDatos;
using Vinoteca.BaseDatos.Entidades;
using Vinoteca.Shared.DTO.Auth;

namespace Vinoteca1.Server.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly BDContext _context;
        private readonly IConfiguration _configuration;


        public UsuarioController(BDContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }


        [HttpGet(ApiRoutes.Usuario.GetAll)]
        public async Task<ActionResult<List<Usuario>>> GetAll()
        {
            try
            {
                List<Usuario> Usuarios = await this._context.TablaUsuarios.ToListAsync();

                return Ok(Usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }


        [HttpGet(ApiRoutes.Usuario.GetById)]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            try
            {
                Usuario? Usuario = await this._context.TablaUsuarios
                    .Where(Usuario => Usuario.IdUsuario == id)
                    .FirstOrDefaultAsync();

                if (Usuario == null)
                {
                    throw new Exception($"no existe el Usuario con id igual a {id}.");
                }

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ha ocurrido un error, {ex.Message}");
            }
        }

        [HttpPost(ApiRoutes.Producto.New)]
        public async Task<ActionResult<int>> New(Usuario usuario)
        {
            try
            {

                _context.TablaUsuarios.Add(usuario);
                await _context.SaveChangesAsync();
                return usuario.IdUsuario;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut(ApiRoutes.Usuario.Update)]
        public async Task<ActionResult<string>> Update(int id, [FromBody] Usuario NewUsuario)
        {
            string ResponseDto = "";
            try
            {
                Usuario? FindUsuario = await this._context.TablaUsuarios
                    .Where(Usuario => Usuario.IdUsuario == id)
                    .FirstOrDefaultAsync();

                if (FindUsuario == null)
                {
                    throw new Exception("No existe el Usuario a modificar.");
                }

                FindUsuario.Nombre = NewUsuario.Nombre;
                FindUsuario.Apellido = NewUsuario.Apellido;


                this._context.TablaUsuarios.Update(FindUsuario);

                await this._context.SaveChangesAsync();


                ResponseDto = "Los datos han sido actualizados correctamente.";
                return Ok(ResponseDto);
            }
            catch (Exception ex)
            {
                ResponseDto = $"Ha ocurrido un error, {ex.Message}";
                return BadRequest(ResponseDto);
            }
        }


        [HttpDelete(ApiRoutes.Usuario.Delete)]
        public async Task<ActionResult<string>> Delete(int id)
        {
            string ResponseDto = "";

            try
            {
                if (id <= 0)
                {
                    throw new Exception("El Id ingresado no es valido.");
                }

                Usuario? FindUsuario = await this._context.TablaUsuarios
                    .Where(x => x.IdUsuario == id)
                    .FirstOrDefaultAsync();

                if (FindUsuario == null)
                {
                    throw new Exception($"No existe el Usuario con id igual a {id}.");
                }

                this._context.TablaUsuarios.Remove(FindUsuario);
                await this._context.SaveChangesAsync();

                ResponseDto = $"El Usuario {FindUsuario.Nombre} {FindUsuario.Apellido} ha sido borrado."; ///Falta Apellido :D
                return Ok(ResponseDto);
            }
            catch (Exception ex)
            {
                ResponseDto = $"Ha ocurrido un error, {ex.Message}";
                return BadRequest(ResponseDto);
            }
        }

        #region comentado
        ///////////////

        //[HttpPost("Create")]
        //public async Task<ActionResult<string>> Register(RegisterData newUsuario)
        //{
        //    try
        //    {
        //        if (newUsuario.Email == null || newUsuario.Email == string.Empty)
        //        {
        //            throw new Exception("Email requerido");
        //        }

        //        if (newUsuario.Nombre == null || newUsuario.Nombre == string.Empty)
        //        {
        //            throw new Exception("Nombre de usuario requerido");
        //        }

        //        if (newUsuario.Password == null || newUsuario.Password == string.Empty)
        //        {
        //            throw new Exception("Contraseña requerida");
        //        }

        //        Usuario? UserBD = await this._context.TablaUsuarios.FirstOrDefaultAsync(
        //            Usuario => Usuario.Email == newUsuario.Email
        //        );

        //        if (UserBD != null)
        //        {
        //            throw new Exception("Ya existe un usuario con este email. Intentelo nuevamente.");
        //        }

        //        var (passwordHash, passwordSalt) = CreatePasswordHash(newUsuario.Password);

        //        this._context.TablaUsuarios.Add(new Usuario
        //        {
        //            Email = newUsuario.Email,
        //            Nombre = newUsuario.Nombre,
        //            Apellido = newUsuario.Apellido,
        //            Password = passwordHash,
        //            PasswordSalt = passwordSalt
        //        });

        //        await this._context.SaveChangesAsync();

        //        return Ok("!Se ha registrado correctamente! Ahora inicie sesión!.");

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        //[HttpPost("Login")]
        //public async Task<ActionResult<LoginResponse>> Login(LoginData usuarioData)
        //{

        //    try
        //    {
        //        if (usuarioData.Email == null || usuarioData.Email == string.Empty)
        //        {
        //            throw new Exception("Email incorrecto");
        //        }

        //        if (usuarioData.Password == null || usuarioData.Password == string.Empty)
        //        {
        //            throw new Exception("Contraseña incorrecta");
        //        }

        //        Usuario? UserBD = await this._context.TablaUsuarios.FirstOrDefaultAsync(Usuario => Usuario.Email == usuarioData.Email);

        //        if (UserBD == null)
        //        {
        //            throw new Exception("Email ingresado es incorrecto");
        //        }

        //        if (!this.VerifyPasswordHash(usuarioData.Password, UserBD.Password, UserBD.PasswordSalt))
        //        {
        //            throw new Exception("Contraseña incorrecta");
        //        }

        //        LoginResponse ResponseDto = new LoginResponse
        //        {
        //            Email = UserBD.Email,
        //            Id = UserBD.Id,
        //            Nombre = UserBD.Nombre,
        //            Apellido = UserBD.Apellido,
        //            AuthCode = 200,
        //            Token = CreateToken(UserBD),
        //        };

        //        return Ok(ResponseDto);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}





        //#region Metodos complementarios

        //private (byte[], byte[]) CreatePasswordHash(string password)
        //{
        //    byte[] passwordHash;
        //    byte[] passwordSalt;

        //    using (var hmac = new HMACSHA512()) //Algoritmo de firma 
        //    {
        //        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //        passwordSalt = hmac.Key;
        //    }

        //    return (passwordHash, passwordSalt);
        //}

        //private string CreateToken(Usuario user)
        //{
        //    //Permisos para describir la informacion del usuario
        //    List<Claim> claims = new List<Claim>
        //    {
        //       new Claim(ClaimTypes.Email, user.Email) //Permiso de seguridad
        //    };

        //    //Clave simetrica
        //    var key = new SymmetricSecurityKey(
        //        System.Text.Encoding.UTF8.GetBytes(
        //         this._configuration.GetSection("AppSettings:Token").Value // Obtenemos dato de appSettings para crear Token
        //        )
        //    );


        //    //Definimos la configuracion del token 
        //    var Credencial = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);//Credenciales de firma 

        //    //Defino la carga del token 
        //    JwtSecurityToken token = new JwtSecurityToken(
        //       claims: claims,
        //       expires: DateTime.Now.AddHours(2),
        //       signingCredentials: Credencial
        //    );

        //    //Defino la cadena de token que quiero que retorne 
        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        //    return jwt;
        //}

        //private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        //{
        //    using (var hmac = new HMACSHA512(passwordSalt))
        //    {
        //        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //        return computedHash.SequenceEqual(passwordHash);
        //    }
        //}

        //#endregion
        #endregion
    }

}