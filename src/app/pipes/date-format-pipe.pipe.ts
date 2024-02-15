import { Pipe, PipeTransform } from '@angular/core';
import { ReleaseDate } from '../../types/movie';

@Pipe({
  name: 'dateFormatPipe',
  standalone: true
})
export class DateFormatPipePipe implements PipeTransform {

  transform(value: ReleaseDate, ...args: unknown[]): unknown {
    if(value){
      return `${value.month}/${value.day}/${value.year}`
    }
    else {
      return false;
    }
  }

}
