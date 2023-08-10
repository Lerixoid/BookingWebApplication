using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Webapi.Models.Requests;
using Webapi.Models;
using static Webapi.Models.UserCredentials;
using Webapi.Helpers;
using System.Security.Cryptography;
using System.Text;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ContactController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpPost("subscription")]
        public async Task<ActionResult> AddSubscriptionEmail(Email email)
        {
            _dbContext.Emails.Add(email);

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("application")]
        public async Task<ActionResult> AddApplicationForm(ApplicationForm applicationForm)
        {
            _dbContext.ApplicationForms.Add(applicationForm);

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("contact")]
        public async Task<ActionResult> AddContactForm(ContactForm contactForm)
        {
            _dbContext.ContactForms.Add(contactForm);

            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
