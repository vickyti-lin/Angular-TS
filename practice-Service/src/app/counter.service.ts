export class CounterService {
    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    incremenActiveToInactive() {
        this.activeToInactiveCounter++;
        console.log('This is activeToInactive: ' + this.activeToInactiveCounter);
    }

    incremenInActiveToActive() {
        this.inactiveToActiveCounter++;
        console.log('This is inactiveToActive: ' + this.inactiveToActiveCounter);
    }
}