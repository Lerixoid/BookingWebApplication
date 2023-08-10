using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Metadata;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class SalonEntityTypeConfiguration : IEntityTypeConfiguration<Salon>
    {
        public void Configure(EntityTypeBuilder<Salon> builder)
        {
            builder.HasKey(e => e.SalonID);
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.SalonType).IsRequired();
            builder.Property(e => e.Description).IsRequired();
            builder.Property(e => e.OwnerPhoneNumber).IsRequired();
            builder.Property(e => e.WebsiteURL);

            builder.HasOne(e => e.Address);
            builder.HasOne(e => e.Owner);
            builder.HasOne(e => e.SalonPicture);

            builder.HasMany(e => e.AppointmentTypes);
            builder.HasMany(e => e.Amentities);
            builder.HasMany(e => e.OpenHours);
            builder.HasMany(e => e.Portfolio);
            builder.HasMany(e => e.Reviews);
        }
    }
}