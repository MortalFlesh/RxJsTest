import {Observable} from "rx";

export default class Autocomplete {
    constructor(autocompleteId, jQuery) {
        this.autocompleteId = autocompleteId;
        this.jQuery = jQuery;
    }

    init() {
        /*
         * todo
         * - start subscribing on keyup
         * - onkeyup
         *      - clear options
         *      - delay 300ms between keyups
         *      - after delay fetch response
         *      - show response in ac-options
         */

        Observable.fromEvent(this.getInput(), 'keyup')
            .switchMap((keyup) => this.performRequest())
            .subscribe((response) => this.writeOptions(response));
    }

    getInput() {
        return this.jQuery('.ac-input', `#${this.autocompleteId}`);
    }

    performRequest() {
        return new Promise((resolve, reject) => {
            const timeout = Observable.interval(1000).take(1);

            timeout.subscribe((x) => resolve('response'));
        });
    }

    writeOptions(response) {
        this.jQuery('.ac-options', `#${this.autocompleteId}`)
            .empty()
            .html(response);
    }
}