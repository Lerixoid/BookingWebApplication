using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Webapi.Models;
using Webapi.Models.Requests;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmentitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public AmentitiesController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Amentity>>> GetAmentities()
        {
            return await _dbContext.Amentities.Include(e => e.Icon).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Amentity>> GetAmentity(int id)
        {
            var Amentity = await _dbContext.Amentities.Include(e => e.Icon).FirstOrDefaultAsync(e => e.AmentityID == id);

            if (Amentity == null)
            {
                return NotFound();
            }

            return Amentity;
        }

        [HttpPost]
        public async Task<ActionResult<Amentity>> PostAmentity(AddAmentityRequest addAmentityRequest)
        {
            var salon = await _dbContext.Salons.Include(e => e.Amentities).FirstOrDefaultAsync(e => e.SalonID == addAmentityRequest.SalonID);

            if (salon is null) return NotFound();

            var amentity = new Amentity()
            {
                Name = addAmentityRequest.Name,
                Icon = addAmentityRequest.Icon
            };
            salon.Amentities.Add(amentity);

            _dbContext.Amentities.Add(amentity);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetAmentity", new { id = amentity.AmentityID }, amentity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAmentity(int id)
        {
            var Amentity = await _dbContext.Amentities.FindAsync(id);
            if (Amentity == null)
            {
                return NotFound();
            }

            _dbContext.Amentities.Remove(Amentity);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
