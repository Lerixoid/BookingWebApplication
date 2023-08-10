namespace Webapi.Models
{
    public class User
    {
        public User()
        {
            FavouriteSalons = new List<UserFavouriteSalon>();
        }

        public int UserID { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal TotalSpent { get; set; }
        public DateTime? Birthdate { get; set; }
        public UserCredentials UserCredentials { get; set; }
        public virtual Picture? ProfilePicture { get; set; }
        public virtual ICollection<UserFavouriteSalon> FavouriteSalons { get; set; }
    }
}
