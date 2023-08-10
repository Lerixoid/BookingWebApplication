using Microsoft.EntityFrameworkCore;
using Webapi.Models;

namespace Webapi.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<AppointmentType> AppointmentTypes { get; set; }
        public DbSet<UserCredentials> UserCredentials { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Amentity> Amentities { get; set; }
        public DbSet<DayHours> DayHours { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Salon> Salons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<ApplicationForm> ApplicationForms { get; set; }
        public DbSet<ContactForm> ContactForms { get; set; }
        public DbSet<UserFavouriteSalon> UserFavouriteSalons { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
    }
}
