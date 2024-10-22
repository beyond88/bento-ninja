import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        align,
        mediaWidth,
        isStackedOnMobile,
        verticalAlignment,
        imageFill,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `bento-grid-layout${align ? ` align${align}` : ''}${
            isStackedOnMobile ? ' is-stacked-on-mobile' : ''
        }${verticalAlignment ? ` is-vertically-aligned-${verticalAlignment}` : ''}${
            imageFill ? ' is-image-fill' : ''
        }`,
    });

    return (
        <div {...blockProps}>
            <div 
                className="bento-grid-content"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${mediaWidth}%, 1fr))`,
                    gap: '20px'
                }}
            >
                <InnerBlocks.Content />
            </div>
        </div>
    );
}