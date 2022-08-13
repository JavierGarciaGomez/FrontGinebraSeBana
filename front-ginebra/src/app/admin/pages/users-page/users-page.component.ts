import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../../../shared/interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const ELEMENT_DATA: IUser[] = [
  {
    _id: Math.random().toString(),
    creationDate: new Date(),
    email: 'a@mail.com',
    role: 'user',
    username: 'javi',
  },
  {
    _id: Math.random().toString(),
    creationDate: new Date(),
    email: 'a@mail.com',
    role: 'user',
    username: 'javi',
  },
  {
    _id: Math.random().toString(),
    creationDate: new Date(),
    email: 'a@mail.com',
    role: 'user',
    username: 'javi',
  },
  {
    _id: Math.random().toString(),
    creationDate: new Date(),
    email: 'a@mail.com',
    role: 'user',
    username: 'javi',
  },
];

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, AfterViewInit {
  // username, email,  role, date, actions
  displayedColumns: string[] = [
    'email',
    'username',
    // 'role',
    // 'creationDate',
    // 'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('now', this.dataSource);
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
