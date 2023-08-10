using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Webapi.Models;

namespace Webapi.EfConfigurations
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(e => e.UserID);
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.PhoneNumber);
            builder.Property(e => e.Surname);
            builder.Property(e => e.Birthdate);

            builder.HasOne(e => e.UserCredentials);
            builder.HasOne(c => c.ProfilePicture);
        }
    }
}
