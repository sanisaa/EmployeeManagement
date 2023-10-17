import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  // baseAPiUrl: string = environment.baseApiUrl  ;
  baseApiUrl:  string = environment.baseApiUrl;
  //to talk to external API, we need httpClient so injecting here
  constructor(private http: HttpClient) { }  //added typeRoots and type in tsconfig,json to inject this for the import statement to appear

  getAllEmployees(): Observable<Employee[]>{
    
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees') //save url in environment file
  }
  addEmployee(addEmployeeRequest: Employee): Observable<Employee>{
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
   return this.http.post<Employee>(this.baseApiUrl + '/api/employees', addEmployeeRequest)
  }
  getEmployee(id: string): Observable<Employee> {
    const url = `${this.baseApiUrl}/api/employees/${id}`;
    console.log('Fetching employee with URL:', url);
    return this.http.get<Employee>(url);
  }
  

  updateEmployee(id: string, updateEmployeeRequest: Employee): Observable<Employee>{
    return this.http.put<Employee>(this.baseApiUrl + '/api/employees/' + id, updateEmployeeRequest);
  }
  deleteEmployee(id: string){
    return this.http.delete(this.baseApiUrl + '/api/employees/' + id);
  }
}
