import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      transition('void => *', [
        animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('fadeInLeft', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-30px)'
      })),
      transition('void => *', [
        animate('800ms 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('fadeInRight', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(30px)'
      })),
      transition('void => *', [
        animate('800ms 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('typewriter', [
      transition('* => *', [
        animate('2s', keyframes([
          style({ width: '0', offset: 0 }),
          style({ width: '100%', offset: 1 })
        ]))
      ])
    ]),
    // Removed float animation - now handled by CSS for better performance
  ]
})
export class HeroComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  bio = this.portfolioService.bio;
  heroImage = 'assets/images/HeroImage1.png';
  localResumeUrl = 'assets/docs/Resume_Bharti.pdf';

  currentRoleIndex = signal(0);
  displayedText = signal('');
  isTyping = signal(false);
  isDeleting = signal(false);
  showCursor = signal(true);

  private typeSpeed = 120; // milliseconds per character when typing (slightly slower for readability)
  private deleteSpeed = 60; // milliseconds per character when deleting
  private pauseBeforeDelete = 2500; // pause before starting to delete (longer to read)
  private pauseBeforeNext = 800; // pause before typing next role

  ngOnInit() {
    this.startTypewriterEffect();
    this.startCursorBlink();
  }

  private startCursorBlink() {
    setInterval(() => {
      this.showCursor.update(visible => !visible);
    }, 530); // Standard cursor blink rate
  }

  private async startTypewriterEffect() {
    const roles = this.bio().roles;
    let currentIndex = 0;

    while (true) {
      const currentRole = roles[currentIndex];

      // Type the current role
      await this.typeText(currentRole);

      // Pause before deleting
      await this.delay(this.pauseBeforeDelete);

      // Delete the current role
      await this.deleteText();

      await this.delay(this.pauseBeforeNext);

      currentIndex = (currentIndex + 1) % roles.length;
      this.currentRoleIndex.set(currentIndex);
    }
  }

  private async typeText(text: string): Promise<void> {
    this.isTyping.set(true);
    this.isDeleting.set(false);

    for (let i = 0; i <= text.length; i++) {
      this.displayedText.set(text.substring(0, i));
      await this.delay(this.typeSpeed);
    }

    this.isTyping.set(false);
  }

  private async deleteText(): Promise<void> {
    this.isDeleting.set(true);
    const currentText = this.displayedText();

    for (let i = currentText.length; i >= 0; i--) {
      this.displayedText.set(currentText.substring(0, i));
      await this.delay(this.deleteSpeed);
    }

    this.isDeleting.set(false);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
