import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { SOCIAL_COLORS } from './constants';

export default function Save({ attributes }) {
    const { platform } = attributes;
    const blockProps = useBlockProps.save();

    const blockStyle = {
        backgroundColor: SOCIAL_COLORS[platform] || SOCIAL_COLORS.twitter,
        padding: '20px',
        borderRadius: '8px',
        margin: '0 auto',
        color: '#ffffff'  // Default text color white
    };

    return (
        <div {...blockProps}>
            <div style={blockStyle}>
                <div>
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}
