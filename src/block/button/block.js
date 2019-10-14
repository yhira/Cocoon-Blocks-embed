/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, BUTTON_BLOCK, getCurrentColorSlug } from '../../helpers';
import { attrs } from './_attrs';
import { deprecated } from './_deprecated';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { merge } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, SelectControl, BaseControl, TextControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;

//classの取得
function getClasses(slug, size, isCircle, isShine) {
  const classes = classnames(
    {
      'btn': true,
      [ `has-${ slug }` ]: !! slug,
      [ size ]: size,
      [ 'btn-circle' ]: !! isCircle,
      [ 'btn-shine' ]: !! isShine,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/button-1', {

  title: __( 'ボタン', THEME_NAME ),
  icon: 'embed-generic',
  category: THEME_NAME + '-block',
  description: __( '一般的なリンクボタンを作成します。', THEME_NAME ),
  keywords: [ 'button', 'btn' ],

  attributes: merge(
    attrs,
    {
      slug: {
        type: 'string',
        default: getCurrentColorSlug(keyColor),
      },
    },
  ),
  supports: {
    align: [ 'left', 'center', 'right' ],
    customClassName: true,
  },

  edit( { attributes, setAttributes } ) {
    const { content, color, slug, size, url, target, isCircle, isShine } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'ボタン設定', THEME_NAME ) }>

            <TextControl
              label={ __( 'URL', THEME_NAME ) }
              value={ url }
              onChange={ ( value ) => setAttributes( { url: value } ) }
            />

            <SelectControl
              label={ __( 'リンクの開き方', THEME_NAME ) }
              value={ target }
              onChange={ ( value ) => setAttributes( { target: value } ) }
              options={ [
                {
                  value: '_self',
                  label: __( '現在のタブで開く', THEME_NAME ),
                },
                {
                  value: '_blank',
                  label: __( '新しいタブで開く', THEME_NAME ),
                },
              ] }
            />

            <SelectControl
              label={ __( 'サイズ', THEME_NAME ) }
              value={ size }
              onChange={ ( value ) => setAttributes( { size: value } ) }
              options={ [
                {
                  value: 'btn-s',
                  label: __( '小', THEME_NAME ),
                },
                {
                  value: 'btn-m',
                  label: __( '中', THEME_NAME ),
                },
                {
                  value: 'btn-l',
                  label: __( '大', THEME_NAME ),
                },
              ] }
            />

            <ToggleControl
              label={ __( '円形にする', THEME_NAME ) }
              checked={ isCircle }
              onChange={ ( value ) => setAttributes( { isCircle: value } ) }
            />

            <ToggleControl
              label={ __( '光らせる', THEME_NAME ) }
              checked={ isShine }
              onChange={ ( value ) => setAttributes( { isShine: value } ) }
            />

          </PanelBody>

          <PanelColorSettings
            title={ __( '色設定', THEME_NAME ) }
            initialOpen={ true }
            colorSettings={ [
              {
                value: slug,
                onChange: ( value ) => setAttributes( {
                  slug: getCurrentColorSlug(value)
                } ),
                label: __( '色', THEME_NAME ),
              },
            ] }
          >
            <ContrastChecker
              color={ color }
            />
          </PanelColorSettings>

        </InspectorControls>

        <div className={BUTTON_BLOCK}>
          <span
            className={ getClasses(slug, size, isCircle, isShine) }
            href={ url }
            target={ target }
          >
            <RichText
              value={ content }
              onChange={ ( value ) => setAttributes( { content: value } ) }
            />
          </span>
        </div>

      </Fragment>
    );
  },

  save( { attributes } ) {
    const { content, color, slug, size, url, target, isCircle, isShine } = attributes;
    return (
      <div className={BUTTON_BLOCK}>
        <a
          href={ url }
          className={ getClasses(slug, size, isCircle, isShine) }
          target={ target }
        >
          <RichText.Content
            value={ content }
          />
        </a>
      </div>
    );
  },

  deprecated: deprecated,
} );