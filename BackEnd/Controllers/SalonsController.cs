using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Webapi.Contexts;
using Webapi.Exceptions;
using Webapi.Helpers;
using Webapi.Models;
using Webapi.Models.DTO;
using Webapi.Models.Requests;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public SalonsController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalonDto>>> GetSalons()
        {
            var salonsDto = await _dbContext.Salons.IncludeAll().Select(e => new SalonDto(e)).ToListAsync();
            return salonsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalonDto>> GetSalon(int id)
        {
            var salon = await _dbContext.Salons.IncludeAll().FirstOrDefaultAsync(e => e.SalonID == id);

            if (salon == null)
            {
                return NotFound();
            }

            return new SalonDto(salon);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalon(int id, AddSalonRequest addSalonRequest)
        {
            var salon = await _dbContext.Salons.IncludeAll().FirstOrDefaultAsync(e => e.SalonID == id);

            if (salon is null) return NotFound();
            ValidateSalonRequest(addSalonRequest);

            salon.Name = addSalonRequest.Name;
            salon.Description = addSalonRequest.Description;
            salon.OwnerPhoneNumber = addSalonRequest.OwnerPhoneNumber;
            salon.WebsiteURL = addSalonRequest.WebsiteURL;
            salon.SalonType = addSalonRequest.SalonType;
            salon.Address = addSalonRequest.Address;
            salon.OpenHours = addSalonRequest.OpenHours;

            _dbContext.Entry(salon).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Salon>> PostSalon(AddSalonRequest addSalonRequest)
        {
            var owner = _dbContext.Users.FirstOrDefault(e => e.UserID == addSalonRequest.OwnerUserID); 
            if (owner == null) return NotFound("Such user id could not be found");

            ValidateSalonRequest(addSalonRequest);

            var salon = new Salon()
            {
                Name = addSalonRequest.Name,
                Description = addSalonRequest.Description,
                OwnerPhoneNumber = addSalonRequest.OwnerPhoneNumber,
                WebsiteURL = addSalonRequest.WebsiteURL,
                SalonType = addSalonRequest.SalonType,
                Address = addSalonRequest.Address,
                OpenHours = addSalonRequest.OpenHours,
                AppointmentTypes = new List<AppointmentType>(),
                Amentities = new List<Amentity>(),
                Portfolio = new List<Picture>(),
                Reviews = new List<Review>(),
                Owner = owner
            };

            _dbContext.Salons.Add(salon);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction("GetSalon", new { id = salon.SalonID }, salon);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalon(int id)
        {
            var salon = await _dbContext.Salons.FindAsync(id);
            if (salon == null)
            {
                return NotFound();
            }

            _dbContext.Salons.Remove(salon);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool SalonExists(int id)
        {
            return _dbContext.Salons.Any(e => e.SalonID == id);
        }
        private void ValidateSalonRequest(AddSalonRequest addSalonRequest)
        {
            if (!Enum.IsDefined(typeof(Salon.SalonTypes), addSalonRequest.SalonType)) throw new UndefinedSalonTypeException($"Uknown salon type\nPossible values: {string.Join(',', Enum.GetNames(typeof(Salon.SalonTypes)))}");
            if (addSalonRequest.OpenHours.Any(e => e.DayName.IsDayOfWeek() == false)) throw new UndefinedDayOfWeekException($"Uknown day of the week\nPossible values: {string.Join(',', UtilityExtensions.daysOfWeekNames)}");
        }
    }
}
