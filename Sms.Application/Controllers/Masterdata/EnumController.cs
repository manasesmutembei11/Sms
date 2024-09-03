using Microsoft.AspNetCore.Mvc;
using Sms.Core.Domain.Entities.Notifications;
using Sms.Core.Domain.Entities.Templates;
using Sms.Core.Domain.Models;
using Sms.Core.Domain.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sms.Application.Controllers.Masterdata
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnumLookupController : ControllerBase
    {
        [HttpGet("DocumentTemplateList")]
        public IActionResult GetDocumentTemplateLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<DocumentTemplateType>();
            return Ok(data);
        }



        [HttpGet("ChargeTypeList")]
        public IActionResult GetChargeTypeLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<ChargeType>();
            return Ok(data);
        }
        [HttpGet("TransmissionTypeList")]
        public IActionResult GetTransmissionTypeLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<TransmissionType>();
            return Ok(data);
        }

        [HttpGet("PartGroupList")]
        public IActionResult GetPartGroupListLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<PartGroup>();
            return Ok(data);
        }

        [HttpGet("AppNotificationTypeList")]
        public IActionResult GetAppNotificationTypeLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<AppNotificationType>();
            return Ok(data);
        }

        [HttpGet("AppContactTypeList")]
        public IActionResult GetAppContactTypeLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<AppContactType>();
            return Ok(data);
        }
        [HttpGet("AppGroupContactTypeList")]
        public IActionResult GetAppGroupContactTypeLookupList()
        {
            var groupContactTypes = new List<int>() {
                (int) AppContactType.Client,

            };
            var data = XpaEnumExtensions.GetEnumList<AppContactType>().Where(s => groupContactTypes.Contains(s.Id)).OrderBy(s => s.Name).ToList();
            return Ok(data);
        }


        [HttpGet("EmailAddressTypeList")]
        public IActionResult GetEmailAddressTypeLookupList()
        {
            var data = XpaEnumExtensions.GetEnumList<EmailAddressType>();
            return Ok(data);
        }

        [HttpGet("AreaTypeList")]
        public IActionResult GetAreaTypeList()
        {
            var data = XpaEnumExtensions.GetEnumList<AreaOfOperationType>();
            return Ok(data);
        }
        [HttpGet("YearList")]
        public IActionResult GetYearList()
        {
            int from = DateTime.Now.AddYears(-15).Year;
            var data = new List<LookupItem<int>>();
            for (int i = from; i <= DateTime.Now.Year; i++)
            {
                data.Add(new LookupItem<int>(i, i.ToString(), i.ToString()));
            }
            return Ok(data);
        }

        [HttpGet("VehicleBodyTypeList")]
        public IActionResult GetVehicleBodyTypeList()
        {
            var data = XpaEnumExtensions.GetEnumList<VehicleBodyType>().OrderBy(s => s.Name);
            return Ok(data);
        }
        [HttpGet("AssessmentRecommendationList")]
        public IActionResult GetAssessmentRecommendationList()
        {
            var data = XpaEnumExtensions.GetEnumList<AssessmentRecommendation>().Where(s => s.Id != 0).ToList();
            return Ok(data);
        }
        [HttpGet("AssessmentSurveyItemValueList")]
        public IActionResult GetAssessmentSurveyItemValueList()
        {
            var data = XpaEnumExtensions.GetEnumList<AssessmentSurveyItemValue>().Where(s => s.Id != 0).ToList();
            return Ok(data);
        }
        [HttpGet("SurveyItemTypeList")]
        public IActionResult GetSurveyItemTypeList()
        {
            var data = XpaEnumExtensions.GetEnumList<SurveyItemType>().Where(s => s.Id != 0).ToList();
            return Ok(data);
        }



    }
}
