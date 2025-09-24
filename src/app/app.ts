import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeroComponent } from './components/sections/hero.component';
import { SkillsComponent } from './components/sections/skills.component';
import { ExperienceComponent } from './components/sections/experience.component';
import { EducationComponent } from './components/sections/education.component';
import { ProjectsComponent } from './components/sections/projects.component';
import { ContactComponent } from './components/sections/contact.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, HeroComponent, SkillsComponent, ExperienceComponent, EducationComponent, ProjectsComponent, ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <div class="main-sections">
        <app-hero></app-hero>
        
        <div class="wrapper gradient-bg">
          <app-skills></app-skills>
          <app-experience></app-experience>
        </div>
        
        <app-projects></app-projects>
        
        <div class="wrapper gradient-bg">
          <app-education></app-education>
          <app-contact></app-contact>
        </div>
      </div>
    </app-layout>
  `,
  styles: [`
    .main-sections {
      width: 100%;
      position: relative;
    }

    .wrapper {
      padding-bottom: 100px;
      width: 100%;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
    }

    .loading-placeholder,
    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
      color: var(--text-secondary);
      font-style: italic;
    }

    .loading-placeholder {
      background: rgba(133, 76, 230, 0.1);
      border-radius: 8px;
      margin: 20px;
    }
  `]
})
export class App {
  protected readonly title = signal('angular-portfolio');
}
