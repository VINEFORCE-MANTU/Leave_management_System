using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.leave.Dto;

namespace UserCrud.leave
{
    public interface IleaveDtoModule:IApplicationService
    {
      
        Task<List<leaveDto>> GetAllAsync();


        Task<leaveDto> GetByIdAsync(int id);

        Task CreateAsync(CreateleaveDto input);

        
        Task UpdateAsync(updateleaveDto input);

       
        Task UpdateStatusAsync(updateLeaveStatusDto input);


        Task DeleteAsync(int id);
    }
}
