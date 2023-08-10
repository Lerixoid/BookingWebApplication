using System.ComponentModel.DataAnnotations;

namespace Webapi.Models.Requests
{
    public class AddAppointmentTypeRequest
    {
        public int SalonID { get; set; }
        public string Name { get; set; }
        [Range(0, 1440)]
        public int LengthMinutes { get; set; }
        [Range(0, 10000)]
        public decimal Price { get; set; }
    }
}
