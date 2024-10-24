import {
    InnerBlocks,
    InspectorControls,
    RichText,
    useBlockProps
} from '@wordpress/block-editor';
import {
    ColorPalette,
    PanelBody,
    RangeControl,
    SelectControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { SOCIAL_COLORS } from './constants';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { platform, columns, opacity, borderRadius, boxShadow, backgroundColor, padding, borderColor, borderWidth, borderStyle, animation } = attributes;

    const platformColor = SOCIAL_COLORS[platform] || SOCIAL_COLORS.twitter;
    const rgbaColor = `rgba(${parseInt(platformColor.slice(1, 3), 16)}, ${parseInt(platformColor.slice(3, 5), 16)}, ${parseInt(platformColor.slice(5, 7), 16)}, ${opacity / 100})`;
    const customBackgroundColor = backgroundColor || rgbaColor;

    const blockStyle = {
        backgroundColor: customBackgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        margin: '0 auto',
        color: '#ffffff',
        boxShadow: boxShadow,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`, // Dynamic border
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

                    <ColorPalette
                        label="Background Color"
                        colors={Object.keys(SOCIAL_COLORS).map((key) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            color: SOCIAL_COLORS[key],
                        }))}
                        value={backgroundColor}
                        onChange={(color) => setAttributes({ backgroundColor: color })}
                    />

                    <RangeControl
                        label="Opacity"
                        value={opacity}
                        onChange={(value) => setAttributes({ opacity: value })}
                        min={0}
                        max={100}
                    />

                    <RangeControl
                        label="Border Radius"
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />

                    <RangeControl
                        label="Box Shadow Blur"
                        value={parseInt(boxShadow.split(' ')[2])}
                        onChange={(value) => setAttributes({ boxShadow: `0 4px ${value}px rgba(0,0,0,0.2)` })}
                        min={0}
                        max={100}
                    />

                    <RangeControl
                        label="Box Shadow Spread"
                        value={parseInt(boxShadow.split(' ')[3])}
                        onChange={(value) => setAttributes({ boxShadow: `0 4px 8px ${value}px rgba(0,0,0,0.2)` })}
                        min={-50}
                        max={50}
                    />

                    <RangeControl
                        label="Padding"
                        value={padding}
                        onChange={(value) => setAttributes({ padding: value })}
                        min={0}
                        max={100}
                    />

                    {/* Border Color Controller */}
                    <ColorPalette
                        label="Border Color"
                        colors={Object.keys(SOCIAL_COLORS).map((key) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            color: SOCIAL_COLORS[key],
                        }))}
                        value={borderColor}
                        onChange={(color) => setAttributes({ borderColor: color })}
                    />

                    {/* Border Width Controller */}
                    <RangeControl
                        label="Border Width"
                        value={borderWidth}
                        onChange={(value) => setAttributes({ borderWidth: value })}
                        min={0}
                        max={20} // Limit the maximum width
                    />

                    {/* Border Style Controller */}
                    <SelectControl
                        label="Border Style"
                        value={borderStyle}
                        options={[
                            { label: 'Solid', value: 'solid' },
                            { label: 'Dashed', value: 'dashed' },
                            { label: 'Dotted', value: 'dotted' },
                            { label: 'Double', value: 'double' },
                            { label: 'Groove', value: 'groove' },
                            { label: 'Ridge', value: 'ridge' },
                            { label: 'Inset', value: 'inset' },
                            { label: 'Outset', value: 'outset' },
                        ]}
                        onChange={(value) => setAttributes({ borderStyle: value })}
                    />

                    <SelectControl
                        label="Animation"
                        value={attributes.animation}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Fade In', value: 'fade-in' },
                            { label: 'Slide In from Left', value: 'slide-in-left' },
                            { label: 'Slide In from Right', value: 'slide-in-right' },
                            { label: 'Slide In from Top', value: 'slide-in-top' },
                            { label: 'Slide In from Bottom', value: 'slide-in-bottom' },
                            { label: 'Zoom In', value: 'zoom-in' },
                            { label: 'Zoom Out', value: 'zoom-out' },
                            { label: 'Bounce', value: 'bounce' },
                            { label: 'Flip', value: 'flip' },
                            { label: 'Shake', value: 'shake' },
                            { label: 'Roll In', value: 'roll-in' },
                            { label: 'Fade Up', value: 'fade-up' },
                            { label: 'Fade Down', value: 'fade-down' },
                            { label: 'Fade Left', value: 'fade-left' },
                            { label: 'Fade Right', value: 'fade-right' },
                        ]}
                        onChange={(value) => setAttributes({ animation: value })}
                    />

                </PanelBody>
            </InspectorControls>

            <div style={blockStyle}>
                {showDefaultText && (
                    <RichText
                        tagName="p"
                        value={dynamicText}
                        onChange={(newValue) => {
                            if (newValue === '') {
                                setShowDefaultText(false);
                            }
                        }}
                        placeholder="Social Media Block text"
                        style={{ textAlign: 'center', marginBottom: '20px' }}
                    />
                )}

                <div>
                    <InnerBlocks templateLock={false} />
                </div>
            </div>
        </div>
    );
}
