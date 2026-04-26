import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SoundtrackServicesService} from "../service/soundtrack-services.service";

@Component({
  selector: 'app-add-soundtrack',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-soundtrack.component.html',
  styleUrl: './add-soundtrack.component.scss'
})
export class AddSoundtrackComponent {

  private soundtrackService = inject(SoundtrackServicesService);

  email = localStorage.getItem('email')!;


  step = signal(1);

  steps = [
    'Type',
    'Link',
    'Metadata',
    'Review'
  ];

  animationDirection = signal<'forward' | 'backward'>('forward');

  selectedType = signal<'SPOTIFY' | 'YOUTUBE' | null>(null);

  title = signal('');

  author = signal('');

  link = signal('');



  /* -----------------------------
     STEP NAVIGATION
  ----------------------------- */

  nextStep() {

    if (!this.canProceed()) return;

    if (this.step() < this.steps.length) {

      this.animationDirection.set('forward');

      this.step.update(v => v + 1);

    }

  }


  prevStep() {

    if (this.step() > 1) {

      this.animationDirection.set('backward');

      this.step.update(v => v - 1);

    }

  }



  /* -----------------------------
     TYPE SELECTION
  ----------------------------- */

  selectType(type: 'SPOTIFY' | 'YOUTUBE') {

    this.selectedType.set(type);

  }



  /* -----------------------------
     LINK INPUT
  ----------------------------- */

  onLinkInput(value: string) {

    this.link.set(value);

  }



  isValidLink(): boolean {

    const value = this.link().trim();

    if (!value) return false;


    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;


    const spotifyRegex =
      /^(https?:\/\/)?(open\.)?spotify\.com\/.+$/;


    if (this.selectedType() === 'YOUTUBE') {

      return youtubeRegex.test(value);

    }


    if (this.selectedType() === 'SPOTIFY') {

      return spotifyRegex.test(value);

    }


    return false;

  }



  /* -----------------------------
     METADATA INPUT
  ----------------------------- */

  onTitleInput(value: string) {

    this.title.set(value);

  }


  onAuthorInput(value: string) {

    this.author.set(value);

  }


  isValidMetadata(): boolean {

    return this.title().trim().length > 0
      && this.author().trim().length > 0;

  }



  /* -----------------------------
     STEP VALIDATION
  ----------------------------- */

  canProceed(): boolean {

    switch (this.step()) {

      case 1:
        return this.selectedType() !== null;

      case 2:
        return this.isValidLink();

      case 3:
        return this.isValidMetadata();

      default:
        return true;

    }

  }



  /* -----------------------------
     FINAL SUBMIT
  ----------------------------- */

  submitSoundtrack() {

    if (!this.canProceed()) return;

    const payload = {

      type: this.selectedType(),

      link: this.link(),

      title: this.title(),

      author: this.author()

    };


    this.soundtrackService
      .createSoundtrack(this.email, payload)
      .subscribe({

        next: () => {

          console.log("Soundtrack created successfully");

          this.resetWizard();

        },

        error: err => {

          console.error("Creation failed:", err);

        }

      });

  }



  /* -----------------------------
     RESET WIZARD
  ----------------------------- */

  resetWizard() {

    this.step.set(1);

    this.selectedType.set(null);

    this.title.set('');

    this.author.set('');

    this.link.set('');

  }

}
