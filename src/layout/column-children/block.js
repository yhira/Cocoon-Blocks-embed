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

//左カラム
registerBlockType( 'cocoon-blocks/column-left', {

  title: __( '左カラム', THEME_NAME ),
  parent: [
    'cocoon-blocks/column-2-2-1-1',
    'cocoon-blocks/column-2-3-1-2',
    'cocoon-blocks/column-2-3-2-1',
    'cocoon-blocks/column-2-4-1-3',
    'cocoon-blocks/column-2-4-3-1',
    'cocoon-blocks/column-3-3-1-1-1',
  ],
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

//中央カラム
registerBlockType( 'cocoon-blocks/column-center', {

  title: __( '中央カラム', THEME_NAME ),
  parent: [
    'cocoon-blocks/column-2-2-1-1',
    'cocoon-blocks/column-2-3-1-2',
    'cocoon-blocks/column-2-3-2-1',
    'cocoon-blocks/column-2-4-1-3',
    'cocoon-blocks/column-2-4-3-1',
    'cocoon-blocks/column-3-3-1-1-1',
  ],
  icon: 'grid-view',
  category: THEME_NAME + '-layout',

  edit( { attributes, setAttributes } ) {
    return (
      <Fragment>
        <div className="column-center">
          <InnerBlocks templateLock={ false } />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    return (
      <div className="column-center">
        <InnerBlocks.Content />
      </div>
    );
  }
} );


//右カラム
registerBlockType( 'cocoon-blocks/column-right', {

  title: __( '右カラム', THEME_NAME ),
  parent: [
    'cocoon-blocks/column-2-2-1-1',
    'cocoon-blocks/column-2-3-1-2',
    'cocoon-blocks/column-2-3-2-1',
    'cocoon-blocks/column-2-4-1-3',
    'cocoon-blocks/column-2-4-3-1',
    'cocoon-blocks/column-3-3-1-1-1',
  ],
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
