import { Component, OnInit, ViewChild} from "@angular/core";
import { TimerComponent } from "./timer.component";

@Component({
    selector: 'my-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit{

    @ViewChild(TimerComponent) timer;
                 
    currentProgressStatus = 0; //%
    disabledDrawingBoard: boolean = true;
    startingSentence: string = "";
    punishment: string = "Suvisla rečenica.";
    timerClicked: boolean = false; //ogranici event na jedan klik

    // nacin za konstantnu provjeru unosenja teksta, slovo po slovo, ukljucujuci i razmake, 
    // ignoriraju se samo razmaci poslije točke, u smislu da je dopušten proizvoljan broj 
    // razmaka do prvog slova nove rečenice.

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

    boardClick(): void {
        console.log('click');
        
        this.timer.startTimerStopwatch(1501260300000);
        this.timerClicked = true;   
    }

}    




