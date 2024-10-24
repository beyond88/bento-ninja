<?php
namespace BentoNinja;

defined('ABSPATH') || exit;

class Blocks {

    /**
     * Initialize the Bento Ninja Plugin.
     *
     * @return void
     */
    public static function init() {
		$self = new self();
		// block initialization
		add_action( 'init', [ $self, 'blocks_init' ] );
	}

    /**
     * Register and initialize Gutenberg blocks.
     *
     * @return void
     */
    public function blocks_init() {

    }

}