"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TimerComponent = (function () {
    function TimerComponent() {
        this.timerDays = 0;
        this.timerHours = 0;
        this.timerMinutes = 0;
        this.timerSeconds = 0;
    }
    TimerComponent.prototype.startTimerStopwatch = function (deadlineTime) {
        var _this = this;
        var stopwatchInterval = setInterval(function () {
            var now = Date.now();
            var distance = deadlineTime - now;
            var days = (distance / (24 * 60 * 60 * 1000)); // transform miliseconds to days
            var hours = _this.transformDecimalDaysToHours(days);
            var minutes = _this.transformDecimalHoursToMinutes(hours);
            var seconds = _this.transformDecimalMinutesToSeconds(minutes);
            _this.timerDays = Math.floor(days);
            _this.timerHours = Math.floor(hours);
            _this.timerMinutes = Math.floor(minutes);
            _this.timerSeconds = Math.floor(seconds);
            if (distance < 0) {
                clearInterval(stopwatchInterval);
                console.log('Countdown gotov!');
            }
        }, 1000);
    };
    TimerComponent.prototype.getDecimalNumber = function (num) {
        var decimals = num - Math.floor(num);
        var decimalPlaces = num.toString().split('.')[1].length;
        decimals = decimals.toFixed(decimalPlaces);
        return parseFloat(decimals);
    };
    TimerComponent.prototype.transformDecimalDaysToHours = function (days) {
        var decimalDays = this.getDecimalNumber(days);
        return (decimalDays * 24);
    };
    TimerComponent.prototype.transformDecimalHoursToMinutes = function (hours) {
        var decimalHours = this.getDecimalNumber(hours);
        return (decimalHours * 60);
    };
    TimerComponent.prototype.transformDecimalMinutesToSeconds = function (minutes) {
        var decimalMinutes = this.getDecimalNumber(minutes);
        return (decimalMinutes * 60);
    };
    return TimerComponent;
}());
TimerComponent = __decorate([
    core_1.Component({
        selector: 'timer',
        templateUrl: './timer.component.html',
        styleUrls: ['./timer.component.css']
    })
], TimerComponent);
exports.TimerComponent = TimerComponent;
//# sourceMappingURL=timer.component.js.map