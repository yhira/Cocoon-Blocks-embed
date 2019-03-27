/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, LAYOUT_BLOCK_CLASS} from '../../helpers.js';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
// const THEME_NAME = 'cocoon';
// //const DEFAULT_MSG = __( 'キーワード', THEME_NAME );
// const BLOCK_CLASS = ' layout-box';
// import memoize from 'memize';
// import { times } from 'lodash';

const ALLOWED_BLOCKS = [ 'cocoon-blocks/column-left', 'cocoon-blocks/column-right' ];
// const getColumnsTemplate = memoize( ( columns ) => {
//   return times( columns, () => [ 'cocoon-blocks/column-left' ] );
// } );

registerBlockType( 'cocoon-blocks/column-2', {

  title: __( '2カラム', THEME_NAME ),
  icon: 'grid-view',
  category: THEME_NAME + '-layout',
  description: __( '本文を左右カラムに分けます。オプションでカラム比率を変更できます。', THEME_NAME ),

  attributes: {
    ratio: {
      type: 'string',
      default: ' column-2-2-1-1',
    },
  },

  edit( { attributes, setAttributes } ) {
    const { ratio } = attributes;
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'スタイル設定', THEME_NAME ) }>

            <SelectControl
              label={ __( 'カラム比率', THEME_NAME ) }
              value={ ratio }
              onChange={ ( value ) => setAttributes( { ratio: value } ) }
              options={ [
                {
                  value: ' column-2-2-1-1',
                  label: __( '1:1（｜□｜□｜）', THEME_NAME ),
                },
                {
                  value: ' column-2-3-1-2',
                  label: __( '1:2（｜□｜□□｜）', THEME_NAME ),
                },
                {
                  value: ' column-2-3-2-1',
                  label: __( '2:1（｜□□｜□｜）', THEME_NAME ),
                },
                {
                  value: ' column-2-4-1-3',
                  label: __( '1:3（｜□｜□□□｜））', THEME_NAME ),
                },
                {
                  value: ' column-2-4-3-1',
                  label: __( '3:1,（｜□□□｜□｜）', THEME_NAME ),
                },
              ] }
            />

          </PanelBody>
        </InspectorControls>
        <div className={"column-wrap column-2" + ratio + LAYOUT_BLOCK_CLASS}>
          <InnerBlocks
          template={[
              [ 'cocoon-blocks/column-left', { placeholder: __( '左側に入力する内容', THEME_NAME ) } ],
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
    const { ratio } = attributes;
    return (
      <div className={"column-wrap column-2" + ratio + LAYOUT_BLOCK_CLASS}>
        <InnerBlocks.Content />
      </div>
    );
  }
} );