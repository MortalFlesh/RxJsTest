import {Observable} from "rx";

export default class Autocomplete {
    constructor(autocompleteId, jQuery) {
        this.autocompleteId = autocompleteId;
        this.jQuery = jQuery;
    }

    init() {
        /*
         * todo
         * - (done) start subscribing on keyup
         * - onkeyup
         *      - (done) clear options
         *      - delay 300ms between keyups
         *      - after delay fetch response
         *      - show response in ac-options
         */

        Observable.fromEvent(this.getInput(), 'keyup')
            .switchMap((keyup) => this.keyupHandler())
            .subscribe((response) => this.writeOptions(response));
    }

    /** @private */
    getInput() {
        return this.jQuery('.ac-input', `#${this.autocompleteId}`);
    }

    /** @private */
    keyupHandler() {
        this.clearOptions();

        return this.performRequest();
    }

    /** @private */
    clearOptions() {
        return this.jQuery('.ac-options', `#${this.autocompleteId}`)
            .empty();
    }

    /** @private */
    performRequest() {
        return new Promise((resolve, reject) => {
            const timeout = Observable.interval(1000).take(1);

            timeout.subscribe((x) => resolve('response'));
        });
    }

    /** @private */
    writeOptions(response) {
        this.clearOptions().html(response);
    }
}