import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IGetUsersResponse,
  IUser,
} from '../../../shared/interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'email',
    'username',
    'role',
    'creationDate',
    'actions',
  ];
  dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = () => {
    this.authService.getUsers().subscribe((response: IGetUsersResponse) => {
      if (response.ok) {
        console.log(response.users);
        this.dataSource = new MatTableDataSource(response.users);
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire('Error', response.message, 'error');
      }
    });
  };

  ngAfterViewInit(): void {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteUser(event: any, id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cambio es irrevertible',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log({ id });
        this.authService.deleteUser(id).subscribe((response) => {
          if (response.ok) {
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado con éxito',
              'success'
            );
            console.log('BEFORE FETCHING DATA');
            this.fetchData();
          } else {
            Swal.fire('Error', response.message, 'error');
          }
        });
      }
    });
  }
}
