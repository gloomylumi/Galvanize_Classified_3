( function() {
  'use strict'
  angular.module( 'app' )
    .component( 'adForm', {
      templateUrl: 'js/classifieds/ad-form.template.html',
      controller: controller
    } )

  controller.$inject = [ '$state', 'classifiedsService' ]

  function controller( $state, classifiedsService ) {
    const vm = this

    vm.$onInit = onInit
    vm.submitForm = submitForm
    vm.adForm = {}

    function onInit() {
      if ( $state.$current.name === 'editAd' ) {
        console.log( $state );
        const id = $state.params.id
        classifiedsService.getAd( id ).then( ( ad ) => {
          vm.adForm.title = ad.title
          vm.adForm.description = ad.description
          vm.adForm.price = ad.price
          vm.adForm.item_image = ad.item_image
        } )
      }
    }

    function submitForm() {
      const ad = {
        title: vm.adForm.title,
        description: vm.adForm.description,
        price: vm.adForm.price,
        item_image: vm.adForm.item_image,
      }
      if ( $state.$current.name === 'adList.newAd' ) {
        classifiedsService.newAd( ad )
      } else {
        const id = $state.params.id
        classifiedsService.updateAd( id, ad )
      }
    }

  }

} )()
