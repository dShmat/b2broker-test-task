import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPreparationService {

  public extractIdsFromString(stringIds: string) {
    return stringIds.trim().split(/[,.\-=/_ ]/).filter(i => i)
  }
}
