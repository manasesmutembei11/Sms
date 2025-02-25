using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sms.Application.DTOs.Masterdata;
using Sms.Core.Domain.Entities.Masterdata;
using Sms.Core.Domain.Entities.UserEntities;
using Sms.Core.Domain.Paging;
using Sms.Core.Domain.Repositories;
using Sms.Core.Domain.Util.Validations;
using Sms.Core.Domain.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqKit;

namespace Sms.Application.Controllers.Masterdata
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class TeacherController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public TeacherController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }

        [HttpGet("pagedlist/{departmentId}")]
        //  [Authorize(Policy = Permissions.MasterData.View)]
        public async Task<IActionResult> GetPagedList(Guid departmentId, [FromQuery] PagingParameters pagingParameters)
        {
            var predicate = PredicateBuilder.New<Teacher>(s => s.DepartmentId == departmentId);
            if (!string.IsNullOrWhiteSpace(pagingParameters.Search))
            {
                predicate = predicate.And(s => s.FirstName.Contains(pagingParameters.Search) || s.Code.Contains(pagingParameters.Search));
            }


            var paged = await _repository.Teacher.GetPagedListAsync(predicate, pagingParameters, true);
            var data = new PagedList<TeacherDTO>(
                paged.Data.Select(s => _mapper.Map<TeacherDTO>(s)).ToList(),
                paged.MetaData.TotalCount,
                paged.MetaData.CurrentPage,
                paged.MetaData.PageSize);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = Permissions.MasterData.View)]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var entity = await _repository.Teacher.GetByIdAsync(id);
                return Ok(_mapper.Map<TeacherDTO>(entity));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("Save")]
        // [ValidateModel]
        // [Authorize(Permissions.MasterData.Add)]
        public async Task<IActionResult> Save([FromBody] TeacherDTO dto)
        {
            var response = new BasicResponse();
            try
            {
                response.Message = "Teacher";
                if (dto == null || !ModelState.IsValid)
                {
                    response.AddError(0, "Invalid model state");
                    return BadRequest(response);
                }
                var exist = await _repository.Teacher.ExistAsync(dto.Id);
                var entity = _mapper.Map<Teacher>(dto);
                if (!exist)
                {
                    _repository.Teacher.Create(entity);
                }
                else
                {
                    _repository.Teacher.Update(entity);
                }
                await _repository.SaveAsync();
                response.Message = "OK";
                return StatusCode(201, response);

            }
            catch (DomainValidationException ex)
            {
                ex.ValidationResult.Results.ForEach(s => response.AddError(0, s.ErrorMessage));
                response.Message = "Domain Errors";
                return StatusCode(500, response);
            }
            catch (Exception ex)
            {
                response.AddError(0, ex.Message);
                response.Message = "OK";
                return StatusCode(500, response);
            }
        }

        [HttpDelete("Delete/{id}")]
        [Authorize(Permissions.MasterData.Delete)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = new BasicResponse();
            try
            {
                var item = await _repository.Teacher.GetByIdAsync(id);
                if (item == null)
                {
                    response.Message = "Item not found";
                    return NotFound(response);
                }
                _repository.Teacher.Delete(item);
                await _repository.SaveAsync();

                response.Message = "Item deleted successfully";
                return NoContent();
            }
            catch (Exception ex)
            {
                response.AddError(0, ex.Message);
                response.Message = "An error occurred";
                return StatusCode(500, response);
            }
        }
    }
}
