import classnames from 'classnames';

const {
  registerBlockType,
} = wp.blocks;
const {
  InspectorControls,
  RichText,
  withColors,
  getColorClassName,
  PanelColorSettings
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
  const {textColor, backgroundColor} = ownProps.attributes;
  const editableNode = node.querySelector('[contenteditable="true"]');
  //verify if editableNode is available, before using getComputedStyle.
  const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
  return {
    fallbackBackgroundColor: backgroundColor || !computedStyles ? undefined : computedStyles.backgroundColor,
    fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
  };
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
    } = this.props;

    console.log(backgroundColor);
    console.log(textColor);

    return (
      <div
        className={classnames(className, {
          'has-background': backgroundColor.color,
          [backgroundColor.class]: backgroundColor.class,
          [textColor.class]: textColor.class,
        })}

        style={{
          backgroundColor: backgroundColor.color,
          color: textColor.color,
        }}
      >

        <RichText
          value={ content }
          onChange={ ( value ) => {
            setAttributes( {
              content: value,
            } );
          } }
        />
        <InspectorControls>
          <PanelColorSettings
            title="'Farbschema"
            colorSettings={[
              {
                label: 'Textfarbe',
                onChange: setTextColor,
                value: textColor.color,
                disableCustomColors: true,
              },
              {
                label: 'Hintergrundfarbe',
                onChange: setBackgroundColor,
                value: backgroundColor.color,
                disableCustomColors: true,
              }
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
  category: 'layout',
  attributes: {
    content: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
  },
  edit: compose([
    withColors('backgroundColor', {textColor: 'color'}),
    FallbackStyles,
  ])(OneColumnBlock),
  save: props => {
    const {
      content,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
    } = props.attributes;

    const textClass = getColorClassName( 'color', textColor );
    const backgroundClass = getColorClassName( 'background-color', backgroundColor );

    const className = classnames( {
      'has-background': backgroundColor || customBackgroundColor,
      [ textClass ]: textClass,
      [ backgroundClass ]: backgroundClass,
    } );
    return (
      <div className={className}>
        <RichText.Content
          value={ content }
        />
      </div>
    );
  },
});