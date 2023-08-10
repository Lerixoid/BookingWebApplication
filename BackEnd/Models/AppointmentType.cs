using System.ComponentModel.DataAnnotations;

namespace Webapi.Models
{
    public class AppointmentType
    {
        public AppointmentType()
        {
            Appointments = new List<Appointment>();
        }

        public int AppointmentTypeID { get; set; }
        public string Name { get; set; }
        [Range(0, 1440)]
        public int LengthMinutes { get; set; }
        [Range(0, 10000)]
        public decimal Price { get; set; }
        public Promotion? Promotion { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
