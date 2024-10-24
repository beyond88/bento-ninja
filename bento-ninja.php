<?php
/**
 * Plugin Name: Bento Ninja
 * Description: Easily design an attractive and seamless bento layout grid for a stunning visual experience.
 * Plugin URI: https://seahawkmedia.com/
 * Author: Seahawk Media
 * Author URI: https://seahawkmedia.com/
 * Version: 1.0.0
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bento-ninja
 * Domain Path:       /languages
 * Requires PHP:      5.6
 * Requires at least: 4.4
 * Tested up to:      6.5.2
 * @package Bento Ninja
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html 
 */

defined('ABSPATH') || exit;

final class Bento_Ninja {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '1.0.0';

    /**
     * Instance of self
     *
     * @var Bento_Ninja
     */
    private static $instance = null;

    /**
     * Minimum PHP version required
     *
     * @var string
     */
    private $min_php = '5.6';

    /**
     * Holds various class instances
     *
     * @since 2.6.10
     *
     * @var array
     */
    private $container = [];

    /**
     * Constructor for the Bento_Ninja class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    private function __construct() {

        $this->define_constants();
		$this->load_dependency();
        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );
        add_action( 'plugins_loaded', [ $this, 'on_plugins_loaded' ] );
		add_action( 'bentoninja_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes the Bento_Ninja() class
     *
     * Checks for an existing WeDevs_Bento_Ninja() instance
     * and if it doesn't find one, create it.
     */
    public static function init() {
        if ( self::$instance === null ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Check if the PHP version is supported
     *
     * @return bool
     */
    public function is_supported_php() {
        if ( version_compare( PHP_VERSION, $this->min_php, '<=' ) ) {
            return false;
        }

        return true;
    }

    /**
     * Get the plugin path.
     *
     * @return string
     */
    public function plugin_path() {
        return untrailingslashit( plugin_dir_path( __FILE__ ) );
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {

        if ( ! $this->is_supported_php() ) {
            $class = 'notice notice-error';
            $message = sprintf(
                esc_html__( 'The Minimum PHP Version Requirement for %1$s is %2$s. You are Running PHP %3$s.', 'bento-ninja' ),
                '<b>Bento Ninja</b>',
                esc_html( $this->min_php ),
                esc_html( phpversion() )
            );
            printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
            exit;
        }

        add_action( __FILE__, [ $this, 'flush_rewrite_rules' ] );

    }

    /**
     * Flush rewrite rules after dokan is activated or woocommerce is activated
     *
     * @since 3.2.8
     */
    public function flush_rewrite_rules() {
        flush_rewrite_rules();
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {}

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'bento-ninja', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * Define all constants
     *
     * @return void
     */
    public function define_constants() {
        $this->define( 'BNINJA_VERSION', $this->version );
        $this->define( 'BNINJA_PLUGIN_SLUG', 'bento-ninja' );
        $this->define( 'BNINJA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
		$this->define( 'BNINJA_ROOT_URL', plugin_dir_url( __FILE__ ) );
		$this->define( 'BNINJA_ROOT_DIR_PATH', plugin_dir_path( __FILE__ ) );
        $this->define( 'BNINJA_FILE', __FILE__ );
        $this->define( 'BNINJA_DIR', __DIR__ );
        $this->define( 'BNINJA_SRC_DIR', __DIR__ . '/src' );
        $this->define( 'BNINJA_ASSEST_URL', plugins_url( 'assets', __FILE__ ) );
		$this->define( 'BNINJA_ASSETS_PATH', BNINJA_ROOT_DIR_PATH . 'assets/' );
		$this->define( 'BNINJA_INCLUDES_DIR_PATH', BNINJA_ROOT_DIR_PATH . 'includes/' );
		$this->define( 'BNINJA_BLOCKS_DIR_PATH', BNINJA_ROOT_DIR_PATH . 'includes/blocks/' );
    }

    /**
     * Loads the required dependencies for the plugin.
     *
     * @return void
     */
	public function load_dependency() {
		require_once BNINJA_INCLUDES_DIR_PATH . 'autoload.php';
	}

    /**
	 * When WP has loaded all plugins, trigger the `bentoninja_loaded` hook.
	 *
	 * This ensures `bentoninja_loaded` is called only after all other plugins
	 * are loaded, to avoid issues caused by plugin directory naming changing
	 *
	 * @since 1.0.0
	 */
	public function on_plugins_loaded() {
		do_action( 'bentoninja_loaded' );
	}

    /**
     * Define constant if not already defined
     *
     * @since 2.9.16
     *
     * @param string      $name
     * @param string|bool $value
     *
     * @return void
     */
    private function define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Load the plugin after WP User Frontend is loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Initialize the actions
     *
     * @return void
     */
    public function init_hooks() {
        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );
    }

    /**
     * Include all the required files
     *
     * @return void
     */
    public function includes() {
        BentoNinja\Blocks::init();
    }

}

/**
 * Load Bento Ninja Plugin when all plugins loaded
 *
 * @return Bento_Ninja
 */
function bento_ninja() { // phpcs:ignore
    return Bento_Ninja::init();
}

// Lets Go....
bento_ninja();


function fresh_bento_social_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'fresh_bento_social_block_init');

function fresh_bento_social_block_editor_assets() {
    wp_enqueue_script(
        'bento-ninja-social-editor',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components')
    );
    wp_enqueue_style(
        'bento-ninja-social-editor-style',
        plugins_url('build/index.css', __FILE__),
        array()
    );
}
add_action('enqueue_block_editor_assets', 'fresh_bento_social_block_editor_assets');