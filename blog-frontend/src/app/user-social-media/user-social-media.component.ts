import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SmartTableComponent } from "../components/smart-table/smart-table.component";
import { SocialMediaService } from "../user-profile/service/social-media.service";
import { SocialMedia, SocialMediaCreation } from "../models/SocialMedia";
import { SmartTableConfig } from "../components/models/smart-table";

declare var bootstrap: any;

@Component({
  selector: 'app-user-social-media',
  standalone: true,
  imports: [CommonModule, FormsModule, SmartTableComponent],
  templateUrl: './user-social-media.component.html',
  styleUrls: ['./user-social-media.component.scss'],
})
export class UserSocialMediaComponent implements OnInit {

  private socialService = inject(SocialMediaService);
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  tableData: SocialMedia[] = [];

  private currentPage = 0;
  private pageSize = 20;

  private userEmail = '';

  // ADD MODAL STATE
  newSocial: SocialMediaCreation = this.emptyCreation();
  linkError = '';
  addSubmitting = false;
  private addModalInstance: any = null;

  // DETAILS MODAL STATE
  selectedSocial: SocialMedia | null = null;
  private detailsModalInstance: any = null;

  // EDIT MODAL STATE
  editBuffer: SocialMedia | null = null;
  editSubmitting = false;
  private editModalInstance: any = null;

  // DELETE MODAL STATE
  deleteSubmitting = false;
  private deleteModalInstance: any = null;

  // ENUM TYPES
  readonly socialTypes = [
    { value: 'FACEBOOK', label: 'Facebook', icon: 'facebook' },
    { value: 'X', label: 'X', icon: 'x' },
    { value: 'INSTAGRAM', label: 'Instagram', icon: 'instagram' },
    { value: 'LINKEDIN', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'YOUTUBE', label: 'YouTube', icon: 'youtube' },
    { value: 'MEDIUM', label: 'Medium', icon: 'medium' },
    { value: 'GITHUB', label: 'GitHub', icon: 'github' },
    { value: 'GITLAB', label: 'GitLab', icon: 'gitlab' },
    { value: 'SNAPCHAT', label: 'Snapchat', icon: 'snapchat' }
  ];

  readonly tableConfig: SmartTableConfig<SocialMedia> = {

    title: 'Social Accounts',

    searchable: true,
    exportable: true,

    pageSizeOptions: [5, 10, 20],

    columns: [

      {
        key: 'socialMediaType',
        label: 'Platform',
        type: 'icon',
        sortable: true,
        width: '120px',

        iconMap: {
          FACEBOOK: 'bi bi-facebook',
          X: 'bi bi-twitter-x',
          INSTAGRAM: 'bi bi-instagram',
          LINKEDIN: 'bi bi-linkedin',
          YOUTUBE: 'bi bi-youtube',
          MEDIUM: 'bi bi-medium',
          GITHUB: 'bi bi-github',
          GITLAB: 'bi bi-gitlab',
          SNAPCHAT: 'bi bi-snapchat'
        }
      },

      {
        key: 'name',
        label: 'Name',
        type: 'text',
        sortable: true
      },

      {
        key: 'link',
        label: 'Link',
        type: 'text'
      },

      {
        key: 'userName',
        label: 'Owner',
        type: 'text'
      },

      {
        key: 'description',
        label: 'Description',
        type: 'text'
      }

    ],

    modalTitle: (row) => {
      this.openDetailsModal(row);
      return row.name;
    },

    modalFields: []
  };


  ngOnInit() {

    const email = sessionStorage.getItem('email');

    if (!email) {
      console.error("Email missing from sessionStorage");
      return;
    }

    this.userEmail = email;

    this.loadData();
  }


  loadData() {


    this.cdr.markForCheck();

    this.socialService
      .getAllSocialMedia(
        this.currentPage,
        this.pageSize,
        this.userEmail
      )
      .subscribe({

        next: (res: any) => {

          this.tableData = res.content ?? res ?? [];

          this.loading = false;

          this.cdr.markForCheck();
        },

        error: () => {

          this.loading = false;

          this.cdr.markForCheck();
        }

      });

  }


  onRowSave(updated: SocialMedia) {

    if (!updated.id) return;

    this.socialService
      .updateSocialMediaById(updated.id, updated)
      .subscribe(() => this.loadData());

  }


  /* ================= ADD MODAL ================= */

  openAddModal() {

    this.newSocial = this.emptyCreation();

    this.linkError = '';

    setTimeout(() => {

      const el = document.getElementById("addSocialModal");

      if (!el) return;

      this.addModalInstance ??=
        new bootstrap.Modal(el);

      this.addModalInstance.show();

    });

  }


  submitAdd() {

    if (!this.newSocial.link) return;

    this.addSubmitting = true;

    this.socialService
      .isLinkUsed(this.newSocial.link)
      .subscribe({

        next: (used) => {

          if (used) {

            this.linkError = "Link already exists";

            this.addSubmitting = false;

            this.cdr.markForCheck();

            return;

          }

          this.socialService
            .createSocialMedia(
              this.newSocial,
              this.userEmail
            )
            .subscribe({

              next: () => {

                this.addModalInstance?.hide();

                this.addSubmitting = false;

                this.loadData();

              }

            });

        }

      });

  }


  /* ================= DETAILS MODAL ================= */

  openDetailsModal(row: SocialMedia) {

    this.selectedSocial = row;

    setTimeout(() => {

      const el = document.getElementById("detailsModal");

      if (!el) return;

      this.detailsModalInstance ??=
        new bootstrap.Modal(el);

      this.detailsModalInstance.show();

    });

  }


  /* ================= EDIT MODAL ================= */

  openEditModal(row: SocialMedia) {

    this.editBuffer = { ...row };

    this.detailsModalInstance?.hide();

    setTimeout(() => {

      const el = document.getElementById("editModal");

      if (!el) return;

      this.editModalInstance ??=
        new bootstrap.Modal(el);

      this.editModalInstance.show();

    });

  }


  submitEdit() {

    if (!this.editBuffer?.id) return;

    this.editSubmitting = true;

    this.socialService
      .updateSocialMediaById(
        this.editBuffer.id,
        this.editBuffer
      )
      .subscribe({

        next: () => {

          this.editModalInstance?.hide();

          this.editSubmitting = false;

          this.loadData();

        }

      });

  }


  /* ================= DELETE MODAL ================= */

  openDeleteModal(row: SocialMedia) {

    this.selectedSocial = row;

    this.detailsModalInstance?.hide();

    setTimeout(() => {

      const el = document.getElementById("deleteModal");

      if (!el) return;

      this.deleteModalInstance ??=
        new bootstrap.Modal(el);

      this.deleteModalInstance.show();

    });

  }


  submitDelete() {

    if (!this.selectedSocial?.id) return;

    this.deleteSubmitting = true;

    this.socialService
      .deleteSocialMediaById(this.selectedSocial.id)
      .subscribe({

        next: () => {

          this.deleteModalInstance?.hide();

          this.deleteSubmitting = false;

          this.loadData();

        }

      });

  }


  /* ================= HELPERS ================= */

  getTypeLabel(type: string) {

    return this.socialTypes.find(
      t => t.value === type
    )?.label ?? type;

  }


  private emptyCreation(): SocialMediaCreation {

    return {

      name: '',

      link: '',

      description: '',

      socialMediaType: 'LINKEDIN'

    };

  }

}
