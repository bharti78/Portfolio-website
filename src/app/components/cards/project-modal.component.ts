import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Project } from '../../models/portfolio.models';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css',
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
      transition('* => void', [
        animate('200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('backdropAnimation', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        animate('250ms ease-out')
      ]),
      transition('* => void', [
        animate('150ms ease-in')
      ])
    ])
  ]
})
export class ProjectModalComponent {
  @Input() project = signal<Project | null>(null);
  @Input() isOpen = signal(false);
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (this.isOpen()) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}