using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class AppointmentTypeEntityTypeConfiguration : IEntityTypeConfiguration<AppointmentType>
    {
        public void Configure(EntityTypeBuilder<AppointmentType> builder)
        {
            builder.HasKey(e => e.AppointmentTypeID);
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.LengthMinutes).IsRequired();
            builder.Property(e => e.Price).IsRequired();

            builder.HasOne(e => e.Promotion);

            builder.HasMany(e => e.Appointments).WithOne(e => e.AppointmentType);
        }
    }
}