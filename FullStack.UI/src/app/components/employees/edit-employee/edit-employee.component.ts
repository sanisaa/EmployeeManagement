import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }
  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private router: Router){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Employee ID:', id);
      
      if (id) {
        this.employeeService.getEmployee(id).subscribe(
          (response: Employee) => {
            this.employeeDetails = response;
          },
          (error) => {
            console.error('Error fetching employee details', error);
          }
        );
      }
    });
  }
  
  
  

  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe(
      {
        next: (response)=> {
          this.router.navigate(['employees']);
      }
  });
  }
  deleteEmployee(id: string){
    console.log("deleteid",id);
    
    this.employeeService.deleteEmployee(id).subscribe(
      {
        next: (response)=> {
          this.router.navigate(['employees']);
      }
  });
  }

}
