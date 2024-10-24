import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('fresh-bento/social-media', {
    apiVersion: 2,
    title: 'Fresh Bento Social Media',
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
        backgroundColor: {
            type: 'string',
            default: ''
        }
    },
    edit: Edit,
    save: Save,
});
