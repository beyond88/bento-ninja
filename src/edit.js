import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    Button,
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        align,
        mediaId,
        mediaUrl,
        mediaType,
        mediaWidth,
        isStackedOnMobile,
        verticalAlignment,
        imageFill,
    } = attributes;

    const blockProps = useBlockProps({
        className: `bento-grid-layout${align ? ` align${align}` : ''}${
            isStackedOnMobile ? ' is-stacked-on-mobile' : ''
        }${verticalAlignment ? ` is-vertically-aligned-${verticalAlignment}` : ''}`,
    });

    const ALLOWED_BLOCKS = ['core/image', 'core/heading', 'core/paragraph', 'core/buttons'];
    const TEMPLATE = [
        ['core/image', {}],
        ['core/heading', { level: 3, placeholder: __('Enter heading...', 'bento-ninja') }],
        ['core/paragraph', { placeholder: __('Enter content...', 'bento-ninja') }],
    ];

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
                        label={__('Media Width %', 'bento-ninja')}
                        value={mediaWidth}
                        onChange={(newWidth) => setAttributes({ mediaWidth: newWidth })}
                        min={10}
                        max={90}
                    />
                    <ToggleControl
                        label={__('Stack on mobile', 'bento-ninja')}
                        checked={isStackedOnMobile}
                        onChange={(value) => setAttributes({ isStackedOnMobile: value })}
                    />
                    <SelectControl
                        label={__('Vertical Alignment', 'bento-ninja')}
                        value={verticalAlignment}
                        options={[
                            { label: __('Top', 'bento-ninja'), value: 'top' },
                            { label: __('Center', 'bento-ninja'), value: 'center' },
                            { label: __('Bottom', 'bento-ninja'), value: 'bottom' },
                        ]}
                        onChange={(value) => setAttributes({ verticalAlignment: value })}
                    />
                    <ToggleControl
                        label={__('Image Fill', 'bento-ninja')}
                        checked={imageFill}
                        onChange={(value) => setAttributes({ imageFill: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div 
                    className="bento-grid-content"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(${mediaWidth}%, 1fr))`,
                        gap: '20px'
                    }}
                >
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        templateLock={false}
                    />
                </div>
            </div>
        </>
    );
}