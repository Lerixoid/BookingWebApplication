namespace Webapi.Models
{
    public class Appointment
    {
        public int AppointmentID { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsCanceled { get; set; }
        public string CalendarAppointmentURL { get; set; }
        public string NoteForSalon { get; set; }
        public AppointmentType AppointmentType { get; set; }
        public User User { get; set; }
    }
}
