( function() {
  'use strict';

  angular.module( 'app' ).config( config );

  config.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

  function config( $stateProvider, $urlRouterProvider, $locationProvider ) {


    $locationProvider.html5Mode( true )

    $stateProvider
      .state( 'adList', {
        url: '/',
        component: 'adList'
      } )
      .state( {
        name: 'editAd',
        url: '/:id/edit',
        component: 'adForm'
      } )
      .state( {
        name: 'adList.newAd',
        url: '/new-ad',
        component: 'adForm'
      } )
  }

}() );
