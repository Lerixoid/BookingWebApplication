using System.ComponentModel.DataAnnotations;

namespace Webapi.Models
{
    public class Promotion
    {
        public int PromotionID { get; set; }
        [Range(1,99)]
        public int DiscountInPercent { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
