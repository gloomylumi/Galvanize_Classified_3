( function() {
  'use strict'
  angular.module( 'app' )
    .service( 'classifiedsService', classifiedsService )

  classifiedsService.$inject = [ '$state', '$http' ]

  function classifiedsService( $state, $http ) {
    this.getAllAds = getAllAds
    this.getAd = getAd
    this.newAd = newAd
    this.deleteAd = deleteAd
    this.updateAd = updateAd
    this.ads = []
    var adsArray = this.ads

    function getAllAds() {
      return $http.get( '/classifieds' ).then( response => {
        const ads = response.data
        adsArray = ads
        return ads
      } )
    }

    function getAd( id ) {
      return $http.get( `/classifieds/${id}` )
        .then( ( response ) => {
          const ad = response.data
          return ad
        } )
    }

    function deleteAd( id ) {
      return $http.delete( `/classifieds/${id}` )
        .then( ( response ) => {
          return getAllAds()
            .then( ( ads ) => {
              this.ads = ads
              return ads
            } )
        } )
    }

    function updateAd( id, ad ) {
      return $http.patch( `/classifieds/${id}`, ad )
        .then( ( response ) => {
          return getAllAds()
            .then( ( ads ) => {
              this.ads = ads
              return $state.go( 'adList' )
            } )
        } )
    }

    function newAd( ad ) {
      return $http.post( '/classifieds', ad )
        .then( ( response ) => {
          this.ads.push( response.data )
          return $state.go( 'adList' )
        } )
    }
  }
} )()
