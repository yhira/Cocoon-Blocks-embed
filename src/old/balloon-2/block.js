/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import {THEME_NAME, BLOCK_CLASS, getBalloonClasses, isSameBalloon} from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, InspectorControls } = wp.editor;
const { PanelBody, SelectControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const DEFAULT_NAME = __( '未入力', THEME_NAME );

registerBlockType( 'cocoon-blocks/balloon-box-2', {

  title: __( '吹き出し', THEME_NAME ),
  icon: 'dismiss',
  category: THEME_NAME + '-old',
  description: __( '登録されている吹き出しを挿入できます。', THEME_NAME ),
  keywords: [ 'balloon', 'box' ],

  attributes: {
    name: {
      type: 'string',
      default: '',
    },
    index: {
      type: 'string',
      default: '0',
    },
    id: {
      type: 'string',
      default: '',
    },
    icon: {
      type: 'string',
      default: '',
    },
    style: {
      type: 'string',
      default: 'stn',
    },
    position: {
      type: 'string',
      default: 'l',
    },
    iconstyle: {
      type: 'string',
      default: 'cb',
    },
  },
  supports: {
    inserter: false,
  },

  edit( { attributes, setAttributes } ) {
    var { name, index, id, icon, style, position, iconstyle } = attributes;
    //新規作成時
    if (!icon && index == '0' && gbSpeechBalloons[0]) {
        id = gbSpeechBalloons[0].id;
        icon = gbSpeechBalloons[0].icon;
        style = gbSpeechBalloons[0].style;
        position = gbSpeechBalloons[0].position;
        iconstyle = gbSpeechBalloons[0].iconstyle;
        if (!name) {
          name = gbSpeechBalloons[0].name;
        }
        setAttributes( { name: name, index: index, id: id, icon: icon, style: style, position: position, iconstyle: iconstyle } );
    }
    //新規作成以外
    if (gbSpeechBalloons[index]) {
      if (isSameBalloon(index, id, icon, style, position, iconstyle)) {

        id = gbSpeechBalloons[index].id;
        icon = gbSpeechBalloons[index].icon;
        style = gbSpeechBalloons[index].style;
        position = gbSpeechBalloons[index].position;
        iconstyle = gbSpeechBalloons[index].iconstyle;
        if (!name) {
          name = gbSpeechBalloons[index].name;
        }
        setAttributes( { index: index, id: id, icon: icon, style: style, position: position, iconstyle: iconstyle } );
      }
    }

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
              onChange={ ( value ) => setAttributes( {
                index: value,
                name: gbSpeechBalloons[value].name,
                id: gbSpeechBalloons[value].id,
                icon: gbSpeechBalloons[value].icon,
                style: gbSpeechBalloons[value].style,
                position: gbSpeechBalloons[value].position,
                iconstyle: gbSpeechBalloons[value].iconstyle } ) }
              options={ balloons }
            />

          </PanelBody>
        </InspectorControls>

        <div
          className={ getBalloonClasses(id, style, position, iconstyle) }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={icon}
                alt={name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText
                value={ name }
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
    const { name, index, id, icon, style, position, iconstyle } = attributes;
    return (
        <div
          className={ getBalloonClasses(id, style, position, iconstyle) }>
          <div className="speech-person">
            <figure className="speech-icon">
              <img
                src={icon}
                alt={name}
                className="speech-icon-image"
              />
            </figure>
            <div className="speech-name">
              <RichText.Content
                value={ name }
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