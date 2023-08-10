using System.Runtime.Serialization;

namespace Webapi.Exceptions
{
    [Serializable]
    internal class UndefinedSalonTypeException : Exception
    {
        public UndefinedSalonTypeException()
        {
        }

        public UndefinedSalonTypeException(string? message) : base(message)
        {
        }

        public UndefinedSalonTypeException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected UndefinedSalonTypeException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}