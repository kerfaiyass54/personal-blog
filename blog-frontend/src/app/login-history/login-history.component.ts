import {Component, OnInit} from '@angular/core';
import {SessionsManagementService} from "../shared/services/sessions-management.service";
import {TableComponent} from "../components/table/table.component";

@Component({
  selector: 'app-login-history',
  imports: [
    TableComponent
  ],
  templateUrl: './login-history.component.html',
  styleUrl: './login-history.component.scss',
})
export class LoginHistoryComponent implements OnInit{

  email: any = '';
  sessions: any [] = [];
  columns = [
    'Time','Operating system', 'Active','Browser',
  ];
  title = 'Sessions';
  tableData: any[][] = [];

  constructor(private sessionsService: SessionsManagementService) {
  }

  ngOnInit() {
    this.email = sessionStorage.getItem("email");
    this.sessionsService.getAllSessions(this.email).subscribe(
      (sessions)=>{
        this.sessions = sessions;
        console.log(this.sessions);
        this.tableData = sessions.map(s => [
          new Date(s.time).toLocaleString(),
          s.os,
          s.active ? 'Active' : 'Inactive',
          s.browser,

        ]);
      }
    )
  }

  handleRowClick(row: any[]) {
    console.log('Clicked row:', row);
  }




}
