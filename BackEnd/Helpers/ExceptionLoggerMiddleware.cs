namespace Webapi.Helpers
{
    public class ExceptionLoggerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionLoggerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception e)
            {
                Log(e.Message);
                throw;
            }
        }

        private static void Log(string msg)
        {
            string logFilePath = @"Data\logs.txt";
            string projectDir = Environment.CurrentDirectory.Replace(@"bin\Debug", "");
            File.WriteAllText(projectDir + logFilePath, msg);
        }
    }
}
