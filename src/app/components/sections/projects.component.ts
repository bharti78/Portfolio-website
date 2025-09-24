import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectCardComponent } from '../cards/project-card.component';
import { ProjectModalComponent } from '../cards/project-modal.component';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
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
    trigger('staggerProjects', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(150, [
            animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent {
  private portfolioService = inject(PortfolioService);

  allProjects = this.portfolioService.projects;
  selectedProject = signal<Project | null>(null);
  isModalOpen = signal(false);

  openProjectModal(project: Project) {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
  }

  closeProjectModal() {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.selectedProject.set(null);
    }, 300);
  }
}