import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Project } from '../../models/portfolio.models';
import { TooltipDirective } from '../directives/tooltip.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TooltipDirective, TruncatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  animations: [
    trigger('cardHover', [
      state('default', style({
        transform: 'translateY(0px) scale(1)',
        boxShadow: 'rgba(23, 92, 230, 0.15) 0px 4px 24px'
      })),
      state('hovered', style({
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: 'rgba(23, 92, 230, 0.35) 0px 12px 40px'
      })),
      transition('default <=> hovered', [
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('imageHover', [
      state('default', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)'
      })),
      transition('default <=> hovered', [
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ])
  ]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input() index: number = 0;
  @Output() cardClick = new EventEmitter<Project>();

  hoverState = 'default';

  @HostBinding('style.animation-delay')
  get animationDelay() {
    return `${this.index * 150}ms`;
  }

  onHover(isHovered: boolean) {
    this.hoverState = isHovered ? 'hovered' : 'default';
  }

  onCardClick() {
    this.cardClick.emit(this.project);
  }

  openProject(event: Event) {
    event.stopPropagation();
    if (this.project.webapp) {
      window.open(this.project.webapp, '_blank');
    }
  }

  openGithub(event: Event) {
    event.stopPropagation();
    if (this.project.github) {
      window.open(this.project.github, '_blank');
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/p14.png';
  }
}