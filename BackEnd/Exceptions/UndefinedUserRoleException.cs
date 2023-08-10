using System.Runtime.Serialization;

namespace Webapi.Exceptions
{
    [Serializable]
    internal class UndefinedUserRoleException : Exception
    {
        public UndefinedUserRoleException()
        {
        }

        public UndefinedUserRoleException(string? message) : base(message)
        {
        }

        public UndefinedUserRoleException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected UndefinedUserRoleException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}