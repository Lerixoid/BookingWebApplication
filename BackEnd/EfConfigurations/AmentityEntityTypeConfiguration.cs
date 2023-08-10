using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Metadata;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class AmentityEntityTypeConfiguration : IEntityTypeConfiguration<Amentity>
    {
        public void Configure(EntityTypeBuilder<Amentity> builder)
        {
            builder.HasKey(e => e.AmentityID);
            builder.Property(e => e.Name).IsRequired();
        }
    }
}
