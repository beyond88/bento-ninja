<?php
namespace Bento_Ninja\Blocks;

class Text {
    /**
     * Block initialization
     */
    public function __construct() {
        add_action('init', array( $this, 'register_block' ) );
        add_action('wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
        add_action('admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
    }

    /**
     * Register the block
     */
    public function register_block() {
        register_block_type(
            BNINJA_DIR . '/blocks/Text',
            array(
                'render_callback' => array( $this, 'render_block' ) ,
            )
        );
    }

    /**
     * Enqueue block styles
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            'bento-ninja-text',
            plugins_url('style-index.css', __FILE__),
            array(),
            BNINJA_PLUGIN_VERSION
        );
    }

    /**
     * Render block
     */
    public function render_block($attributes, $content) {
        $wrapper_attributes = get_block_wrapper_attributes(array( 
            'class' => 'bento-box'
         ) );
        
        return sprintf(
            '<div class="bento-layout"><div %1$s>%2$s</div></div>',
            $wrapper_attributes,
            $content
        );
    }
}