import { Component, inject, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-quick-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quick-nav.component.html',
  styleUrl: './quick-nav.component.css',
  animations: [
    trigger('slideIn', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('hidden => visible', [
        animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
      transition('visible => hidden', [
        animate('0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ]),
    trigger('linkHover', [
      state('idle', style({
        transform: 'scale(1) translateX(0)',
        backgroundColor: 'rgba(17, 25, 40, 0.8)'
      })),
      state('hover', style({
        transform: 'scale(1.1) translateX(-8px)',
        backgroundColor: 'rgba(133, 76, 230, 0.2)'
      })),
      transition('idle <=> hover', [
        animate('0.3s cubic-bezier(0.34, 1.56, 0.64, 1)')
      ])
    ])
  ]
})
export class QuickNavComponent {
  private portfolioService = inject(PortfolioService);

  bio = this.portfolioService.bio;
  isVisible = signal(true);
  
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bhartidhote/',
      icon: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z',
      color: '#0077B5',
      hoverState: signal<'idle' | 'hover'>('idle')
    },
    {
      name: 'GitHub',
      url: 'https://github.com/bharti78/',
      icon: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z',
      color: '#333333',
      hoverState: signal<'idle' | 'hover'>('idle')
    },
    {
      name: 'Mail',
      url: 'mailto:bhartidhote8@gmail.com',
      icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
      color: '#EA4335',
      hoverState: signal<'idle' | 'hover'>('idle')
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/BHARTIDHOT71091',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      color: '#1DA1F2',
      hoverState: signal<'idle' | 'hover'>('idle')
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sereneskies19/',
      icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541zm7.518 0c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541z',
      color: '#E4405F',
      hoverState: signal<'idle' | 'hover'>('idle')
    }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Show/hide based on scroll position - show after scrolling 100px
    this.isVisible.set(scrollTop > 100);
  }

  onLinkHover(link: any, isHovered: boolean) {
    link.hoverState.set(isHovered ? 'hover' : 'idle');
  }

  openLink(url: string, event: Event) {
    event.preventDefault();
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
