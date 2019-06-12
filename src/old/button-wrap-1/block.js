/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, BUTTON_BLOCK, colorValueToSlug} from '../../helpers.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, SelectControl, BaseControl, TextareaControl } = wp.components;
const { Fragment } = wp.element;

//classの取得
function getClasses(color, size) {
  const classes = classnames(
    {
      [ 'btn-wrap' ]: true,
      [ `btn-wrap-${ colorValueToSlug(color) }` ]: !! colorValueToSlug(color),
      [ size ]: size,
      [ BUTTON_BLOCK ]: true,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/button-wrap-1', {

  title: __( '囲みボタン', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['fas', 'ticket-alt']} />,
  category: THEME_NAME + '-block',
  description: __( 'アスリートタグ等のタグを変更できないリンクをボタン化します。', THEME_NAME ),
  keywords: [ 'button', 'btn', 'wrap' ],

  attributes: {
    content: {
      type: 'string',
      default: __( 'こちらをクリックしてリンクタグを設定エリア入力してください。この入力は公開ページで反映されません。', THEME_NAME ),
    },
    tag: {
      type: 'string',
      default: '',
    },
    color: {
      type: 'string',
      default: keyColor,
    },
    size: {
      type: 'string',
      default: '',
    },
  },
  supports: {
    align: [ 'left', 'center', 'right' ],
  },

  edit( { attributes, setAttributes } ) {
    const { content, color, size, tag } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( '囲みボタン設定', THEME_NAME ) }>

            <TextareaControl
              label={ __( 'リンクタグ・ショートコード', THEME_NAME ) }
              value={ tag }
              onChange={ ( value ) => setAttributes( { tag: value } ) }
            />

            <SelectControl
              label={ __( 'サイズ', THEME_NAME ) }
              value={ size }
              onChange={ ( value ) => setAttributes( { size: value } ) }
              options={ [
                {
                  value: '',
                  label: __( '小', THEME_NAME ),
                },
                {
                  value: ' btn-wrap-m',
                  label: __( '中', THEME_NAME ),
                },
                {
                  value: ' btn-wrap-l',
                  label: __( '大', THEME_NAME ),
                },
              ] }
            />

          </PanelBody>

          <PanelColorSettings
            title={ __( '色設定', THEME_NAME ) }
            initialOpen={ true }
            colorSettings={ [
              {
                value: color,
                onChange: ( value ) => setAttributes( { color: value } ),
                label: __( '色', THEME_NAME ),
              },
            ] }
          >
            <ContrastChecker
              color={ color }
            />
          </PanelColorSettings>

        </InspectorControls>
        <span className={'button-wrap-msg'}>
          <RichText
            value={ content }
          />
        </span>
        <div
          className={ getClasses(color, size) }
          dangerouslySetInnerHTML={{__html: tag}}
        >
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    const { content, color, size, tag } = attributes;
    return (
      <div className={ getClasses(color, size) }>
        <RichText.Content
          value={ tag }
        />
      </div>
    );
  }
} );