/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */
import { THEME_NAME, BUTTON_BLOCK, colorValueToSlug, getCurrentColorSlug } from '../../helpers';
//import { attrs } from './_attrs';
import classnames from 'classnames';

const { __ } = wp.i18n;
// const { merge } = lodash;
const { RichText } = wp.editor;

export const deprecated = [
  {
    attributes: {
      content: {
        type: 'string',
        default: __( 'ボタン', THEME_NAME ),
      },
      url: {
        type: 'string',
        default: '',
      },
      target: {
        type: 'string',
        default: '_self',
      },
      color: {
        type: 'string',
        default: keyColor,
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
    },

    //migrate( { content, color, size, url, target, isCircle, isShine } ) {
    migrate( attributes ) {
      const { content, color, size, url, target, isCircle, isShine } = attributes;
      return {
        content: content,
        size: size,
        url: url,
        target: target,
        isCircle: isCircle,
        isShine: isShine,
        backgroundColor: color,
        customBackgroundColor: '',
        textColor: '',
        customTextColor: '',
        borderColor: '',
        customBorderColor: '',
        fontSize: '',
        customFontSize: '',
      };
    },

    save( { attributes } ) {
      const { content, color, size, url, target, isCircle, isShine } = attributes;
      const classes = classnames(
        {
          'btn': true,
          [ `btn-${ colorValueToSlug(color) }` ]: !! colorValueToSlug(color),
          [ size ]: size,
          [ 'btn-circle' ]: !! isCircle,
          [ 'btn-shine' ]: !! isShine,
        }
      );
      return (
        <div className={BUTTON_BLOCK}>
          <a
            href={ url }
            className={ classes }
            target={ target }
          >
            <RichText.Content
              value={ content }
            />
          </a>
        </div>
      );
    },
  },
];