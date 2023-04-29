

namespace Vinoteca.Shared.DTO.Auth
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public int AuthCode { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
