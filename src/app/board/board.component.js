"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timer_component_1 = require("./timer.component");
var BoardComponent = (function () {
    function BoardComponent() {
        this.currentProgressStatus = 0; //%
        this.disabledDrawingBoard = true;
        this.startingSentence = "";
        this.punishment = "Suvisla rečenica.";
        this.timerClicked = false; //ogranici event na jedan klik
    }
    // nacin za konstantnu provjeru unosenja teksta, slovo po slovo, ukljucujuci i razmake, 
    // ignoriraju se samo razmaci poslije točke, u smislu da je dopušten proizvoljan broj 
    // razmaka do prvog slova nove rečenice.
    //auto-write jedne recenice kazne
    BoardComponent.prototype.writeStartingSentance = function () {
        function ghost(that) {
            (function write(i) {
                if (that.punishment.length <= i) {
                    return;
                }
                that.startingSentence += that.punishment[i];
                i++;
                that.currentProgressStatus++;
                setTimeout(function () {
                    write(i);
                }, Math.floor(Math.random() * 150) + 30);
            })(0);
            that.disabledDrawingBoard = false;
        }
        ghost(this);
    };
    BoardComponent.prototype.ngOnInit = function () {
        this.writeStartingSentance();
    };
    BoardComponent.prototype.boardClick = function () {
        console.log('click');
        this.timer.startTimerStopwatch(1501260300000);
        this.timerClicked = true;
    };
    return BoardComponent;
}());
__decorate([
    core_1.ViewChild(timer_component_1.TimerComponent),
    __metadata("design:type", Object)
], BoardComponent.prototype, "timer", void 0);
BoardComponent = __decorate([
    core_1.Component({
        selector: 'my-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map