( function() {
  'use strict'
  angular.module( 'app' )
    .component( 'adList', {
      templateUrl: 'js/classifieds/ad-list.template.html',
      controller: controller

    } )
  controller.$inject = [ '$state', 'classifiedsService' ]

  function controller( $state, classifiedsService ) {
    const vm = this

    vm.$onInit = onInit
    vm.ads = classifiedsService.ads
    vm.deleteAd = deleteAd
    vm.editAd = editAd

    function onInit() {
      classifiedsService.getAllAds()
        .then( ads => {
          vm.ads = ads
        } )
    }

    function deleteAd( e, ad ) {
      e.preventDefault()
      const id = ad.id
      classifiedsService.deleteAd( id ).then( adResponse => {
        return vm.ads = adResponse
      } )
    }

    function editAd( e, ad ) {
      e.preventDefault()
      const id = ad.id
      $state.go( 'editAd', {
        id: id
      } )

    }



  }
} )()
