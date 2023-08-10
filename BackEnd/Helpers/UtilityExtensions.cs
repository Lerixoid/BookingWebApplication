using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using Webapi.Models;

namespace Webapi.Helpers
{
    public static class UtilityExtensions
    {
        public static readonly string[] daysOfWeekNames = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
        private const int ITERATIONS_COUNT = 5000;
        private const int KEY_BYTES_COUNT = 20;

        public static string StringValue(this Enum enumValue)
        {
            var type = enumValue.GetType();

            FieldInfo fieldInfo = type.GetField(enumValue.ToString());

            var stringValueAttribute = fieldInfo.GetCustomAttribute<StringValueAttribute>();
            return stringValueAttribute?.StringValue;
        }

        public static bool IsDayOfWeek(this string stringValue)
        {
            return daysOfWeekNames.Contains(stringValue);
        }

        public static byte[] Encrypt(this string @string, byte[] salt)
        {
            var encryptedString = new Rfc2898DeriveBytes(@string, salt, ITERATIONS_COUNT);
            return encryptedString.GetBytes(KEY_BYTES_COUNT);
        }

        public static byte[] RenewRefreshToken(this User user, int lifeTimeDays)
        {
            var refreshToken = Guid.NewGuid().ToByteArray();
            user.UserCredentials.RefreshToken = refreshToken;
            user.UserCredentials.RefreshTokenExpirationDate = DateTime.Now.AddDays(lifeTimeDays);
            return refreshToken;
        }

        public static SigningCredentials ToSigningCredentials(this string @string)
        {
            SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(@string));
            return new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        }

        public static IApplicationBuilder UseExceptionLoggerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionLoggerMiddleware>();
        }
    }
}
