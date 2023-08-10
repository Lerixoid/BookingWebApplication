namespace Webapi.Models
{
    public class DayHours
    {
        public int DayHoursID { get; set; }
        public string DayName { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
    }
}
