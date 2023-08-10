namespace Webapi.Models.Requests
{
    public class AddSalonRequest
    {
        public int OwnerUserID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public string? WebsiteURL { get; set; }
        public string SalonType { get; set; }
        public Address Address { get; set; }
        public virtual ICollection<DayHours> OpenHours { get; set; }
    }
}
