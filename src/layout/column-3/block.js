/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, LAYOUT_BLOCK_CLASS} from '../../helpers.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;

const ALLOWED_BLOCKS = [ 'cocoon-blocks/column-left', 'cocoon-blocks/column-center', 'cocoon-blocks/column-right' ];

registerBlockType( 'cocoon-blocks/column-3', {

  title: __( '3カラム', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['fas', 'solar-panel']} />,
  category: THEME_NAME + '-layout',
  description: __( '本文を左・中央・右カラムに分けます。', THEME_NAME ),


  edit( { attributes, setAttributes } ) {
    return (
      <Fragment>
        <div className={"column-wrap column-3" + LAYOUT_BLOCK_CLASS}>
          <InnerBlocks
          template={[
              [ 'cocoon-blocks/column-left', { placeholder: __( '左側に入力する内容', THEME_NAME ) } ],
              [ 'cocoon-blocks/column-center', { placeholder: __( '中央に入力する内容', THEME_NAME ) } ],
              [ 'cocoon-blocks/column-right', { placeholder: __( '右側に入力する内容', THEME_NAME ) } ]
          ]}
          templateLock="all"
          allowedBlocks={ ALLOWED_BLOCKS }
           />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    return (
      <div className={"column-wrap column-3" + LAYOUT_BLOCK_CLASS}>
        <InnerBlocks.Content />
      </div>
    );
  }
} );