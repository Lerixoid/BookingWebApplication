namespace Webapi.Models
{
    public class Address
    {
        public int AddressID { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string? FlatNumber { get; set; }
        public string PostalCode { get; set; }
    }
}
