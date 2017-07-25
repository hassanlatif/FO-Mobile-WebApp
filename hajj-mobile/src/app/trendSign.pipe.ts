

import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'trendSign'
})
export class TrendSignPipe implements PipeTransform {

    transform(number: any) {
        
        if (number > 0) {
			return "(+" + number + ")";
		}
		else if (number < 0) {
			return "(" + number + ")";
		}
		else {
			return "";
		}

    }

}