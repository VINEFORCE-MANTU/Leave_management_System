using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Leaves.Enums.LeaveType;

namespace UserCrud.leave.Dto
{
    public class updateleaveDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string EmployeeName { get; set; }

        [Required]
        public LeavetypeEnum LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(500)]
        public string? Reason { get; set; }
    }
}
