// user-social-media.component.ts

import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SmartTableComponent} from "../components/smart-table/smart-table.component";
import {SocialMediaService} from "../user-profile/service/social-media.service";
import {SocialMedia, SocialMediaCreation} from "../models/SocialMedia";
import {SmartTableConfig} from "../components/models/smart-table";


declare var bootstrap: any;

@Component({
  selector: 'app-user-social-media',
  standalone: true,
  imports: [CommonModule, FormsModule, SmartTableComponent],
  templateUrl: './user-social-media.component.html',
  styleUrl: './user-social-media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSocialMediaComponent implements OnInit {

  private readonly socialService = inject(SocialMediaService);
  private readonly cdr = inject(ChangeDetectorRef);

  // ── State ──────────────────────────────────────────────
  loading = false;
  tableData: SocialMedia[] = [];

  // ── Pagination ─────────────────────────────────────────
  private currentPage = 0;
  private pageSize = 20; // fetch a larger batch; smart-table handles display pagination
  private userEmail: any = ''; // set from auth/session

  // ── Add modal ──────────────────────────────────────────
  newSocial: SocialMediaCreation = this.emptyCreation();
  linkError = '';
  addSubmitting = false;
  private addModalInstance: any = null;

  // ── Row action modal ────────────────────────────────────
  selectedSocial: SocialMedia | null = null;
  editBuffer: SocialMedia | null = null;
  isEditing = false;
  deleteConfirm = false;
  editSubmitting = false;
  deleteSubmitting = false;
  private rowModalInstance: any = null;

  // ── Social type options ────────────────────────────────
  readonly socialTypes = [
    { value: 'LINKEDIN',  label: '💼 LinkedIn'  },
    { value: 'TWITTER',   label: '🐦 Twitter / X' },
    { value: 'INSTAGRAM', label: '📸 Instagram' },
    { value: 'FACEBOOK',  label: '👤 Facebook'  },
    { value: 'GITHUB',    label: '🐙 GitHub'    },
    { value: 'YOUTUBE',   label: '▶️ YouTube'   },
    { value: 'TIKTOK',    label: '🎵 TikTok'    },
    { value: 'OTHER',     label: '🌐 Other'     },
  ];

  // ── SmartTable config ──────────────────────────────────
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
          LINKEDIN:  '💼',
          TWITTER:   '🐦',
          INSTAGRAM: '📸',
          FACEBOOK:  '👤',
          GITHUB:    '🐙',
          YOUTUBE:   '▶️',
          TIKTOK:    '🎵',
          OTHER:     '🌐',
        },
      },
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        sortable: true,
      },
      {
        key: 'link',
        label: 'Link',
        type: 'text',
        sortable: false,
      },
      {
        key: 'userName',
        label: 'Owner',
        type: 'text',
        sortable: true,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        sortable: false,
      },
    ],

    // We override with our own row-action modal, but keep this for compatibility
    modalFields: [],
    modalTitle: (row: any) => row.name,
  };

  // ──────────────────────────────────────────────────────
  ngOnInit() {
    this.userEmail = sessionStorage.getItem('email');
    this.loadData();
  }

  // ── Data loading ────────────────────────────────────────
  loadData() {
    this.loading = true;
    this.cdr.markForCheck();

    this.socialService.getAllSocialMedia(this.currentPage, this.pageSize, this.userEmail)
      .subscribe({
        next: (res) => {
          // Backend returns Page object; adjust to your actual response shape
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

  // ── SmartTable row-save callback (edit from smart-table modal) ─
  onRowSave(updated: SocialMedia) {
    if (!updated.id) return;
    this.socialService.updateSocialMediaById(updated.id, updated).subscribe({
      next: () => this.loadData(),
    });
  }

  // ── ADD ─────────────────────────────────────────────────
  openAddModal() {
    this.newSocial = this.emptyCreation();
    this.linkError = '';
    this.addSubmitting = false;
    setTimeout(() => {
      const el = document.getElementById('addSocialModal');
      if (el) {
        this.addModalInstance = new bootstrap.Modal(el);
        this.addModalInstance.show();
      }
    });
  }

  submitAdd() {
    if (!this.newSocial.link) return;
    this.addSubmitting = true;
    this.linkError = '';
    this.cdr.markForCheck();

    this.socialService.isLinkUsed(this.newSocial.link).subscribe({
      next: (used) => {
        if (used) {
          this.linkError = 'This link is already registered.';
          this.addSubmitting = false;
          this.cdr.markForCheck();
          return;
        }
        this.socialService.createSocialMedia(this.newSocial, this.userEmail).subscribe({
          next: () => {
            this.addModalInstance?.hide();
            this.addSubmitting = false;
            this.cdr.markForCheck();
            this.loadData();
          },
          error: () => {
            this.addSubmitting = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: () => {
        this.addSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  // ── ROW click → open action modal ──────────────────────
  // Called from smart-table's (rowSave) won't cover click unless we add
  // our own listener. Wire this from the parent via (rowClick) if you extend
  // SmartTableComponent, OR simply override openRow via config callback.
  // For now this is called from smart-table's rowSave output for the row modal.

  openRowModal(row: SocialMedia) {
    this.selectedSocial = row;
    this.editBuffer = { ...row };
    this.isEditing = false;
    this.deleteConfirm = false;
    this.editSubmitting = false;
    this.deleteSubmitting = false;
    this.cdr.markForCheck();

    setTimeout(() => {
      const el = document.getElementById('rowActionModal');
      if (el) {
        this.rowModalInstance = new bootstrap.Modal(el);
        this.rowModalInstance.show();
      }
    });
  }

  closeRowModal() {
    this.selectedSocial = null;
    this.isEditing = false;
    this.deleteConfirm = false;
  }

  // ── EDIT ────────────────────────────────────────────────
  startEdit() {
    this.editBuffer = { ...this.selectedSocial! };
    this.isEditing = true;
  }

  submitEdit() {
    if (!this.editBuffer?.id) return;
    this.editSubmitting = true;
    this.cdr.markForCheck();

    this.socialService.updateSocialMediaById(this.editBuffer.id, this.editBuffer).subscribe({
      next: () => {
        this.rowModalInstance?.hide();
        this.editSubmitting = false;
        this.isEditing = false;
        this.cdr.markForCheck();
        this.loadData();
      },
      error: () => {
        this.editSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  // ── DELETE ──────────────────────────────────────────────
  submitDelete() {
    if (!this.selectedSocial?.id) return;
    this.deleteSubmitting = true;
    this.cdr.markForCheck();

    this.socialService.deleteSocialMediaById(this.selectedSocial.id).subscribe({
      next: () => {
        this.rowModalInstance?.hide();
        this.deleteSubmitting = false;
        this.deleteConfirm = false;
        this.cdr.markForCheck();
        this.loadData();
      },
      error: () => {
        this.deleteSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  // ── Helpers ─────────────────────────────────────────────
  getTypeLabel(type: string): string {
    return this.socialTypes.find(t => t.value === type)?.label ?? type;
  }

  private emptyCreation(): SocialMediaCreation {
    return { name: '', link: '', description: '', socialMediaType: 'LINKEDIN' };
  }
}
