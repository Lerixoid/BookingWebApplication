using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class DayHoursEntityTypeConfiguration : IEntityTypeConfiguration<DayHours>
    {
        public void Configure(EntityTypeBuilder<DayHours> builder)
        {
            builder.HasKey(e => e.DayHoursID);
            builder.Property(e => e.DayName).IsRequired();
            builder.Property(e => e.OpenTime).IsRequired();
            builder.Property(e => e.CloseTime).IsRequired();
        }
    }
}
