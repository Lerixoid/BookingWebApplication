using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Webapi.Contexts;
using Webapi.Exceptions;
using Webapi.Helpers;
using Webapi.Models;
using Webapi.Models.DTO;
using Webapi.Models.Requests;
using static Webapi.Models.UserCredentials;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private const int ACCESS_TOKEN_LIFETIME = 20; //minutes
        private const int REFRESH_TOKEN_LIFETIME = 1; //days
        private const int SALT_LENGTH = 32; //bytes
        
        private static readonly byte[] DefaultImageBytes = Convert.FromBase64String(@"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");

        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _config;

        public AccountsController(ApplicationDbContext context, IConfiguration config)
        {
            _dbContext = context;
            _config = config;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _dbContext.Users.IncludeAll().ToListAsync();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDto>> GetUser(int userId)
        {
            var user = await _dbContext.Users.IncludeAll().FirstOrDefaultAsync(e => e.UserID == userId);
            if (user == null)
            {
                return NotFound();
            }

            var ownedSalons = _dbContext.Salons.Where(e => e.Owner.UserID == user.UserID).Select(e => new SalonDto(e)).ToList();
            var appointments = _dbContext.Appointments.Include(e => e.User).Include(e => e.AppointmentType).Where(e => e.User.UserID == userId).ToList();
            var totalSpent = appointments.Sum(e => e.AppointmentType.Price);

            var userDto = new UserDto(user);
            userDto.OwnedSalons = ownedSalons;
            userDto.Appointments = appointments;
            userDto.TotalSpent = totalSpent;

            return userDto;
        }

        [HttpGet("{userId}/appointments/")]
        public async Task<ActionResult<List<Appointment>>> GetUserAppointments(int userId)
        {
            var user = await _dbContext.Users.IncludeAll().FirstOrDefaultAsync(e => e.UserID == userId);
            if (user == null)
            {
                return NotFound();
            }

            var appointments = await _dbContext.Appointments.Where(e => e.User.UserID == userId).Include(e => e.AppointmentType).ToListAsync();

            return appointments;
        }
        [HttpGet("{userId}/favourites")]
        public async Task<ActionResult> GetUserFavouriteSalons(int userId)
        {
            var user = await _dbContext.Users.Include(e => e.FavouriteSalons).FirstOrDefaultAsync(e => e.UserID == userId);
            if (user == null)
            {
                return NotFound();
            }

            var salons = _dbContext.Salons.Where(e => user.FavouriteSalons.Select(e => e.SalonID).Contains(e.SalonID)).Select(e => new {
                e.SalonID,
                e.Name,
                e.Description,
                e.OwnerPhoneNumber,
                e.Amentities,
                e.AppointmentTypes,
                e.OpenHours,
                e.Owner,
                e.Reviews,
                e.WebsiteURL,
                e.SalonType,
                e.Address,
                e.SalonPicture
            });

            return Ok(salons);
        }

        [HttpPost("favourites/{userId}/{salonId}")]
        public async Task<ActionResult<User>> FavouritesAddSalon(int userId, int salonId)
        {
            var user = await _dbContext.Users.IncludeAll().FirstOrDefaultAsync(e => e.UserID == userId);
            if (user == null)
            {
                return NotFound($"User id {userId} could not be found");
            }

            var salon = await _dbContext.Salons.FirstOrDefaultAsync(e => e.SalonID == salonId);
            if (salon == null)
            {
                return NotFound($"Salon id {salonId} could not be found");
            }

            if(user.FavouriteSalons.Select(e => e.SalonID).Contains(salonId))
            {
                return StatusCode(409, "Such salon has already been added to favourites");
            }

            var favouriteSalon = new UserFavouriteSalon()
            {
                SalonID = salonId
            };

            user.FavouriteSalons.Add(favouriteSalon);

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
        
        [HttpDelete("favourites/{userId}/{salonId}")]
        public async Task<ActionResult<User>> FavouritesDeleteSalon(int userId, int salonId)
        {
            var user = await _dbContext.Users.IncludeAll().FirstOrDefaultAsync(e => e.UserID == userId);
            if (user == null)
            {
                return NotFound($"User id {userId} could not be found");
            }

            var salon = await _dbContext.Salons.FirstOrDefaultAsync(e => e.SalonID == salonId);
            if (salon == null)
            {
                return NotFound($"Salon id {salonId} could not be found");
            }

            if(!user.FavouriteSalons.Select(e => e.SalonID).Contains(salonId))
            {
                return NotFound("User does not have such a salon on the favorites list");
            }

            var favouriteSalon = user.FavouriteSalons.FirstOrDefault(e => e.SalonID == salonId);
            user.FavouriteSalons.Remove(favouriteSalon);

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            User user = _dbContext.Users.Include(e => e.UserCredentials).Where(user => user.UserCredentials.Login == loginRequest.Login).FirstOrDefault();

            if (user == default) return StatusCode(401, "No such user was found");
            if (!user.UserCredentials.PasswordHashed.SequenceEqual(loginRequest.Password.Encrypt(user.UserCredentials.Salt))) return StatusCode(401, "Wrong password");

            var creds = _config["SecretKey"].ToSigningCredentials();
            var accessToken = GetNewJwtToken(creds, user);

            var refreshToken = user.RenewRefreshToken(REFRESH_TOKEN_LIFETIME);
            _dbContext.Update(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
                user.UserID,
                user.UserCredentials.Login,
                user.UserCredentials.UserRole,
                RefreshToken = user.UserCredentials.RefreshTokenExpirationDate > DateTime.Now ? user.UserCredentials.RefreshToken : null,
                user.Name,
                user.Surname,
                user.PhoneNumber,
                user.TotalSpent,
                user.Birthdate,
                user.ProfilePicture
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterRequest registerRequest)
        {
            User user = _dbContext.Users.Include(e => e.UserCredentials).Where(user => user.UserCredentials.Login == registerRequest.Login).FirstOrDefault();
            if (user != default) return StatusCode(409, "Such user already exists");
            try
            {
                user = CreateUser(registerRequest);

                await _dbContext.AddAsync(user);
                await _dbContext.SaveChangesAsync();
            }
            catch (UndefinedUserRoleException)
            {
                return StatusCode(422, "Undefined user role occured");
            }catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok(user);
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult> UpdateUser(int userId, UpdateUserRequest updateRequest)
        {
            var user = _dbContext.Users.FirstOrDefault(user => user.UserID == userId);
            if (user == default) return NotFound();
            try
            {
                user.Name = updateRequest.Name;
                user.Surname = updateRequest.Surname;
                user.PhoneNumber = updateRequest.PhoneNumber;
                user.Birthdate = updateRequest.Birthdate;
                user.ProfilePicture = updateRequest.ProfilePicture;

                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok(user);
        }

        [HttpPost("refresh")]
        public ActionResult RefreshAccessToken([FromHeader] string login, [FromHeader] byte[] refreshToken)
        {
            User user = _dbContext.Users.Include(e => e.UserCredentials).Where(user => user.UserCredentials.Login == login).FirstOrDefault();
            if (user == default) return StatusCode(401, "No such user was found");
            if (!user.UserCredentials.RefreshToken.SequenceEqual(refreshToken)) return StatusCode(401, "Wrong refresh token");
            if (user.UserCredentials.RefreshTokenExpirationDate.CompareTo(DateTime.Now) < 0) return StatusCode(401, "Refresh token has expired");

            var creds = _config["SecretKey"].ToSigningCredentials();
            var accessToken = GetNewJwtToken(creds, user);

            return Ok(new JwtSecurityTokenHandler().WriteToken(accessToken));
        }

        #region Utility
        private static User CreateUser(RegisterRequest registerRequest)
        {
            string userRole;
            if (Enum.IsDefined(typeof(UserCredentials.UserRoles), registerRequest.UserRole)) userRole = registerRequest.UserRole;
            else throw new UndefinedUserRoleException();

            var salt = GetSalt();
            var newUserCredentials = new UserCredentials()
            {
                Login = registerRequest.Login,
                PasswordHashed = registerRequest.Password.Encrypt(salt),
                UserRole = userRole,
                Salt = salt,
                RefreshToken = Guid.NewGuid().ToByteArray(),
                RefreshTokenExpirationDate = DateTime.Now.AddDays(REFRESH_TOKEN_LIFETIME)
            };
            var newUser = new User()
            {
                UserCredentials = newUserCredentials,
                Name = registerRequest.Name,
                Surname = registerRequest.Surname,
                Birthdate = registerRequest.Birthdate,
                PhoneNumber = registerRequest.PhoneNumber,
                ProfilePicture = new Picture()
                {
                    Bytes = DefaultImageBytes
                }
            };

            return newUser;
        }

        private static byte[] GetSalt()
        {
            var salt = new byte[SALT_LENGTH];
            using (var random = new RNGCryptoServiceProvider())
            {
                random.GetNonZeroBytes(salt);
            }

            return salt;
        }

        private static JwtSecurityToken GetNewJwtToken(SigningCredentials creds, User user)
        {
            var userClaims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserCredentials.Login),
                new Claim(ClaimTypes.Role, user.UserCredentials.UserRole)
            };

            return new
            (
                claims: userClaims,
                issuer: "http://localhost:7229",
                audience: "http://localhost:7229",
                expires: DateTime.Now.AddMinutes(ACCESS_TOKEN_LIFETIME),
                signingCredentials: creds
            );
        }
        #endregion
    }
}
