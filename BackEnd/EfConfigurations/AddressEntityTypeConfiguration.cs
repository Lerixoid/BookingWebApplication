using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Metadata;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class AddressEntityTypeConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasKey(e => e.AddressID);
            builder.Property(e => e.City).IsRequired();
            builder.Property(e => e.Street).IsRequired();
            builder.Property(e => e.HouseNumber).IsRequired();
            builder.Property(e => e.FlatNumber);
            builder.Property(e => e.PostalCode).IsRequired();
        }
    }
}