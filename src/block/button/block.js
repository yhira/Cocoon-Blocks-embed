/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, BUTTON_BLOCK, btfFallbackStyles } from '../../helpers';
// import { attrs } from './_attrs';
import { deprecated } from './deprecated';
import classnames from 'classnames';


const { __ } = wp.i18n;
const {
  registerBlockType,
} = wp.blocks;
const {
  InspectorControls,
  RichText,
  withColors,
  getColorClassName,
  PanelColorSettings,
  getFontSizeClass,
  withFontSizes,
  FontSizePicker,
  ContrastChecker,
} = wp.editor;
const {
  PanelBody,
  //withFallbackStyles,
  PanelColor,
  ColorPalette,
  SelectControl,
  TextControl,
  ToggleControl
} = wp.components;

const {
  Component,
  Fragment,
} = wp.element;

const {
  compose
} = wp.compose;


class CocoonButtonBlock extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes,
      setAttributes,
      mergeBlocks,
      onReplace,
      className,
      backgroundColor,
      textColor,
      setBackgroundColor,
      setTextColor,
      fallbackBackgroundColor,
      fallbackTextColor,
      fallbackFontSize,
      fontSize,
      setFontSize,
    } = this.props;

    const {
      content,
      size,
      url,
      target,
      isCircle,
      isShine,
    } = attributes;

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

          <PanelBody title={ __( '文字サイズ', THEME_NAME ) } className="blocks-font-size">
            <FontSizePicker
              fallbackFontSize={ fallbackFontSize }
              value={ fontSize.size }
              onChange={ setFontSize }
            />
          </PanelBody>

          <PanelColorSettings
            title={ __( '色', THEME_NAME ) }
            colorSettings={[
              {
                label: __( '背景色', THEME_NAME ),
                onChange: setBackgroundColor,
                value: backgroundColor.color,
              },
              {
                label: __( '文字色', THEME_NAME ),
                onChange: setTextColor,
                value: textColor.color,
              },
            ]}
          />
        </InspectorControls>

        <div className={BUTTON_BLOCK}>
          <span
            className={classnames(className, {
              'btn': true,
              [ size ]: size,
              [ 'btn-circle' ]: !! isCircle,
              [ 'btn-shine' ]: !! isShine,
              'has-text-color': textColor.color,
              'has-background': backgroundColor.color,
              [backgroundColor.class]: backgroundColor.class,
              [textColor.class]: textColor.class,
              [fontSize.class]: fontSize.class,
            })}
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
  }
}

registerBlockType( 'cocoon-blocks/button-1', {

  title: __( 'ボタン', THEME_NAME ),
  icon: 'embed-generic',
  category: THEME_NAME + '-block',
  description: __( '一般的なリンクボタンを作成します。', THEME_NAME ),
  keywords: [ 'button', 'btn' ],

  attributes: {
    content: {
      type: 'string',
    },
    url: {
      type: 'string',
      default: '',
    },
    target: {
      type: 'string',
      default: '_self',
    },
    size: {
      type: 'string',
      default: '',
    },
    isCircle: {
      type: 'boolean',
      default: false,
    },
    isShine: {
      type: 'boolean',
      default: false,
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    fontSize: {
      type: 'string',
    },
    customFontSize: {
      type: 'string',
    },
  },
  supports: {
    align: [ 'left', 'center', 'right' ],
    customClassName: true,
  },

  edit: compose([
    withColors('backgroundColor', {textColor: 'color'}),
    withFontSizes('fontSize'),
    btfFallbackStyles,
  ])(CocoonButtonBlock),
  save: props => {
    const {
      content,
      size,
      url,
      target,
      isCircle,
      isShine,
      backgroundColor,
      customBackgroundColor,
      textColor,
      customTextColor,
      fontSize,
      customFontSize,
    } = props.attributes;

    const textClass = getColorClassName( 'color', textColor );
    const backgroundClass = getColorClassName( 'background-color', backgroundColor );
    const fontSizeClass = getFontSizeClass( fontSize );


    const className = classnames( {
      'btn': true,
      [ size ]: size,
      [ 'btn-circle' ]: !! isCircle,
      [ 'btn-shine' ]: !! isShine,
      'has-text-color': textColor || customTextColor,
      [ textClass ]: textClass,
      'has-background': backgroundColor || customBackgroundColor,
      [ backgroundClass ]: backgroundClass,
      [ fontSizeClass ]: fontSizeClass,
    } );

    return (
      <div className={BUTTON_BLOCK}>
        <a
          href={ url }
          className={ className }
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
});