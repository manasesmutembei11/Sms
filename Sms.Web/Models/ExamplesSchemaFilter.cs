using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Sms.Application.DTOs.Auth;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Sms.Web.Models
{
    public class ExamplesSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (schema?.Example != null)
            {
                return;
            }

            var type = context.Type;
            if (type == typeof(AuthenticationDTO) && schema is not null)
            {
                schema.Example = new OpenApiObject
                {
                    ["Email"] = new OpenApiString("juvegitau@gmail.com"),
                    ["Password"] = new OpenApiString("$Exp@q2024"),
                };
            }
        }
    }
}
