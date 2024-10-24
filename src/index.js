import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('bento-ninja/social-media', {
    apiVersion: 2,
    title: 'Bento Ninja Social',
    description: 'Add social media profile blocks with customizable layouts',
    category: 'design',
    icon: 'share',
    supports: {
        html: false,
        align: ['wide', 'full']
    },
    attributes: {
        platform: {
            type: 'string',
            default: 'twitter'
        },
        columns: {
            type: 'number',
            default: 12
        },
        opacity: {
            type: 'number',
            default: 100
        },
        borderRadius: {
            type: 'number',
            default: 24
        },
        boxShadow: {
            type: 'string',
            default: 'none'
        },
        backgroundColor: {
            type: 'string',
            default: ''
        },
        padding: {
            type: 'number',
            default: 20
        },
        borderColor: {
            type: 'string',
            default: '#fff' // Default border color
        },
        borderWidth: {
            type: 'number',
            default: 1 // Default border width
        },
        borderStyle: {
            type: 'string',
            default: 'solid' // Default border style
        },
        textAlign: {
            type: 'string',
            default: 'center' // Default text alignment
        },
        marginBottom: {
            type: 'number',
            default: 20 // Default margin bottom in pixels
        },
        animation: {
            type: 'string',
            default: 'none',
        },
    },
    edit: Edit,
    save: Save,
});
