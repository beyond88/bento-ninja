import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { SOCIAL_COLORS } from './constants';

export default function Save({ attributes }) {
    const { platform, opacity, borderRadius, boxShadow, backgroundColor, padding, borderColor, borderWidth, borderStyle, animation } = attributes;
    const blockProps = useBlockProps.save();

    // Get the platform color and apply opacity
    const defaultBackgroundColor = SOCIAL_COLORS[platform] || SOCIAL_COLORS.twitter;
    const rgbaColor = `rgba(${parseInt(defaultBackgroundColor.slice(1, 3), 16)}, ${parseInt(defaultBackgroundColor.slice(3, 5), 16)}, ${parseInt(defaultBackgroundColor.slice(5, 7), 16)}, ${opacity / 100})`;

    const blockStyle = {
        backgroundColor: backgroundColor || rgbaColor, // Use the background color set by user or default color
        padding: `${padding}px`, // Dynamic padding
        borderRadius: `${borderRadius}px`, // Dynamic border radius
        margin: '0 auto',
        boxShadow: boxShadow, // Apply the box shadow
        border: `${borderWidth}px ${borderStyle} ${borderColor}`, // Dynamic border
    };

    return (
        <div {...blockProps}>
            <div style={blockStyle} className={`animation-${animation}`}>
                <div>
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}
