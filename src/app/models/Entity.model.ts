import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../app.module";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { IEntity, IEntityList } from "./model.interface";

//Model for http requests to the server
@Injectable()
export class Entity {

    constructor(private http: HttpClient, @Inject(API) private api: string) { }

    //get list of all entities
    public getEntities(): Observable<IEntityList> {
        return this.http.get(`${this.api}/Entity`).pipe(
            map((p: IEntityList) => p)
        );
    }

    //get spesipic entity by id
    public getEntity(id: string): Observable<IEntity> {
        return this.http.get(`${this.api}/Entity`, { params: { Id: id } }).pipe(
            map((p: IEntity) => p)
        );
    }

    //update entity details or create one
    public updateEntity(entity: IEntity): Observable<any> {
        return this.http.post(`${this.api}/Entity`, entity);
    }

    //remove entity from db
    public removeEntity(id: string): Observable<void> {
        return this.http.delete(`${this.api}/Entity`, { params: { Id: id } }).pipe(
            map(() => { })
        );
    }
}