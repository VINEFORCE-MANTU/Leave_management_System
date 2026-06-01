using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Leaves.Enums.StatusEnum;

namespace UserCrud.leave.Dto
{
    public class updateLeaveStatusDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public StatusEnum Status { get; set; }
    }
}
