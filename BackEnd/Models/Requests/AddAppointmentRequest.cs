namespace Webapi.Models.Requests
{
    public class AddAppointmentRequest
    {
        public int AppointmentTypeID { get; set; }
        public int UserID { get; set; }
        public string NoteForSalon { get; set; }
        public DateTime Date { get; set; }
    }
}
