(function () {
    "use strict";
    var auth = Windows.Security.Authentication.Web;
    var id = "432989090211833";
    var redirect = "https://www.facebook.com/connect/login_success.html";
    var response = "token";
    var scope = "email,user_birthday";
    function login() {

        var url =
            "https://www.facebook.com/dialog/oauth?client_id=" + id
                + "&redirect_uri=" + redirect + "&scope=" + scope +
                "&response_type=" + response;
        var uri = new Windows.Foundation.Uri(url);
        var ruri = new Windows.Foundation.Uri(redirect);
        auth.WebAuthenticationBroker.
            authenticateAsync(auth.WebAuthenticationOptions.none, uri,ruri).done(
            function(resp) {
                var datos = resp.responseData;

                var d = datos.split("#");

                var d2 = d[1].split("&");

                var d3 = d2[0].split("=");

                var d4 = d3[1];

                var url = "https://graph.facebook.com/me?access_token=" + d4;
                WinJS.xhr({url:url,type:"get"}).done(function(res) {

                    var aa = res;

                });

            },
            function(err) {
                var e = err;
            }
        );


    }


    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            document.getElementById("btnLogin").addEventListener("click",
                login);
        }
    });
})();
