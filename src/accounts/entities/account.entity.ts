export class Account {
    public balance: number;

    constructor(public id: string) {
        this.balance = 0;
    }

    increaseBalance(amount: number) {
        this.balance += amount;
    }

    decreaseBalance(amount: number) {
        this.balance -= amount;
    }
}