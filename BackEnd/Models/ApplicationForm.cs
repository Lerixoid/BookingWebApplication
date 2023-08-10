namespace Webapi.Models
{
    public class ApplicationForm
    {
        public int ApplicationFormID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Number { get; set; }
        public string Organization { get; set; }
        public string OrganizationContact { get; set; }
        public string OrganizationAdress { get; set; }
        public string Comment { get; set; }
    }
}
