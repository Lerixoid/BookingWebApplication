using Webapi.Models;

namespace Webapi.Services
{
    public interface ICalendarService
    {
        public string AddEvent(Appointment appointment);
        public void RemoveEvent(Appointment appointment);
        public List<DateTime> GetPossibleTimes(int appointmentTypeId, DateTime date);
    }
}
