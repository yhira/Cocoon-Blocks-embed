/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, LAYOUT_BLOCK_CLASS} from '../../helpers.js';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { Fragment } = wp.element;


registerBlockType( 'cocoon-blocks/column-left', {

  title: __( '左カラム', THEME_NAME ),
  parent: [ 'cocoon-blocks/column-2-1-1' ],
  icon: 'grid-view',
  category: THEME_NAME + '-layout',

  edit( { attributes, setAttributes } ) {
    return (
      <Fragment>
        <div className="column-left">
          <InnerBlocks templateLock={ false } />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    return (
      <div className="column-left">
        <InnerBlocks.Content />
      </div>
    );
  }
} );

registerBlockType( 'cocoon-blocks/column-right', {

  title: __( '右カラム', THEME_NAME ),
  parent: [ 'cocoon-blocks/column-2-1-1' ],
  icon: 'grid-view',
  category: THEME_NAME + '-layout',

  edit( { attributes, setAttributes } ) {
    return (
      <Fragment>
        <div className="column-right">
          <InnerBlocks templateLock={ false } />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    return (
      <div className="column-right">
        <InnerBlocks.Content />
      </div>
    );
  }
} );
