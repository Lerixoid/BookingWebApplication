using System.Runtime.Serialization;

namespace Webapi.Exceptions
{
    [Serializable]
    internal class UndefinedDayOfWeekException : Exception
    {
        public UndefinedDayOfWeekException()
        {
        }

        public UndefinedDayOfWeekException(string? message) : base(message)
        {
        }

        public UndefinedDayOfWeekException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected UndefinedDayOfWeekException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}