namespace Webapi.Models
{
    public class ContactForm
    {
        public int ContactFormID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
