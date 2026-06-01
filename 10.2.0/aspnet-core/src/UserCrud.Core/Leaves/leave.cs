using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Leaves.Enums.LeaveType;
using UserCrud.Leaves.Enums.StatusEnum;

namespace UserCrud.Leaves
{
    public class Leave:Entity<int>
    {

        [Required]
        public string EmployeeName { get; set; }

        [Required]
        public LeavetypeEnum LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public string? Reason { get; set; }

        public StatusEnum Status { get; set; } = StatusEnum.Pending;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int TotalDays
        {
            get
            {
                return (EndDate.Date - StartDate.Date).Days + 1;
            }
        }
    }
}
