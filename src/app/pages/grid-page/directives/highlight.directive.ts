import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: "[highlight]",
    standalone: true
})
export class HighlightDirective {
    constructor(private element: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }

    @HostListener("mouseover", ['$event']) 
    public onMouseEnter(event: MouseEvent) {
        event.stopPropagation();
        this.renderer.addClass(event.target, "highlighted");
    }
 
    @HostListener("mouseout", ['$event']) 
    public onMouseLeave(event: MouseEvent) {
        event.stopPropagation();
        this.renderer.removeClass(event.target, "highlighted");
    }
}