namespace Webapi.Models.DTO
{
    public class UserDto
    {
        public UserDto(User user)
        {
            UserID = user.UserID;
            Name = user.Name;
            Surname = user.Surname;
            PhoneNumber = user.PhoneNumber;
            TotalSpent = user.TotalSpent;
            Birthdate = user.Birthdate;
            ProfilePicture = user.ProfilePicture;
            FavouriteSalons = new List<SalonDto>();
            OwnedSalons = new List<SalonDto>();
        }

        public int UserID { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal TotalSpent { get; set; }
        public DateTime? Birthdate { get; set; }
        public virtual Picture? ProfilePicture { get; set; }
        public virtual ICollection<SalonDto> FavouriteSalons { get; set; }
        public virtual ICollection<SalonDto> OwnedSalons { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }

    }
}
