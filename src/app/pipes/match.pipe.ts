import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'match',
  pure: false
})
export class MatchPipe implements PipeTransform {
  transform(array: Array<any>, matcher: string, filterOn: string): Array<any> {
    try {
      return array.filter(e => e[filterOn].match(new RegExp(matcher, 'i')));
    } catch (e) {
      return [];
    }
  }
}
