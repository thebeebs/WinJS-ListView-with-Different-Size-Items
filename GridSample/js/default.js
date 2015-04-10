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

            var booksList = new WinJS.Binding.List([{
                name: 'a',
                type: 'landscape'
            }, {
                name: 'c',
                type: 'square'
            }, {
                name: 'b',
                type: 'portrait'
            }, {
                name: 'b',
                type: 'portrait'
            }, {
                name: 'c',
                type: 'square'
            }, {
                name: 'b',
                type: 'portrait'
            }, {
                name: 'c',
                type: 'square'
            }, {
                name: 'c',
                type: 'square'
            }, {
                name: 'c',
                type: 'square'
            }]);

            var groupInfo = WinJS.Utilities.markSupportedForProcessing(function groupInfo() {
                return {
                    enableCellSpanning: true,
                    cellWidth: 40,
                    cellHeight: 190
                };
            });

            var itemInfo = WinJS.Utilities.markSupportedForProcessing(function itemInfo(itemIndex) {
                var size = { width: 140, height: 190 };

                // Get the item from the data source
                var item = booksList.getAt(itemIndex);
                if (item) {

                    // Get the size based on the item type
                    switch (item.type) {
                        case "landscape":
                            size = { width: 290, height: 190 };
                            break;

                        case "square":
                            size = { width: 190, height: 190 };
                            break;

                        case "portrait":
                            size = { width: 140, height: 190 };
                            break;

                        default:
                    }
                }
                return size;
            });



            // Expose the List object to the rest of the app.
            WinJS.Namespace.define("BC.HomeScreenData", {
                books: booksList,
                groupInfo: groupInfo,
                itemInfo: itemInfo
            });

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
