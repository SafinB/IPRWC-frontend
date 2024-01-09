export class Promocode{
    public id: string;
    public code: string;
    public active: boolean;
    public discount: number;

    constructor(id: string, code: string, active: boolean, discount: number) {
        this.id = id;
        this.code = code;
        this.active = active;
        this.discount = discount;
    }
}
