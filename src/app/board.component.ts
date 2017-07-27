import { Component, OnInit} from "@angular/core";

@Component({
    selector: 'my-board',
    template: `
        <div>  
        <textarea id="drawing-board" [disabled]="disabledDrawingBoard"
        rows="20" cols="100">{{ startingSentence }}</textarea>
        <div id="progress-sponge">
            <label>{{currentProgressStatus}}</label>
        </div>
        </div>
        `,
    styleUrls: ['./board.component.css']
})

export class BoardComponent {

    currentProgressStatus = 0; //%
    disabledDrawingBoard: boolean = true;
    startingSentence: string = "";
    punishment: string = "Suvisla rečenica.";

    //auto-write jedne recenice kazne
    writeStartingSentance(): void {
        
        function ghost(that) {
            (function write(i) {
                if(that.punishment.length <= i) {
                    return;
                }
                
                that.startingSentence += that.punishment[i];
                i++;
                that.currentProgressStatus++;

                setTimeout(() => {
                    write(i);
                }, Math.floor(Math.random() * 150)+30);
            })(0)
            
            that.disabledDrawingBoard = false;
        }

        ghost(this);
                      
    }  

    ngOnInit(): void {
        this.writeStartingSentance();        
    } 

}    




