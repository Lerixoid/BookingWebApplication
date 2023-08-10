namespace Webapi.Models.Requests
{
    public class AddAmentityRequest
    {
        public int SalonID { get; set; }
        public string Name { get; set; }
        public Picture Icon { get; set; }
    }
}
