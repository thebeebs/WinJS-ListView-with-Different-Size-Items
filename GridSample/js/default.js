// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            WinJS.UI.processAll();

            //Not sure why but If I don't call proccess all with the specific DIV then
            // I get an undefined error. I suspect that it's a race condition
            WinJS.UI.processAll(document.getElementById("booksListView")).then(setTemplate);

            function setTemplate() {
                booksListView.winControl.itemTemplate = itemTemplateFunction;
            }



            
        }
    };

    function itemTemplateFunction(itemPromise) {
        return itemPromise.then(function (item) {
            // Select template based upon item data TODO: Handle data odities.
            var itemTemplate = document.getElementById( item.data.type + "Template");
  
            // Render selected template to DIV container
            var container = document.createElement("div");
            itemTemplate.winControl.render(item.data, container);
            return container;
        });
    }



    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
