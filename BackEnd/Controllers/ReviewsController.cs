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
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ReviewsController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _dbContext.Reviews.IncludeAll().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _dbContext.Reviews.IncludeAll().FirstOrDefaultAsync(e => e.ReviewID == id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(AddReviewRequest addReviewRequest)
        {
            var salon = await _dbContext.Salons.FirstOrDefaultAsync(e => e.SalonID == addReviewRequest.SalonID);

            if(salon is null)
            {
                return NotFound();
            }       
            
            var user = await _dbContext.Users.FirstOrDefaultAsync(e => e.UserID == addReviewRequest.UserID);

            if(user is null)
            {
                return NotFound();
            }

            var review = new Review()
            {
                PostedTimestamp = DateTime.Now,
                Rating = addReviewRequest.Rating,
                Comment = addReviewRequest.Comment,
                User = user
            };

            salon.Reviews.Add(review);
            _dbContext.Entry(salon).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.ReviewID }, review);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _dbContext.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _dbContext.Reviews.Remove(review);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
