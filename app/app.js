import Vue from "nativescript-vue";

import Home from "./components/Home";

Vue.config.errorHandler = function (err, vm, info) {
    console.log('Global Error Handler');
    console.log(err);
}

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();

