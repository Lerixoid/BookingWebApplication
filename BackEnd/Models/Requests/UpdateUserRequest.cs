using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Webapi.Models.Requests
{
    public class UpdateUserRequest
    {
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? Birthdate { get; set; }
        public Picture? ProfilePicture { get; set; }
    }
}
