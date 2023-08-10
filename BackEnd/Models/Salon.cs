using Webapi.Helpers;

namespace Webapi.Models
{
    public class Salon
    {
        public enum SalonTypes : int
        {
            [StringValue(nameof(Other))]
            Other,
            [StringValue(nameof(Hotel))]
            Hotel,
            [StringValue(nameof(Restaurant))]
            Restaurant,
            [StringValue(nameof(Salon))]
            Salon,
            [StringValue(nameof(Hospital))]
            Hospital,
            [StringValue(nameof(Fitness))]
            Fitness,
            [StringValue(nameof(Lecture))]
            Lecture,
            [StringValue(nameof(Master))]
            Master,
            [StringValue(nameof(Tour))]
            Tour
        }

        public Salon()
        {
            AppointmentTypes = new List<AppointmentType>();
            Amentities = new List<Amentity>();
            OpenHours = new List<DayHours>();
            Portfolio = new List<Picture>();
            Reviews = new List<Review>();
        }

        public int SalonID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public string? WebsiteURL { get; set; }
        public string SalonType { get; set; }
        public Address Address { get; set; }
        public User Owner { get; set; }
        public virtual Picture? SalonPicture { get; set; }
        public virtual ICollection<Picture> Portfolio { get; set; }
        public virtual ICollection<AppointmentType> AppointmentTypes { get; set; }
        public virtual ICollection<Amentity> Amentities { get; set; }
        public virtual ICollection<DayHours> OpenHours { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
