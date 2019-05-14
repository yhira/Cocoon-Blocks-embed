/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, ShortcodeToolbarButton } from '../helpers.js';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerFormatType, insert } = wp.richText;
const { BlockFormatControls } = wp.editor;
const { Slot, Toolbar, DropdownMenu } = wp.components;
const FORMAT_TYPE_NAME = 'cocoon-blocks/shortcodes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { orderBy } from 'lodash';

var name = 'shortcode-ad';
var title = __( '広告', THEME_NAME );
var formatType = 'cocoon-blocks/' + name;
registerFormatType( formatType, {
  title: title,
  tagName: name,
  className: null,
  edit({value, onChange}){
    const onToggle = () => onChange( insert( value, '[ad]', value.start, value.end ) );

    return (
      <Fragment>
        <ShortcodeToolbarButton
          icon={<FontAwesomeIcon icon={['fas', 'ad']} />}
          title={<span className={name}>{title}</span>}
          onClick={ onToggle }
        />
      </Fragment>
    );
  }
} );

registerFormatType( FORMAT_TYPE_NAME, {
  title: __( 'アフィリエイト', THEME_NAME ),
  tagName: 'span',
  className: 'shortcodes',
  edit({isActive, value, onChange}){

    return (
      <BlockFormatControls>
        <div className="editor-format-toolbar block-editor-format-toolbar">
          <Toolbar>
            <Slot name="Shortcode.ToolbarControls">
              { ( fills ) => fills.length !== 0 &&
                <DropdownMenu
                  icon={<FontAwesomeIcon icon={['fas', 'code']} />}
                  label={__( 'ショートコード', THEME_NAME )}
                  className='shortcodes'
                  controls={ orderBy( fills.map( ( [ { props } ] ) => props ), 'title' ) }
                />
              }
            </Slot>
          </Toolbar>
        </div>
      </BlockFormatControls>
    );
  }
} );