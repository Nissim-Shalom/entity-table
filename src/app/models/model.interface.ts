export interface IEntityList {
    List: IEntityTable[]
}

export interface IEntityTable {
    Id: string,
    Name: string,
    Date: number,
}

export interface IEntity extends IEntityTable {
    Amount: number,
    Description: string,
    IsPrivate: boolean
}