using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Metadata;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class AppointmentEntityTypeConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasKey(e => e.AppointmentID);
            builder.Property(e => e.DateFrom).IsRequired();;
            builder.Property(e => e.IsConfirmed).IsRequired();
            builder.Property(e => e.IsCanceled).IsRequired();
            builder.Property(e => e.CalendarAppointmentURL).IsRequired();

            builder.HasOne(e => e.AppointmentType);
            builder.HasOne(e => e.User);
        }
    }
}