using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Leaves.Enums.LeaveType;
using UserCrud.Leaves.Enums.StatusEnum;

namespace UserCrud.leave.Dto
{
    public class leaveDto
    {
        public int Id { get; set; }

        public string EmployeeName { get; set; }

        public LeavetypeEnum LeaveType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Reason { get; set; }

        public StatusEnum Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public int TotalDays
        {
            get
            {
                return (EndDate.Date - StartDate.Date).Days + 1;
            }
        }
    }
}
