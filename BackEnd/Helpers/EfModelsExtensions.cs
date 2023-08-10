using Webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace Webapi.Helpers
{
    public static class EfModelsExtensions
    {
        public static IQueryable<Salon> IncludeAll(this IQueryable<Salon> query)
        {
            return query
                .Include(e => e.AppointmentTypes).ThenInclude(at => at.Promotion)
                .Include(e => e.AppointmentTypes).ThenInclude(at => at.Appointments)
                .Include(e => e.SalonPicture)
                .Include(e => e.Amentities).ThenInclude(a => a.Icon)
                .Include(e => e.OpenHours)
                .Include(e => e.Portfolio)
                .Include(e => e.Reviews).ThenInclude(r => r.User).ThenInclude(u => u.ProfilePicture)
                .Include(e => e.Address)
                .Include(e => e.Owner);
        } 
        
        public static IQueryable<Appointment> IncludeAll(this IQueryable<Appointment> query)
        {
            return query
                .Include(e => e.AppointmentType).ThenInclude(at => at.Promotion)
                .Include(e => e.User).ThenInclude(u => u.ProfilePicture);
        }         
        
        public static IQueryable<Review> IncludeAll(this IQueryable<Review> query)
        {
            return query
                .Include(e => e.User).ThenInclude(u => u.ProfilePicture);
        }  

        public static IQueryable<AppointmentType> IncludeAll(this IQueryable<AppointmentType> query)
        {
            return query
                .Include(e => e.Promotion)
                .Include(e => e.Appointments);
        }  

        public static IQueryable<User> IncludeAll(this IQueryable<User> query)
        {
            return query
                .Include(e => e.ProfilePicture)
                .Include(e => e.FavouriteSalons);
        }   
    }
}
