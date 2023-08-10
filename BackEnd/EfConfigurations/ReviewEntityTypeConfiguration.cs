using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder.HasKey(e => e.ReviewID);

            builder.Property(e => e.Rating).IsRequired();
            builder.Property(e => e.Comment).IsRequired();
            builder.Property(e => e.PostedTimestamp).IsRequired();

            builder.HasOne(e => e.User);
        }
    }
}