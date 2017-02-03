'use strict';
const boom = require( 'boom' );
const express = require( 'express' );
const knex = require( '../knex' );
const router = express.Router();

router.get( '/', function( req, res, next ) {
  knex( 'classifieds' )
    .orderBy( 'id' )
    .then( ( data ) => {
      res.send( data );

    } )
    .catch( ( err => {
      next( err );
    } ) );
} );

// ORIGINAL ROUTE - DID NOT RETURN DATE
// router.get( '/', function( req, res, next ) {
//   knex.select( 'id', 'title', 'description', 'price', 'item_image' ).from( 'classifieds' )
//     .orderBy( 'id' )
//     .then( ( data ) => {
//       res.send( data );
//
//     } )
//     .catch( ( err => {
//       next( err );
//     } ) );
// } );

router.get( '/:id', function( req, res, next ) {
  const id = Number.parseInt( req.params.id );

  if ( Number.isNaN( id ) ) {
    return next();
  }
  knex.select( 'id', 'title', 'description', 'price', 'item_image' ).from( 'classifieds' )
    .where( 'id', id )
    .then( ( data ) => {
      if ( !data ) {
        throw boom.create( 404, 'Not Found' );
      }
      res.send( data[ 0 ] );
    } )
    .catch( ( err => {
      next( err );
    } ) );
} );

router.post( '/', function( req, res, next ) {
  const newAd = req.body;
  knex( 'classifieds' )
    .returning( [ 'id', 'title', 'description', 'price', 'item_image' ] )
    .insert( newAd )
    .then( ( data ) => {
      res.send( data[ 0 ] )
    } )
    .catch( ( err => {
      next( err );
    } ) );
} )

router.patch( '/:id', function( req, res, next ) {
  const id = Number.parseInt( req.params.id );

  if ( Number.isNaN( id ) ) {
    return next();
  }

  knex( 'classifieds' )
    .where( 'id', id )
    .returning( [ 'id', 'title', 'description', 'price', 'item_image' ] )
    .update( req.body )
    .then( ( data ) => {
      res.send( data[ 0 ] )
    } )
    .catch( ( err => {
      next( err );
    } ) );
} )

router.delete( '/:id', function( req, res, next ) {
  const id = Number.parseInt( req.params.id );

  if ( Number.isNaN( id ) ) {
    return next();
  }

  knex( 'classifieds' )
    .where( 'id', id )
    .returning( [ 'id', 'title', 'description', 'price', 'item_image' ] )
    .del()
    .then( ( data ) => {
      res.send( data[ 0 ] )
    } )
    .catch( ( err => {
      next( err );
    } ) );
} )

module.exports = router;
