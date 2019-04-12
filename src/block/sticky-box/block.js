/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, BLOCK_CLASS} from '../../helpers.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const DEFAULT_MSG = __( 'こちらをクリックして設定変更。この入力は公開ページで反映されません。', THEME_NAME );

//classの取得
function getClasses(style) {
  const classes = classnames(
    {
      [ 'blank-box' ]: true,
      [ 'sticky' ]: true,
      [ style ]: !! style,
      [ 'block-box' ]: true,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/sticky-box', {

  title: __( '付箋風ボックス', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['far', 'sticky-note']} />,
  category: THEME_NAME + '-block',
  description: __( '目立つ濃いめの色で付箋風にメッセージを伝えるためのボックスです。', THEME_NAME ),
  keywords: [ 'sticky', 'box' ],

  attributes: {
    content: {
      type: 'string',
      default: DEFAULT_MSG,
    },
    style: {
      type: 'string',
      default: '',
    },
  },

  edit( { attributes, setAttributes } ) {
    const { content, style } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'スタイル設定', THEME_NAME ) }>

            <SelectControl
              label={ __( 'タイプ', THEME_NAME ) }
              value={ style }
              onChange={ ( value ) => setAttributes( { style: value } ) }
              options={ [
                {
                  value: '',
                  label: __( '灰色', THEME_NAME ),
                },
                {
                  value: 'st-yellow',
                  label: __( '黄色', THEME_NAME ),
                },
                {
                  value: 'st-red',
                  label: __( '赤色', THEME_NAME ),
                },
                {
                  value: 'st-blue',
                  label: __( '青色', THEME_NAME ),
                },
                {
                  value: 'st-green',
                  label: __( '緑色', THEME_NAME ),
                },
              ] }
            />

          </PanelBody>
        </InspectorControls>

        <div className={ getClasses(style) }>
          <span className={'box-block-msg'}>
            <RichText
              value={ content }
              placeholder={ DEFAULT_MSG }
            />
          </span>
          <InnerBlocks />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    const { content, style } = attributes;
    return (
      <div className={ getClasses(style) }>
        <InnerBlocks.Content />
      </div>
    );
  }
} );