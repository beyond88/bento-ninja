import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './index.css';

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];

const TEMPLATE = [
    ['core/heading', { level: 2, placeholder: 'Add heading...' }],
    ['core/paragraph', { placeholder: 'Add content...' }],
];

const Edit = () => {
    const blockProps = useBlockProps({
        className: 'bento-box'
    });

    return (
        <div className="bento-layout">
            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    templateLock={false}
                />
            </div>
        </div>
    );
};

export default Edit;