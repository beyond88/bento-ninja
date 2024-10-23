import {
    BlockAlignmentToolbar,
    BlockControls,
    InnerBlocks,
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { align, gridColumns } = attributes;
    const blockProps = useBlockProps({
        className: `bento-layout ${align ? `align${align}` : ''}`,
    });

    // Initialize columns with unique keys and store the number of columns in state
    const [columns, setColumns] = useState(
        new Array(gridColumns || 4).fill(null).map((_, index) => ({
            id: Math.random().toString(36).substr(2, 9),
            hasTemplate: index === 0, // Only the first column has the template
        }))
    );

    const ALLOWED_BLOCKS = ['core/image', 'core/heading', 'core/paragraph', 'core/button'];
    const TEMPLATE = [
        ['core/image', {}],
        ['core/heading', { placeholder: __('Enter heading...', 'bento-ninja') }],
        ['core/paragraph', { placeholder: __('Enter content...', 'bento-ninja') }],
    ];

    // Update columns when gridColumns changes
    useEffect(() => {
        const updatedColumns = [...columns];
        if (gridColumns > columns.length) {
            for (let i = columns.length; i < gridColumns; i++) {
                updatedColumns.push({
                    id: Math.random().toString(36).substr(2, 9),
                    hasTemplate: i === 0, // Ensure only the first column has a template
                });
            }
        } else {
            updatedColumns.splice(gridColumns);
        }
        setColumns(updatedColumns);
    }, [gridColumns]);

    const onAddColumn = () => {
        setColumns((prevColumns) => [
            ...prevColumns,
            {
                id: Math.random().toString(36).substr(2, 9),
                hasTemplate: false,
            },
        ]);
    };

    const onRemoveColumn = (indexToRemove) => {
        setColumns((prevColumns) =>
            prevColumns.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={align}
                    onChange={(newAlign) => setAttributes({ align: newAlign })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Grid Settings', 'bento-ninja')}>
                    <RangeControl
                        label={__('Number of Columns', 'bento-ninja')}
                        value={columns.length}
                        onChange={(newColumns) => {
                            setAttributes({ gridColumns: newColumns });
                        }}
                        min={1}
                        max={6}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: '20px' }}>
                {columns.map((column, index) => (
                    <div key={column.id} className="bento-grid-column">
                        <InnerBlocks
                            template={column.hasTemplate ? TEMPLATE : []} // Only apply template to the first column
                            templateLock={false}
                            allowedBlocks={ALLOWED_BLOCKS}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />

                        {columns.length > 1 && (
                            <Button
                                variant="secondary"
                                className="remove-column-button"
                                onClick={() => onRemoveColumn(index)}
                            >
                                {__('Remove Column', 'bento-ninja')}
                            </Button>
                        )}
                    </div>
                ))}

                {/* Add Column Button */}
                <div className="add-column-button">
                    <Button variant="primary" onClick={onAddColumn}>
                        {__('Add Column', 'bento-ninja')}
                    </Button>
                </div>
            </div>
        </>
    );
}
