import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoginServiceService} from "../../shared/services/login-service.service";
import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../loader/loader.component";



@Component({
    selector: 'app-nav-bar',
    standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe, LoaderComponent],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private loginService: LoginServiceService, private route: Router, private toastrService: ToastrService) {
  }

  readonly articles = input<any[]>([]);
  readonly skill = input<any[]>([]);
  readonly lesson = input<any[]>([]);
  readonly role = input('');
  readonly activeSection = signal<string | null>(null);
  readonly mobileOpen = signal(false);
  readonly loading = signal(true);

  ngOnInit() {
    this.loadPage();
  }

  toggleSection(section: string): void {
    this.activeSection.update(active => active === section ? null : section);
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
  }

  logout(){
    this.loginService.logout();
    sessionStorage.clear();
    this.closeMobileMenu();
    this.route.navigate(['/login']);
    this.toastrService.success("LOGOUT","You're out now!");
  }

  loadPage(){
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.cdr.markForCheck();
    }, 300);
  }


}
