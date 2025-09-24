import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Experience } from '../../models/portfolio.models';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
  animations: [
    trigger('cardHover', [
      state('default', style({
        transform: 'translateY(0px)',
        boxShadow: 'rgba(23, 92, 230, 0.15) 0px 4px 24px'
      })),
      state('hovered', style({
        transform: 'translateY(-5px)',
        boxShadow: 'rgba(23, 92, 230, 0.25) 0px 8px 32px'
      })),
      transition('default <=> hovered', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ])
  ]
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() index: number = 0;

  hoverState = 'default';

  @HostBinding('style.animation-delay') 
  get animationDelay() {
    return `${this.index * 150}ms`;
  }

  onHover(isHovered: boolean) {
    this.hoverState = isHovered ? 'hovered' : 'default';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    // Fallback to a default company icon
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzg1NGNlNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgN1YzSDJWMjFIMjJWN0gxMlpNNiA5SDE4VjE5SDZWOVoiLz48L3N2Zz4=';
  }
}