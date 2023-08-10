using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Webapi.Helpers;
using Webapi.Models;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public PicturesController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpPost("picture/salon/{salonId}")]
        public async Task<ActionResult<Salon>> AssignSalonPicture(int salonId, Picture picture)
        {
            var salon = await _dbContext.Salons.IncludeAll().FirstOrDefaultAsync(e => e.SalonID == salonId);

            float mb = (picture.Bytes.Length / 1024f) / 1024f;

            if (mb > 4) return BadRequest("Max file size is 4 mb");

            if (salon == null)
            {
                return NotFound();
            }

            var currentSalonPicture = salon.SalonPicture;
            salon.SalonPicture = picture;

            if(currentSalonPicture != null)
                _dbContext.Pictures.Remove(currentSalonPicture);

            _dbContext.Entry(salon).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("picture/salon/{salonId}/portfolio")]
        public async Task<ActionResult<Salon>> SalonPortfolioAddPicture(int salonId, Picture picture)
        {
            var salon = await _dbContext.Salons.IncludeAll().FirstOrDefaultAsync(e => e.SalonID == salonId);

            float mb = (picture.Bytes.Length / 1024f) / 1024f;

            if (mb > 4) return BadRequest("Max file size is 4 mb");

            if (salon == null)
            {
                return NotFound();
            }

            salon.Portfolio.Add(picture);

            _dbContext.Entry(salon).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        } 
        
        [HttpDelete("picture/{pictureId}")]
        public async Task<ActionResult<Salon>> DeletePicture(int pictureId)
        {
            var picture = await _dbContext.Pictures.FirstOrDefaultAsync(e => e.PictureID == pictureId);

            if (picture == null)
            {
                return NotFound();
            }

            _dbContext.Pictures.Remove(picture);

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("picture/user/{userId}")]
        public async Task<ActionResult<Salon>> AssignProfilePicture(int userId, Picture picture)
        {
            var user = await _dbContext.Users.Include(e => e.ProfilePicture).FirstOrDefaultAsync(e => e.UserID == userId);

            float mb = (picture.Bytes.Length / 1024f) / 1024f;

            if (mb > 4) return BadRequest("Max file size is 4 mb");

            if (user == null)
            {
                return NotFound();
            }

            var currentProfilePicture = user.ProfilePicture;
            user.ProfilePicture = picture;

            if (currentProfilePicture != null)
                _dbContext.Pictures.Remove(currentProfilePicture);

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
