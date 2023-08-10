using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Metadata;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class PictureEntityTypeConfiguration : IEntityTypeConfiguration<Picture>
    {
        public void Configure(EntityTypeBuilder<Picture> builder)
        {
            builder.HasKey(e => e.PictureID);
            builder.Property(e => e.Bytes).IsRequired();
        }
    }
}
