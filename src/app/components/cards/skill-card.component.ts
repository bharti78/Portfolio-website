import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SkillCategory } from '../../models/portfolio.models';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css',
  animations: [
    trigger('hover', [
      state('default', style({
        transform: 'scale(1)',
        boxShadow: 'rgba(23, 92, 230, 0.15) 0px 4px 24px'
      })),
      state('hovered', style({
        transform: 'scale(1.02)',
        boxShadow: 'rgba(23, 92, 230, 0.25) 0px 8px 32px'
      })),
      transition('default <=> hovered', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ])
  ]
})
export class SkillCardComponent {
  @Input({ required: true }) skillCategory!: SkillCategory;
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
    // Fallback to a default tech icon or hide the image
    img.style.display = 'none';
  }
}