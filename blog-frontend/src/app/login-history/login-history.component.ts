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
  columns = ['id','Operating system',
    'Time', 'Alerts','Browser',
  ];
  title = 'Sessions';
  tableData: any[][] = [];
  selectedSession: any[] | null = null;
  showModal = false;
  id: any = '';

  handleRowClick(row: any[]) {
    this.selectedSession = row;
    this.showModal = true;
  }



  constructor(private sessionsService: SessionsManagementService) {
  }

  ngOnInit() {
    this.email = sessionStorage.getItem("email");
    this.sessionsService.getAllSessions(this.email).subscribe(
      (sessions)=>{
        this.sessions = sessions;
        console.log(this.sessions);
        this.tableData = sessions.map(s => [
          s.id,
          s.os,
          new Date(s.time).toLocaleString(),
          s.alert,
          s.browser,
        ]);
      }
    )
  }




}
