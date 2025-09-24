import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';
import { EducationCardComponent } from '../cards/education-card.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, EducationCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      transition('void => *', [
        animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('staggerEducation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(200, [
            animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EducationComponent {
  private portfolioService = inject(PortfolioService);

  educationList = this.portfolioService.education;

  onTimelineImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-education.png'; // fallback image
  }
}