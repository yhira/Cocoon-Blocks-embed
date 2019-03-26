/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks/*, RichText, InspectorControls*/ } = wp.editor;
// const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const THEME_NAME = 'cocoon';
//const DEFAULT_MSG = __( 'キーワード', THEME_NAME );
const BLOCK_CLASS = ' layout-box';
import memoize from 'memize';
import { times } from 'lodash';


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


const ALLOWED_BLOCKS = [ 'cocoon-blocks/column-left', 'cocoon-blocks/column-right' ];
const getColumnsTemplate = memoize( ( columns ) => {
  return times( columns, () => [ 'cocoon-blocks/column-left' ] );
} );




registerBlockType( 'cocoon-blocks/column-2-1-1', {

  title: __( '2カラム（1:1）', THEME_NAME ),
  icon: 'grid-view',
  category: THEME_NAME + '-layout',

  attributes: {
    content: {
      type: 'string',
      //default: DEFAULT_MSG,
    },
  },

  edit( { attributes, setAttributes } ) {
    return (
      <Fragment>
        <div className={"column-wrap column-2" + BLOCK_CLASS}>
          <InnerBlocks
          template={[
              [ 'cocoon-blocks/column-left', { placeholder: __( '左カラム', THEME_NAME ) } ],
              [ 'cocoon-blocks/column-right', { placeholder: __( '右カラム', THEME_NAME ) } ]
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
      <div className={"column-wrap column-2" + BLOCK_CLASS}>
        <InnerBlocks.Content />
      </div>
    );
  }
} );