/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, BLOCK_CLASS} from '../../helpers.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const DEFAULT_NAME = __( '未入力', THEME_NAME );

//classの取得
function getClasses(index) {
  const classes = classnames(
    {
      [ 'speech-wrap' ]: true,
      [ `sb-id-${ speechBaloons[index].id }` ]: !! speechBaloons[index].id,
      [ `sbs-${ speechBaloons[index].style  }` ]: !! speechBaloons[index].style ,
      [ `sbp-${ speechBaloons[index].position  }` ]: !! speechBaloons[index].position ,
      [ `sbis-${ speechBaloons[index].iconstyle  }` ]: !! speechBaloons[index].iconstyle ,
      [ 'cf' ]: true,
      [ 'block-box' ]: true,
    }
  );
  return classes;
}

registerBlockType( 'cocoon-blocks/balloon-box-1', {

  title: __( '吹き出し', THEME_NAME ),
  icon: <FontAwesomeIcon icon={['far', 'comment']} />,
  category: THEME_NAME + '-block',
  description: __( '登録されている吹き出しを挿入できます。', THEME_NAME ),

  attributes: {
    name: {
      type: 'string',
      default: '',
    },
    index: {
      type: 'string',
      default: '0',
    },
  },

  edit( { attributes, setAttributes } ) {
    const { name, index } = attributes;

    //console.log(speechBaloons);
    var balloons = [];
    speechBaloons.map((balloon, index) => {
      //console.log(balloon);
      if (speechBaloons[index].visible == '1') {
        balloons.push({
          value: index,
          label: balloon.title,
        });
      }

    });
    //console.log(balloons);

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'スタイル設定', THEME_NAME ) }>

            <SelectControl
              label={ __( '人物', THEME_NAME ) }
              value={ index }
              onChange={ ( value ) => setAttributes( { index: value } ) }
              options={ balloons }
            />

          </PanelBody>
        </InspectorControls>

        <div
          className={ getClasses(index) }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={speechBaloons[index].icon}
                alt={speechBaloons[index].name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText
                value={ name ? name : speechBaloons[index].name }
                placeholder={DEFAULT_NAME}
                onChange={ ( value ) => setAttributes( { name: value } ) }
              />
            </div>
          </div>
          <div className="speech-balloon">
            <InnerBlocks />
          </div>
        </div>

      </Fragment>
    );
  },

  save( { attributes } ) {
    const { name, index } = attributes;
    return (
        <div
          className={ getClasses(index) }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={speechBaloons[index].icon}
                alt={speechBaloons[index].name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText.Content
                value={ name ? name : speechBaloons[index].name }
              />
            </div>
          </div>
          <div className="speech-balloon">
            <InnerBlocks.Content />
          </div>
        </div>
    );
  }
} );