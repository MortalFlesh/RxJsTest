import {Observable} from "rx";

export default class Autocomplete {
    constructor(autocompleteId, jQuery) {
        this.autocompleteId = autocompleteId;
        this.jQuery = jQuery;
    }

    init() {
        /*
         * - start subscribing on keyup
         * - onkeyup
         *      - clear options
         *      - delay 300ms between keyups
         *      - after delay fetch response
         *      - show response in ac-options
         *
         * --+--+--+--+--+-----------------------------------------> t
         *   \  \  \  \  \
         *    -- -- -- -- --fetch
         *                      \
         *                       -response
         *                              \
         *                               -show
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
        const value = this.getInput().val();

        return Observable.interval(300).take(1)
            .switchMap((tick) => this.performRequest(value));
    }

    /** @private */
    clearOptions() {
        return this.jQuery('.ac-options', `#${this.autocompleteId}`)
            .empty();
    }

    /** @private */
    performRequest(value) {
        console.log(`request (${value})->`);

        return fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then(({email}) => {
                console.log(`->response(${value}): `, email);

                return email;
            });
    }

    /** @private */
    performRequestLocal(value) {
        console.log(`request (${value})->`);

        return new Promise((resolve, reject) => {
            const period = this.random(600, 1000);
            const timeout = Observable.interval(period).take(1);

            timeout.subscribe((x) => {
                console.log(`->response(${value}) [${period} ms]`);

                resolve(`response (${value})`);
            });
        });
    }

    /** @private */
    random(minValue, maxValue) {
        return minValue + Math.floor((Math.random() * (maxValue - minValue)) + 1);
    }

    /** @private */
    writeOptions(response) {
        this.clearOptions().html(response);
    }
}
