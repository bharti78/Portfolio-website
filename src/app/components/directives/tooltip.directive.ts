import { Directive, ElementRef, HostListener, Input, Renderer2, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private tooltip: HTMLElement | null = null;

  @Input('appTooltip') tooltipText: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltipText) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.setProperty(this.tooltip, 'textContent', this.tooltipText);
    
    // Style the tooltip
    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(this.tooltip, 'background', 'rgba(0, 0, 0, 0.8)');
    this.renderer.setStyle(this.tooltip, 'color', 'white');
    this.renderer.setStyle(this.tooltip, 'padding', '8px 12px');
    this.renderer.setStyle(this.tooltip, 'border-radius', '6px');
    this.renderer.setStyle(this.tooltip, 'font-size', '14px');
    this.renderer.setStyle(this.tooltip, 'z-index', '1000');
    this.renderer.setStyle(this.tooltip, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltip, 'pointer-events', 'none');
    this.renderer.setStyle(this.tooltip, 'opacity', '0');
    this.renderer.setStyle(this.tooltip, 'transition', 'opacity 0.3s ease');

    // Position the tooltip
    const rect = this.el.nativeElement.getBoundingClientRect();
    const tooltipHeight = 40; // approximate height
    const tooltipWidth = this.tooltipText.length * 8; // approximate width

    switch (this.tooltipPosition) {
      case 'top':
        this.renderer.setStyle(this.tooltip, 'top', `${rect.top - tooltipHeight - 5}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${rect.left + rect.width / 2 - tooltipWidth / 2}px`);
        break;
      case 'bottom':
        this.renderer.setStyle(this.tooltip, 'top', `${rect.bottom + 5}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${rect.left + rect.width / 2 - tooltipWidth / 2}px`);
        break;
      case 'left':
        this.renderer.setStyle(this.tooltip, 'top', `${rect.top + rect.height / 2 - tooltipHeight / 2}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${rect.left - tooltipWidth - 5}px`);
        break;
      case 'right':
        this.renderer.setStyle(this.tooltip, 'top', `${rect.top + rect.height / 2 - tooltipHeight / 2}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${rect.right + 5}px`);
        break;
    }

    this.renderer.appendChild(document.body, this.tooltip);
    
    // Fade in animation
    setTimeout(() => {
      if (this.tooltip) {
        this.renderer.setStyle(this.tooltip, 'opacity', '1');
      }
    }, 0);
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

  ngOnDestroy() {
    this.hideTooltip();
  }
}
