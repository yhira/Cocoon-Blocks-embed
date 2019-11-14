/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, BLOCK_CLASS} from '../../helpers';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const DEFAULT_NAME = __( '未入力', THEME_NAME );
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

registerBlockType( 'cocoon-blocks/balloon-box', {

  title: __( '吹き出し', THEME_NAME ),
  icon: 'dismiss',
  category: THEME_NAME + '-old',
  description: __( '登録されている吹き出しを挿入できます。', THEME_NAME ),

  attributes: {
    content: {
      type: 'string',
      selector: 'div',
      default: '',
    },
    index: {
      type: 'string',
      default: '0',
    },
  },
  supports: {
    inserter: false,
  },

  edit( { attributes, setAttributes } ) {
    const { content, index } = attributes;

    //console.log(gbSpeechBalloons);
    var balloons = [];
    gbSpeechBalloons.map((balloon, index) => {
      //console.log(balloon);
      if (gbSpeechBalloons[index].visible == '1') {
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
          className={
            "speech-wrap sb-id-" + gbSpeechBalloons[index].id +
            " sbs-" + gbSpeechBalloons[index].style +
            " sbp-" + gbSpeechBalloons[index].position +
            " sbis-" + gbSpeechBalloons[index].iconindex +
            " cf" +
            BLOCK_CLASS
          }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={gbSpeechBalloons[index].icon}
                alt={gbSpeechBalloons[index].name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText
                value={ content ? content : gbSpeechBalloons[index].name }
                placeholder={DEFAULT_NAME}
                onChange={ ( value ) => setAttributes( { content: value } ) }
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
    const { content, index } = attributes;
    return (
        <div
          className={
            "speech-wrap sb-id-" + gbSpeechBalloons[index].id +
            " sbs-" + gbSpeechBalloons[index].style +
            " sbp-" + gbSpeechBalloons[index].position +
            " sbis-" + gbSpeechBalloons[index].iconindex +
            " cf" +
            BLOCK_CLASS
          }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={gbSpeechBalloons[index].icon}
                alt={gbSpeechBalloons[index].name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText.Content
                value={ content ? content : gbSpeechBalloons[index].name }
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