/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, BLOCK_CLASS, LIST_ICONS} from '../../helpers.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { times } = lodash;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const ALLOWED_BLOCKS = [ 'core/list' ];

//classの取得
function getClasses(icon) {
  const classes = classnames(
    {
      'iconlist-box': true,
      [ icon ]: !! icon,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/iconlist-box', {

  title: __( 'アイコンリスト', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['fas', 'list-ul']} />,
  category: THEME_NAME + '-block',
  description: __( 'リストポイントにアイコンを適用した非順序リストです。', THEME_NAME ),

  attributes: {
    title: {
      type: 'string',
      default: '',
    },
    color: {
      type: 'string',
      default: '',
    },
    icon: {
      type: 'string',
      default: 'list-caret-right',
    },
  },

  edit( { attributes, setAttributes } ) {
    const { title, color, icon } = attributes;

    // const classes = classnames(
    //   {
    //     'iconlist-box': true,
    //     [ icon ]: !! icon,
    //   }
    // );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'スタイル設定', THEME_NAME ) }>

            <SelectControl
              label={ __( '色', THEME_NAME ) }
              value={ color }
              onChange={ ( value ) => setAttributes( { color: value } ) }
              options={ [
                {
                  value: '',
                  label: __( 'デフォルト', THEME_NAME ),
                },
                {
                  value: ' cb-yellow',
                  label: __( '黄色', THEME_NAME ),
                },
                {
                  value: ' cb-red',
                  label: __( '赤色', THEME_NAME ),
                },
                {
                  value: ' cb-blue',
                  label: __( '青色', THEME_NAME ),
                },
                {
                  value: ' cb-green',
                  label: __( '緑色', THEME_NAME ),
                },
              ] }
            />

            <BaseControl label={ __( 'アイコン', THEME_NAME ) }>
              <div className="icon-setting-buttons">
                { times( LIST_ICONS.length, ( index ) => {
                  return (
                    <Button
                      isDefault
                      isPrimary={ icon === LIST_ICONS[index].value }
                      className={LIST_ICONS[index].label}
                      onClick={ () => {
                        setAttributes( { icon: LIST_ICONS[index].value } );
                      } }
                    >
                    </Button>
                  );
                } ) }
              </div>
            </BaseControl>

          </PanelBody>
        </InspectorControls>
        <div className={ getClasses(icon) }>
          <div className="iconlist-title">
            <RichText
                value={ title }
                placeholder={__( 'タイトルがある場合は入力', THEME_NAME )}
                onChange={ ( value ) => setAttributes( { title: value } ) }
              />
          </div>
          <InnerBlocks
          template={[
              [ 'core/list' ]
          ]}
          templateLock="all"
          allowedBlocks={ ALLOWED_BLOCKS }
           />
        </div>
      </Fragment>
    );
  },

  save( { attributes } ) {
    const { title, color, icon } = attributes;

    // const classes = classnames(
    //   {
    //     'iconlist-box': true,
    //     [ icon ]: !! icon,
    //   }
    // );

    return (
      <div className={ getClasses(icon) }>
        <div className="iconlist-title">
          <RichText.Content
            value={ title }
          />
        </div>
        <InnerBlocks.Content />
      </div>
    );
  }
} );