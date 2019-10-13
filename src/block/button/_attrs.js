/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, getCurrentColorSlug } from '../../helpers';
const { __ } = wp.i18n;

export const attrs = {
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
  slug: {
    type: 'string',
    default: getCurrentColorSlug(keyColor),
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
};