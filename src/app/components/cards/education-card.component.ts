import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Education } from '../../models/portfolio.models';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.css',
  animations: [
    trigger('cardHover', [
      state('idle', style({
        transform: 'scale(1) translateY(0)',
        boxShadow: '0 4px 15px rgba(133, 76, 230, 0.15)'
      })),
      state('hover', style({
        transform: 'scale(1.02) translateY(-4px)',
        boxShadow: '0 12px 30px rgba(133, 76, 230, 0.3)'
      })),
      transition('idle <=> hover', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ])
  ]
})
export class EducationCardComponent {
  @Input({ required: true }) education!: Education;
  @Input() index?: number;

  hoverState = signal<'idle' | 'hover'>('idle');

  onHover(isHovered: boolean) {
    this.hoverState.set(isHovered ? 'hover' : 'idle');
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-education.png'; // fallback image
  }
}