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

//ショートコード作成関数
function registerShortcodeFormatType(name, title, code, icon) {
  var formatType = 'cocoon-blocks/' + name;
  registerFormatType( formatType, {
    title: title,
    tagName: name,
    className: null,
    edit({value, onChange}){
      const onToggle = () => onChange( insert( value, code, value.start, value.end ) );

      return (
        <Fragment>
          <ShortcodeToolbarButton
            icon={<FontAwesomeIcon icon={icon} />}
            title={<span className={name}>{title}</span>}
            onClick={ onToggle }
          />
        </Fragment>
      );
    }
  } );
}
//広告
registerShortcodeFormatType(
  'shortcode-ad',
  __( '広告', THEME_NAME ),
  '[ad]',
  ['fas', 'ad']
);
//新着記事一覧
registerShortcodeFormatType(
  'shortcode-new-list',
  __( '新着記事一覧', THEME_NAME ),
  '[new_list count="5" type="default" cats="all" children="0" post_type="post"]',
  ['fas', 'th-list']
);
//人気記事一覧
registerShortcodeFormatType(
  'shortcode-popular-list',
  __( '人気記事一覧', THEME_NAME ),
  '[popular_list days="all" rank="0" pv="0" count="5" type="default" cats="all"]',
  ['fas', 'th-list']
);
//プロフィールボックス
registerShortcodeFormatType(
  'shortcode-profile',
  __( 'プロフィールボックス', THEME_NAME ),
  '[author_box label="' + __( 'この記事を書いた人', THEME_NAME ) + ']',
  ['fas', 'user-circle']
);
//Amazonリンク
registerShortcodeFormatType(
  'shortcode-amazon',
  __( 'Amazonリンク', THEME_NAME ),
  '[amazon asin="ASIN" kw="' + __( 'キーワード', THEME_NAME ) + '"]',
  ['fab', 'amazon']
);
//Amazonリンク（商品名変更）
registerShortcodeFormatType(
  'shortcode-amazon-title',
  __( 'Amazonリンク（商品名変更）', THEME_NAME ),
  '[amazon asin="ASIN" title="' + __( '商品名', THEME_NAME ) + '" kw="' + __( 'キーワード', THEME_NAME ) + '"]',
  ['fab', 'amazon']
);
//Amazonリンク（ボタン非表示）
registerShortcodeFormatType(
  'shortcode-amazon-no-buttons',
  __( 'Amazonリンク（ボタン非表示）', THEME_NAME ),
  '[amazon asin="ASIN" kw="' + __( 'キーワード', THEME_NAME ) + '" amazon=0 rakuten=0 yahoo=0]',
  ['fab', 'amazon']
);
//楽天リンク
registerShortcodeFormatType(
  'shortcode-rakuten',
  __( '楽天リンク', THEME_NAME ),
  '[rakuten id="ID" kw="' + __( 'キーワード', THEME_NAME ) + '"]',
  ['fas', 'registered']
);
//楽天リンク（商品名変更）
registerShortcodeFormatType(
  'shortcode-rakuten-title',
  __( '楽天リンク（商品名変更）', THEME_NAME ),
  '[rakuten id="ID" title="' + __( '商品名', THEME_NAME ) + '" kw="' + __( 'キーワード', THEME_NAME ) + '"]',
  ['fas', 'registered']
);
//楽天リンク（ボタン非表示）
registerShortcodeFormatType(
  'shortcode-rakuten-no-buttons',
  __( '楽天リンク（ボタン非表示）', THEME_NAME ),
  '[rakuten id="ID" kw="' + __( 'キーワード', THEME_NAME ) + '" amazon=0 rakuten=0 yahoo=0]',
  ['fas', 'registered']
);
//過去日時
registerShortcodeFormatType(
  'shortcode-ago',
  __( '過去日時', THEME_NAME ),
  '[ago from="YYYY/MM/DD"]',
  ['fas', 'calendar-alt']
);
//過去日時（年）
registerShortcodeFormatType(
  'shortcode-yago',
  __( '過去日時（年）', THEME_NAME ),
  '[yago from="YYYY/MM/DD"]',
  ['fas', 'calendar-alt']
);
//年齢
registerShortcodeFormatType(
  'shortcode-age',
  __( '年齢', THEME_NAME ),
  '[age birth="YYYY/MM/DD"]',
  ['fas', 'birthday-cake']
);
//カウントダウン
registerShortcodeFormatType(
  'shortcode-countdown',
  __( 'カウントダウン', THEME_NAME ),
  '[countdown to="YYYY/MM/DD"]',
  ['fas', 'calendar-day']
);
//評価スター
registerShortcodeFormatType(
  'shortcode-star',
  __( '評価スター', THEME_NAME ),
  '[star rate="3.7" max="5" number="1"]',
  ['fas', 'star']
);
//ログインコンテンツ
registerShortcodeFormatType(
  'shortcode-login',
  __( 'ログインコンテンツ', THEME_NAME ),
  '[login_user_only msg="' + __( 'こちらのコンテンツはログインユーザーのみに表示されます。', THEME_NAME ) + '"]' +__( '内容', THEME_NAME )  + '[/login_user_only]',
  ['fas', 'sign-in-alt']
);

// //XXXXXXXXX
// registerShortcodeFormatType(
//   'shortcode-',
//   __( 'XXXXXXXXX', THEME_NAME ),
//   '',
//   ['fas', '']
// );

// var name = 'shortcode-ad';
// var title = __( '広告', THEME_NAME );
// var formatType = 'cocoon-blocks/' + name;
// registerFormatType( formatType, {
//   title: title,
//   tagName: name,
//   className: null,
//   edit({value, onChange}){
//     const onToggle = () => onChange( insert( value, '[ad]', value.start, value.end ) );

//     return (
//       <Fragment>
//         <ShortcodeToolbarButton
//           icon={<FontAwesomeIcon icon={['fas', 'ad']} />}
//           title={<span className={name}>{title}</span>}
//           onClick={ onToggle }
//         />
//       </Fragment>
//     );
//   }
// } );

if (isGeneralVisible) {
  registerFormatType( FORMAT_TYPE_NAME, {
    title: __( '汎用ショートコード', THEME_NAME ),
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
}
