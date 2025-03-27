import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

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
        this.renderer.setStyle(event.target, "background-color", "rgb(224, 224, 224)");
    }
 
    @HostListener("mouseout", ['$event']) 
    public onMouseLeave(event: MouseEvent) {
        event.stopPropagation();
        this.renderer.removeStyle(event.target, "background-color");
    }
}