import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CcidProvider {

  constructor(public http: Http) {
    console.log('Hello CcidProvider Provider');
  }

  //api endpoint = http://api.afb.my/priv/v1/semakmule/1/7063464168

  getDetail(args) {
    return this.http.get('http://api.afb.my/priv/v1/semakmule/1/' + args)
      .map(res => res.json().data);
  }

}
