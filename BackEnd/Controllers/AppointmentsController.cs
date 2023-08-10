using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Webapi.Helpers;
using Webapi.Models;
using Webapi.Models.Requests;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AppointmentsController(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _dbContext.Appointments.IncludeAll().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _dbContext.Appointments.IncludeAll().FirstOrDefaultAsync(e => e.AppointmentID == id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(AddAppointmentRequest addAppointmentRequest)
        {
            var appointmentType = await _dbContext.AppointmentTypes.FirstOrDefaultAsync(e => e.AppointmentTypeID == addAppointmentRequest.AppointmentTypeID);
            var user = await _dbContext.Users.FirstOrDefaultAsync(e => e.UserID == addAppointmentRequest.UserID);

            if (appointmentType is null || user is null)
            {
                return NotFound();
            }

            var appointment = new Appointment()
            {
                DateFrom = addAppointmentRequest.Date,
                DateTo = addAppointmentRequest.Date.AddMinutes(appointmentType.LengthMinutes),
                IsConfirmed = false,
                IsCanceled = false,
                NoteForSalon = addAppointmentRequest.NoteForSalon,
                CalendarAppointmentURL = "todo: use google calendar api to create new appointment",
                AppointmentType = appointmentType,
                User = user
            };
            _dbContext.Appointments.Add(appointment);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.AppointmentID }, appointment);
        }

        [HttpPost("list")]
        public async Task<ActionResult<Appointment>> PostAppointments(List<AddAppointmentRequest> addAppointmentRequests)
        {
            foreach (var addAppointmentRequest in addAppointmentRequests)
            {
                var appointmentType = await _dbContext.AppointmentTypes.FirstOrDefaultAsync(e => e.AppointmentTypeID == addAppointmentRequest.AppointmentTypeID);
                var user = await _dbContext.Users.FirstOrDefaultAsync(e => e.UserID == addAppointmentRequest.UserID);

                if (appointmentType is null || user is null)
                {
                    return NotFound();
                }

                var appointment = new Appointment()
                {
                    DateFrom = addAppointmentRequest.Date,
                    DateTo = addAppointmentRequest.Date.AddMinutes(appointmentType.LengthMinutes),
                    IsConfirmed = false,
                    IsCanceled = false,
                    NoteForSalon = addAppointmentRequest.NoteForSalon,
                    CalendarAppointmentURL = "todo: use google calendar api to create new appointment",
                    AppointmentType = appointmentType,
                    User = user
                };
                _dbContext.Appointments.Add(appointment);
            }

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAppointments()
        {
            var appointments = await _dbContext.Appointments.IncludeAll().ToListAsync();
            if (appointments == null)
            {
                return NotFound();
            }

            _dbContext.Appointments.RemoveRange(appointments);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _dbContext.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _dbContext.Appointments.Remove(appointment);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("confirm/{appointmentId}")]
        public async Task<ActionResult<Appointment>> ConfirmAppointment(int appointmentId)
        {
            var appointment = _dbContext.Appointments.FirstOrDefault(e => e.AppointmentID == appointmentId);
            if (appointment is null)
            {
                return NotFound();
            }

            appointment.IsConfirmed = true;
            _dbContext.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(appointmentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Appointment has been confirmed");
        }

        [HttpGet("cancel/{appointmentId}")]
        public async Task<ActionResult<Appointment>> CancelAppointment(int appointmentId)
        {
            var appointment = _dbContext.Appointments.FirstOrDefault(e => e.AppointmentID == appointmentId);
            if (appointment is null)
            {
                return NotFound();
            }

            appointment.IsCanceled = true;
            _dbContext.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(appointmentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Appointment has been canceled");
        }

        private bool AppointmentExists(int id)
        {
            return _dbContext.Appointments.Any(e => e.AppointmentID == id);
        }
    }
}