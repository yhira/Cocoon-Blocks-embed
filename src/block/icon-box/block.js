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
      [ style ]: !! style,
      'common-icon-box': true,
      [ 'block-box' ]: true,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/icon-box', {

  title: __( 'アイコンボックス', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['fas', 'exclamation-circle']} />,
  category: THEME_NAME + '-block',
  description: __( 'アイコンを用いて直感的にメッセージ内容を伝えるためのボックスです。', THEME_NAME ),

  attributes: {
    content: {
      type: 'string',
      default: DEFAULT_MSG,
    },
    style: {
      type: 'string',
      default: 'information-box'
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
                  value: 'information-box',
                  label: __( '補足情報(i)', THEME_NAME ),
                },
                {
                  value: 'question-box',
                  label: __( '補足情報(?)', THEME_NAME ),
                },
                {
                  value: 'alert-box',
                  label: __( '補足情報(!)', THEME_NAME ),
                },
                {
                  value: 'memo-box',
                  label: __( 'メモ', THEME_NAME ),
                },
                {
                  value: 'comment-box',
                  label: __( 'コメント', THEME_NAME ),
                },
                {
                  value: 'ok-box',
                  label: __( 'OK', THEME_NAME ),
                },
                {
                  value: 'ng-box',
                  label: __( 'NG', THEME_NAME ),
                },
                {
                  value: 'good-box',
                  label: __( 'GOOD', THEME_NAME ),
                },
                {
                  value: 'bad-box',
                  label: __( 'BAD', THEME_NAME ),
                },
                {
                  value: 'profile-box',
                  label: __( 'プロフィール', THEME_NAME ),
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