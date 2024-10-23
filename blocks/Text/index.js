import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: ({ attributes }) => {
        return <InnerBlocks.Content />;
    },
});