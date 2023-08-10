using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Webapi.Helpers;
using Webapi.Models;
using Webapi.Models.Requests;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AppointmentTypesController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentType>>> GetAppointmentTypes()
        {
            return await _dbContext.AppointmentTypes.IncludeAll().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentType>> GetAppointmentType(int id)
        {
            var appointmentType = await _dbContext.AppointmentTypes.IncludeAll().FirstOrDefaultAsync(e => e.AppointmentTypeID == id);

            if (appointmentType == null)
            {
                return NotFound();
            }

            return appointmentType;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointmentType(int id, AppointmentType appointmentType)
        {
            var appointmentTypeToModify = await _dbContext.AppointmentTypes.IncludeAll().FirstOrDefaultAsync(e => e.AppointmentTypeID == id);

            if (appointmentTypeToModify == null)
            {
                return NotFound();
            }

            appointmentTypeToModify.LengthMinutes = appointmentType.LengthMinutes;
            appointmentTypeToModify.Price = appointmentType.Price;
            appointmentTypeToModify.Name = appointmentType.Name;

            _dbContext.Entry(appointmentTypeToModify).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentTypeExists(id))
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
        public async Task<ActionResult<AppointmentType>> PostAppointmentType(AddAppointmentTypeRequest addAppointmentTypeRequest)
        {
            var salon = await _dbContext.Salons.Include(e => e.AppointmentTypes).FirstOrDefaultAsync(e => e.SalonID == addAppointmentTypeRequest.SalonID);

            if (salon is null) return NotFound();

            var appointmentType = new AppointmentType()
            {
                Name = addAppointmentTypeRequest.Name,
                LengthMinutes = addAppointmentTypeRequest.LengthMinutes,
                Price = addAppointmentTypeRequest.Price
            };
            salon.AppointmentTypes.Add(appointmentType);

            _dbContext.AppointmentTypes.Add(appointmentType);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetAppointmentType", new { id = appointmentType.AppointmentTypeID }, appointmentType);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointmentType(int id)
        {
            var appointmentType = await _dbContext.AppointmentTypes.FindAsync(id);
            if (appointmentType == null)
            {
                return NotFound();
            }

            _dbContext.AppointmentTypes.Remove(appointmentType);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentTypeExists(int id)
        {
            return _dbContext.AppointmentTypes.Any(e => e.AppointmentTypeID == id);
        }
    }
}
