import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor: string = 'red';
  @Input() highlightColor: string = 'white';

  // @HostBinding('style.Color') color: string = 'red';
  // @HostBinding('style.Color') color: string = this.defaultColor;
  @HostBinding('style.Color') color: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.color = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.color = this.defaultColor;
  }

} 
