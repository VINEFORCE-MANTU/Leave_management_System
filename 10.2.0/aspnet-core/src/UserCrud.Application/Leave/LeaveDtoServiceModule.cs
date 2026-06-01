using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.leave;
using UserCrud.leave.Dto;
using UserCrud.Leaves.Enums.LeaveType;
using UserCrud.Leaves.Enums.StatusEnum;

namespace UserCrud.Leaves
{
    public class LeaveDtoServiceModule : ApplicationService, IleaveDtoModule
    {
        private readonly IRepository<Leave, int> _leaveRepository;

        public LeaveDtoServiceModule(
            IRepository<Leave, int> leaveRepository)
        {
            _leaveRepository = leaveRepository;
        }

        public async Task<List<leaveDto>> GetAllAsync()
        {
            var leaves = await _leaveRepository.GetAllListAsync();

            return ObjectMapper.Map<List<leaveDto>>(leaves);
        }

        public async Task<leaveDto> GetByIdAsync(int id)
        {
            var leave = await _leaveRepository.GetAsync(id);

            return ObjectMapper.Map<leaveDto>(leave);
        }

        public async Task CreateAsync(CreateleaveDto input)
        {
            if (input.EndDate < input.StartDate)
            {
                throw new UserFriendlyException(
                    "End Date cannot be earlier than Start Date.");
            }

            if (!Enum.IsDefined(typeof(LeavetypeEnum), input.LeaveType))
            {
                throw new UserFriendlyException(
                    "Invalid Leave Type.");
            }

            var leave = ObjectMapper.Map<Leave>(input);

            leave.Status = StatusEnum.Pending;

            await _leaveRepository.InsertAsync(leave);
        }

        public async Task UpdateAsync(updateleaveDto input)
        {
            var leave = await _leaveRepository.GetAsync(input.Id);

            if (leave.Status != StatusEnum.Pending)
            {
                throw new UserFriendlyException(
                    "Only pending leave requests can be edited.");
            }

            if (input.EndDate < input.StartDate)
            {
                throw new UserFriendlyException(
                    "End Date cannot be earlier than Start Date.");
            }

            if (!Enum.IsDefined(typeof(LeavetypeEnum), input.LeaveType))
            {
                throw new UserFriendlyException(
                    "Invalid Leave Type.");
            }

            ObjectMapper.Map(input, leave);

            await _leaveRepository.UpdateAsync(leave);
        }

        public async Task UpdateStatusAsync(updateLeaveStatusDto input)
        {
            var leave = await _leaveRepository.GetAsync(input.Id);

            if (leave.Status != StatusEnum.Pending)
            {
                throw new UserFriendlyException(
                    "Status has already been updated.");
            }

            if (!Enum.IsDefined(typeof(StatusEnum), input.Status))
            {
                throw new UserFriendlyException(
                    "Invalid Status.");
            }

            leave.Status = input.Status;

            await _leaveRepository.UpdateAsync(leave);
        }

        public async Task DeleteAsync(int id)
        {
            await _leaveRepository.DeleteAsync(id);
        }
    }
}