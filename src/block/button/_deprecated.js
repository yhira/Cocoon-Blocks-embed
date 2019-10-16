/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */
import { THEME_NAME, BUTTON_BLOCK, colorValueToSlug, getCurrentColorSlug } from '../../helpers';
import { attrs } from './_attrs';
import classnames from 'classnames';

const { merge } = lodash;
const { RichText } = wp.editor;

export const deprecated = [
  {
    attributes: attrs,

    //migrate( { content, color, size, url, target, isCircle, isShine } ) {
    migrate( attributes ) {
      const { content, color, size, url, target, isCircle, isShine } = attributes;
      //console.log(attributes);
      // return merge(
      //   attributes,
      //   {
      //     slug: colorValueToSlug(color)
      //   }
      // );
      return {
        content: content,
        //color: color,
        slug: colorValueToSlug(color),
        size: size,
        url: url,
        target: target,
        isCircle: isCircle,
        isShine: isShine
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