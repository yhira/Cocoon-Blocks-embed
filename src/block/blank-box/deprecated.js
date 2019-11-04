/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */
import { THEME_NAME, BUTTON_BLOCK, colorValueToSlug } from '../../helpers';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;

const { createBlock } = wp.blocks;

export const deprecated = [
  {
    attributes: {
      content: {
        type: 'string',
        default: __( 'こちらをクリックしてリンクタグを設定エリア入力してください。この入力は公開ページで反映されません。', THEME_NAME ),
      },
      borderColor: {
        type: 'string',
        default: '',
      },
    },

    migrate( attributes ) {
      const { content, borderColor } = attributes;

      return {
        content: content,
        backgroundColor: undefined,
        customBackgroundColor: undefined,
        textColor: undefined,
        customTextColor: undefined,
        borderColor: colorValueToSlug(borderColor),
        customBorderColor: undefined,
        fontSize: undefined,
        customFontSize: undefined,
      };
    },

    save( { attributes } ) {
      const { borderColor } = attributes;
      const classes = classnames(
        {
          'blank-box': true,
          [ `bb-${ colorValueToSlug(borderColor) }` ]: !! colorValueToSlug(borderColor),
          [ 'block-box' ]: true,
        }
      );
      return (
        <div className={ classes }>
          <InnerBlocks.Content />
        </div>
      );
    },
  },
];