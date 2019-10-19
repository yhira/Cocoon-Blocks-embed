import classnames from 'classnames';

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
} = wp.editor;
const {
  PanelBody,
  withFallbackStyles,
  PanelColor,
  ColorPalette,
} = wp.components;

const {
  Component,
} = wp.element;

const {
  compose
} = wp.compose;

const {getComputedStyle} = window;

const FallbackStyles = withFallbackStyles((node, ownProps) => {
  const {textColor, backgroundColor, fontSize, customFontSize} = ownProps.attributes;
  const editableNode = node.querySelector('[contenteditable="true"]');
  //verify if editableNode is available, before using getComputedStyle.
  const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
  return {
    fallbackBackgroundColor: backgroundColor || !computedStyles ? undefined : computedStyles.backgroundColor,
    fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
    fallbackFontSize: fontSize || customFontSize || !computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
  }
});

class OneColumnBlock extends Component {
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
    } = attributes;

    // console.log(backgroundColor);
    // console.log(textColor);

    return (
      <div
        className={classnames(className, {
          'has-text-color': textColor.color,
          'has-background': backgroundColor.color,
          [backgroundColor.class]: backgroundColor.class,
          [textColor.class]: textColor.class,
          [fontSize.class]: fontSize.class,
        })}

        style={{
          backgroundColor: backgroundColor.color,
          color: textColor.color,
          fontSize: fontSize.size,
        }}
      >

        <RichText
          value={ content }
          onChange={ ( value ) => setAttributes( { content: value } ) }
        />
        <InspectorControls>
          <PanelBody title='文字サイズ' className="blocks-font-size">
            <FontSizePicker
              fallbackFontSize={ fallbackFontSize }
              value={ fontSize.size }
              onChange={ setFontSize }
            />
          </PanelBody>
          <PanelColorSettings
            title="色設定"
            colorSettings={[
              {
                label: '背景色',
                onChange: setBackgroundColor,
                value: backgroundColor.color,
                //disableCustomColors: true,
              },
              {
                label: '文字色',
                onChange: setTextColor,
                value: textColor.color,
                //disableCustomColors: true,
              },
            ]}
          />
        </InspectorControls>
      </div>
    );
  }
}

export default registerBlockType('slug/one-column', {
  title: 'Eine Spalte',
  icon: 'admin-post',
  category: 'cocoon-block',
  attributes: {
    content: {
      type: 'string',
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
  // supports: {
  //   className: false,
  // },
  edit: compose([
    withColors('backgroundColor', {textColor: 'color'}),
    withFontSizes('fontSize'),
    FallbackStyles,
  ])(OneColumnBlock),
  save: props => {
    const {
      content,
      backgroundColor,
      customBackgroundColor,
      textColor,
      customTextColor,
      fontSize,
      customFontSize,
    } = props.attributes;

    //console.log(props.attributes);

    const textClass = getColorClassName( 'color', textColor );
    const backgroundClass = getColorClassName( 'background-color', backgroundColor );
    const fontSizeClass = getFontSizeClass( fontSize );

    // console.log(customTextColor);
    // console.log(customBackgroundColor);

    const className = classnames( {
      'has-text-color': textColor || customTextColor,
      //[`has-text-color-${textColor}`]: textColor,
      'has-background': backgroundColor || customBackgroundColor,
      [ fontSizeClass ]: fontSizeClass,
      [ textClass ]: textClass,
      [ backgroundClass ]: backgroundClass,
    } );

    const styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };

    return (
      <div
        className={className}
        //style={ styles }
      >
        <RichText.Content
          value={ content }
        />
      </div>
    );
  },
});