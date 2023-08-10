using Webapi.Helpers;

namespace Webapi.Models
{
    public class UserCredentials
    {
        public enum UserRoles : int
        {
            [StringValue(nameof(Admin))]
            Admin,
            [StringValue(nameof(User))]
            User,
            [StringValue(nameof(Owner))]
            Owner
        }

        public int UserCredentialsID { get; set; }
        public string Login { get; set; }
        public byte[] PasswordHashed { get; set; }
        public string UserRole { get; set; }
        public byte[] Salt { get; set; }
        public byte[] RefreshToken { get; set; }
        public DateTime RefreshTokenExpirationDate { get; set; }
    }
}
