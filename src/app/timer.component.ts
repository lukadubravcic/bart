import { Component } from "@angular/core";

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})

export class TimerComponent {

    timerDays = 0;
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;    
        
    startTimerStopwatch(deadlineTime):void {        

        let stopwatchInterval = setInterval(() => {
            
            let now             = Date.now();
            let distance        = deadlineTime - now;

            let days            = (distance/(24*60*60*1000)); // transform miliseconds to days
            let hours           = this.transformDecimalDaysToHours(days);
            let minutes         = this.transformDecimalHoursToMinutes(hours)
            let seconds         = this.transformDecimalMinutesToSeconds(minutes);

            this.timerDays      = Math.floor(days);
            this.timerHours     = Math.floor(hours);
            this.timerMinutes   = Math.floor(minutes);
            this.timerSeconds   = Math.floor(seconds);

            if (distance < 0) {
                clearInterval(stopwatchInterval); 
                console.log('Countdown gotov!');               
            }
        },1000);
    }

    getDecimalNumber(num: number): number {

        let decimals: any = num - Math.floor(num);
        let decimalPlaces: any = num.toString().split('.')[1].length;
        decimals = decimals.toFixed(decimalPlaces);
        return parseFloat(decimals);
    }

    transformDecimalDaysToHours(days: number): number {
        let decimalDays = this.getDecimalNumber(days);
        return (decimalDays * 24); 
    }

    transformDecimalHoursToMinutes(hours: number): number {
        let decimalHours = this.getDecimalNumber(hours);
        return (decimalHours * 60); 
    }

    transformDecimalMinutesToSeconds(minutes: number): number {
        let decimalMinutes = this.getDecimalNumber(minutes);
        return (decimalMinutes * 60); 
    } 

}
