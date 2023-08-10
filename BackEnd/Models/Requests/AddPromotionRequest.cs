using System.ComponentModel.DataAnnotations;

namespace Webapi.Models.Requests
{
    public class AddPromotionRequest
    {
        public int AppointmentTypeID { get; set; }
        [Range(1, 99)]
        public int DiscountInPercent { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
