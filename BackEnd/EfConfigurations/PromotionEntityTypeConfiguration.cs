using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class PromotionEntityTypeConfiguration : IEntityTypeConfiguration<Promotion>
    {
        public void Configure(EntityTypeBuilder<Promotion> builder)
        {
            builder.HasKey(e => e.PromotionID);
            builder.Property(e => e.DiscountInPercent).IsRequired();
            builder.Property(e => e.DateFrom).IsRequired();
            builder.Property(e => e.DateTo).IsRequired();
        }
    }
}