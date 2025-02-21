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

namespace Sms.Application.Controllers.Masterdata
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public DepartmentController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }

        [HttpGet("pagedlist")]
        //  [Authorize(Policy = Permissions.MasterData.View)]
        [AllowAnonymous]
        public async Task<IActionResult> GetPagedList([FromQuery] PagingParameters pagingParameters)
        {
            var paged = await _repository.Department.GetPagedListAsync(pagingParameters, true);
            var data = new PagedList<DepartmentDTO>(
                paged.Data.Select(s => _mapper.Map<DepartmentDTO>(s)).ToList(),
                paged.MetaData.TotalCount,
                paged.MetaData.CurrentPage,
                paged.MetaData.PageSize);
            return Ok(data);
        }

        [HttpGet("{id}")]
       // [Authorize(Policy = Permissions.MasterData.View)]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var entity = await _repository.Department.GetByIdAsync(id);
                return Ok(_mapper.Map<DepartmentDTO>(entity));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("Save")]
        // [ValidateModel]
        // [Authorize(Permissions.MasterData.Add)]
        public async Task<IActionResult> Save([FromBody] DepartmentDTO dto)
        {
            var response = new BasicResponse();
            try
            {
                response.Message = "Department";
                if (dto == null || !ModelState.IsValid)
                {
                    response.AddError(0, "Invalid model state");
                    return BadRequest(response);
                }
                var exist = await _repository.Department.ExistAsync(dto.Id);
                var entity = _mapper.Map<Department>(dto);
                if (!exist)
                {
                    _repository.Department.Create(entity);
                }
                else
                {
                    _repository.Department.Update(entity);
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
       // [Authorize(Permissions.MasterData.Delete)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = new BasicResponse();
            try
            {
                var item = await _repository.Department.GetByIdAsync(id);
                if (item == null)
                {
                    response.Message = "Item not found";
                    return NotFound(response);
                }
                _repository.Department.Delete(item);
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
