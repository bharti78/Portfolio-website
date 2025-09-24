import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
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
    trigger('inputFocus', [
      state('unfocused', style({
        transform: 'scale(1)',
        boxShadow: '0 0 0 0 rgba(133, 76, 230, 0)'
      })),
      state('focused', style({
        transform: 'scale(1.02)',
        boxShadow: '0 0 0 3px rgba(133, 76, 230, 0.1)'
      })),
      transition('unfocused => focused', [
        animate('200ms ease-out')
      ]),
      transition('focused => unfocused', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('submitButton', [
      state('idle', style({
        transform: 'scale(1)',
        background: 'linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%)'
      })),
      state('loading', style({
        transform: 'scale(0.98)',
        background: 'rgba(133, 76, 230, 0.7)'
      })),
      state('success', style({
        transform: 'scale(1.02)',
        background: 'linear-gradient(225deg, #22c55e 0%, #16a34a 100%)'
      })),
      state('error', style({
        transform: 'scale(1.02)',
        background: 'linear-gradient(225deg, #ef4444 0%, #dc2626 100%)'
      })),
      transition('* => *', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ])
    ])
  ]
})
export class ContactComponent {
  private portfolioService = inject(PortfolioService);
  private formBuilder = inject(FormBuilder);

  bio = this.portfolioService.bio;
  
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitState = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  focusedField = signal<string | null>(null);

  constructor() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFieldFocus(fieldName: string) {
    this.focusedField.set(fieldName);
  }

  onFieldBlur(fieldName: string) {
    this.focusedField.set(null);
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.submitState.set('loading');

      try {
        // Simulate form submission
        await this.submitContactForm(this.contactForm.value);
        
        this.submitState.set('success');
        this.contactForm.reset();
        
        // Reset state after showing success
        setTimeout(() => {
          this.submitState.set('idle');
          this.isSubmitting.set(false);
        }, 3000);
        
      } catch (error) {
        this.submitState.set('error');
        
        // Reset state after showing error
        setTimeout(() => {
          this.submitState.set('idle');
          this.isSubmitting.set(false);
        }, 3000);
      }
    }
  }

  private async submitContactForm(formData: any): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          resolve();
        } else {
          reject(new Error('Failed to send message'));
        }
      }, 2000);
    });
  }
}