import {
    InnerBlocks,
    InspectorControls,
    RichText,
    useBlockProps
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { SOCIAL_COLORS } from './constants';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { platform } = attributes;

    const blockStyle = {
        backgroundColor: SOCIAL_COLORS[platform] || SOCIAL_COLORS.twitter,
        padding: '20px',
        borderRadius: '8px',
        margin: '0 auto',
        color: '#ffffff'  // Default text color white
    };

    const [showDefaultText, setShowDefaultText] = useState(true);
    const dynamicText = `Social Media Block: ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Block Settings">
                    <SelectControl
                        label="Social Platform"
                        value={platform}
                        options={Object.keys(SOCIAL_COLORS).map((key) => ({
                            label: key.charAt(0).toUpperCase() + key.slice(1),
                            value: key
                        }))}
                        onChange={(value) => setAttributes({ platform: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div style={blockStyle}>
                {/* Conditionally show the default text */}
                {showDefaultText && (
                    <RichText
                        tagName="p"
                        value={dynamicText}
                        onChange={(newValue) => {
                            if (newValue === '') {
                                setShowDefaultText(false); // Hide text if removed
                            }
                        }}
                        placeholder="Social Media Block text"
                        style={{ textAlign: 'center', marginBottom: '20px' }}
                    />
                )}

                <div>
                    <InnerBlocks
                        templateLock={false} // No initial blocks and all blocks are allowed
                    />
                </div>
            </div>
        </div>
    );
}
