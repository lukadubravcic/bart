"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BoardComponent = (function () {
    function BoardComponent() {
        this.currentProgressStatus = 0; //%
        this.disabledDrawingBoard = true;
        this.startingSentence = "";
        this.punishment = "Suvisla rečenica.";
    }
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
    return BoardComponent;
}());
BoardComponent = __decorate([
    core_1.Component({
        selector: 'my-board',
        template: "\n        <div>  \n        <textarea id=\"drawing-board\" [disabled]=\"disabledDrawingBoard\"\n        rows=\"20\" cols=\"100\">{{ startingSentence }}</textarea>\n        <div id=\"progress-sponge\">\n            <label>{{currentProgressStatus}}</label>\n        </div>\n        </div>\n        ",
        styleUrls: ['./board.component.css']
    })
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map