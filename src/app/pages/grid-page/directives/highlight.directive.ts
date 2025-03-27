import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: "[highlight]",
    standalone: true
})
export class HighlightDirective {
    constructor(private element: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }

    @HostListener("mouseenter") 
    public onMouseEnter() {
        this.renderer.addClass(this.element.nativeElement, "highlighted");
    }
 
    @HostListener("mouseleave") 
    public onMouseLeave() {
        this.renderer.removeClass(this.element.nativeElement, "highlighted");
    }
}