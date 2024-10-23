import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { gridColumns } = attributes;

    const blockProps = useBlockProps.save({
        className: `bento-layout`,
        style: {
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns || 4}, 1fr)`,
            gap: '20px'
        }
    });

    return (
        <div {...blockProps}>
            {[...Array(gridColumns || 4)].map((_, index) => (
                <div key={index} className="bento-grid-column">
                    <InnerBlocks.Content />
                </div>
            ))}
        </div>
    );
}
