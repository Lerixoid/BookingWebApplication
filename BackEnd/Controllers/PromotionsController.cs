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
    public class PromotionsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public PromotionsController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotions()
        {
            return await _dbContext.Promotions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotion(int id)
        {
            var promotion = await _dbContext.Promotions.FirstOrDefaultAsync(e => e.PromotionID == id);

            if (promotion == null)
            {
                return NotFound();
            }

            return promotion;
        }

        [HttpPost]
        public async Task<ActionResult<Promotion>> PostPromotion(AddPromotionRequest promotionDto)
        {
            if (promotionDto.DateTo < promotionDto.DateFrom) return BadRequest("DateFrom cannot be greater than DateTo");
            var appointmentType = await _dbContext.AppointmentTypes.Include(e => e.Promotion).FirstOrDefaultAsync(e => e.AppointmentTypeID == promotionDto.AppointmentTypeID);

            if (appointmentType == null)
            {
                return NotFound();
            }

            var promotion = new Promotion()
            {
                DiscountInPercent = promotionDto.DiscountInPercent,
                DateFrom = promotionDto.DateFrom,
                DateTo = promotionDto.DateTo
            };

            var currentPromotion = appointmentType.Promotion;
            appointmentType.Promotion = promotion;

            if (currentPromotion != null)
                _dbContext.Promotions.Remove(currentPromotion);

            _dbContext.Promotions.Add(promotion);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction("GetPromotion", new { id = promotion.PromotionID }, promotion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promotion = await _dbContext.Promotions.FindAsync(id);
            if (promotion == null)
            {
                return NotFound();
            }

            _dbContext.Promotions.Remove(promotion);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
