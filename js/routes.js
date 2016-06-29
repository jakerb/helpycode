

        app.config(function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise("/all");
          //
          // Now set up the states
          $stateProvider
            .state('all', {
              url: "/all",
              templateUrl: "theme/partials/posts.html"
            })
            .state('post', {
              url: "/:post",
              templateUrl: "theme/partials/post.html"
            })
        });