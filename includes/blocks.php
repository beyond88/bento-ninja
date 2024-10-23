<?php
namespace BentoNinja;

if ( ! defined( 'ABSPATH' ) ) {
	exit(); // Exit if accessed directly.
}

class Blocks {

    public static function init() {
		$self = new self();
		// block initialization
		add_action( 'init', [ $self, 'blocks_init' ] );
	}

    public function blocks_init() {

    }

}