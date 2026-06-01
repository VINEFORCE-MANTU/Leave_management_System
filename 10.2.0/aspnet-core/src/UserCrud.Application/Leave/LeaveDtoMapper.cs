using AutoMapper;
using UserCrud.leave.Dto;
using UserCrud.Leaves;

namespace UserCrud.Leaves
{
    public class LeaveDtoMapper : Profile
    {
        public LeaveDtoMapper()
        {
            CreateMap<Leave, leaveDto>();

            CreateMap<CreateleaveDto, Leave>();

            CreateMap<updateleaveDto, Leave>();

            CreateMap<updateLeaveStatusDto, Leave>();
        }
    }
}