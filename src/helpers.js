/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

const { __ } = wp.i18n;
const { Fill, ToolbarButton } = wp.components;
const { getColorObjectByColorValue } = wp.editor;
const { displayShortcut } = wp.keycodes;
import classnames from 'classnames';

export const THEME_NAME = 'cocoon';
export const BLOCK_CLASS = ' block-box';
export const BUTTON_BLOCK = 'button-block';
export const LAYOUT_BLOCK_CLASS = 'layout-box';
export const PARAGRAPH_CLASS = ' paragraph';

//日時をもとにしたID作成
export function getDateID(){
  //Dateオブジェクトを利用
  var d = new Date();
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var month = ( month          < 10 ) ? '0' + month          : month;
  var day   = ( d.getDate()    < 10 ) ? '0' + d.getDate()    : d.getDate();
  var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  var dateID = '' + year + month + day + hour + min + sec;
  return dateID;
}

//アイコンクラス文字列を取得
export function getIconClass(icon){
  return icon ? (' ' + icon) : '';
}

//バルーンclassの取得
export function getBalloonClasses(id, style, position, iconstyle) {
  const classes = classnames(
    {
      [ 'speech-wrap' ]: true,
      [ `sb-id-${ id }` ]: !! id,
      [ `sbs-${ style  }` ]: !! style ,
      [ `sbp-${ position  }` ]: !! position ,
      [ `sbis-${ iconstyle  }` ]: !! iconstyle ,
      [ 'cf' ]: true,
      [ 'block-box' ]: true,
    }
  );
  return classes;
}

//オブジェクト吹き出しと保存した吹き出しの情報が同じか
export function isSameBalloon(index, id, icon, style, position, iconstyle) {
  if (speechBaloons[index]) {
    if (
      speechBaloons[index].id == id &&
      speechBaloons[index].icon == icon &&
      speechBaloons[index].style == style &&
      speechBaloons[index].position == position &&
      speechBaloons[index].iconstyle == iconstyle

    ) {
      return true;
    }
  }
  return false;
}

//現在のカラーパレットのスラッグを取得
export function getCurrentColorSlug(color){
  let object = getColorObjectByColorValue(cocoonPaletteColors, color);
  let slug = object.slug;
  if (!slug) {
    slug = 'key-color';
  }
  return slug;
}

//色からスラッグを取得
export function colorValueToSlug(color){
  switch (color) {
    case keyColor:
      return 'key-color';
      break;
    case '#e60033':
      return 'red';
      break;
    case '#e95295':
      return 'pink';
      break;
    case '#884898':
      return 'purple';
      break;
    case '#55295b':
      return 'deep';
      break;
    case '#1e50a2':
      return 'indigo';
      break;
    case '#0095d9':
      return 'blue';
      break;
    case '#2ca9e1':
      return 'light-blue';
      break;
    case '#00a3af':
      return 'cyan';
      break;
    case '#007b43':
      return 'teal';
      break;
    case '#3eb370':
      return 'green';
      break;
    case '#8bc34a':
      return 'light-green';
      break;
    case '#c3d825':
      return 'lime';
      break;
    case '#ffd900':
      return 'yellow';
      break;
    case '#ffc107':
      return 'amber';
      break;
    case '#f39800':
      return 'orange';
      break;
    case '#ea5506':
      return 'deep-orange';
      break;
    case '#954e2a':
      return 'brown';
      break;
    case '#949495':
      return 'grey';
      break;
    case '#333333':
      return 'black';
      break;
    case '#ffffff':
      return 'white';
      break;
    default:
      return 'color--' + color.replace('#', '');
      break;
  }
}

export const ICONS = [
  {
    value: '',
    label: 'fab-none',
  },
  {
    value: 'fab-info-circle',
    label: __( 'fab-info-circle', THEME_NAME ),
  },
  {
    value: 'fab-question-circle',
    label: __( 'fab-question-circle', THEME_NAME ),
  },
  {
    value: 'fab-exclamation-circle',
    label: __( 'fab-exclamation-circle', THEME_NAME ),
  },
  {
    value: 'fab-pencil',
    label: __( 'fab-pencil', THEME_NAME ),
  },
  {
    value: 'fab-edit',
    label: __( 'fab-edit', THEME_NAME ),
  },
  {
    value: 'fab-comment',
    label: __( 'fab-comment', THEME_NAME ),
  },
  {
    value: 'fab-ok',
    label: __( 'fab-ok', THEME_NAME ),
  },
  {
    value: 'fab-bad',
    label: __( 'fab-bad', THEME_NAME ),
  },
  {
    value: 'fab-thumbs-up',
    label: __( 'fab-thumbs-up', THEME_NAME ),
  },
  {
    value: 'fab-thumbs-down',
    label: __( 'fab-thumbs-down', THEME_NAME ),
  },
  {
    value: 'fab-check',
    label: __( 'fab-check', THEME_NAME ),
  },
  {
    value: 'fab-star',
    label: __( 'fab-star', THEME_NAME ),
  },
  {
    value: 'fab-bell',
    label: __( 'fab-bell', THEME_NAME ),
  },
  {
    value: 'fab-trophy',
    label: __( 'fab-trophy', THEME_NAME ),
  },
  {
    value: 'fab-lightbulb',
    label: __( 'fab-lightbulb', THEME_NAME ),
  },
  {
    value: 'fab-graduation-cap',
    label: __( 'fab-graduation-cap', THEME_NAME ),
  },
  {
    value: 'fab-bolt',
    label: __( 'fab-bolt', THEME_NAME ),
  },
  {
    value: 'fab-bookmark',
    label: __( 'fab-bookmark', THEME_NAME ),
  },
  {
    value: 'fab-book',
    label: __( 'fab-book', THEME_NAME ),
  },
  {
    value: 'fab-download',
    label: __( 'fab-download', THEME_NAME ),
  },
  {
    value: 'fab-coffee',
    label: __( 'fab-coffee', THEME_NAME ),
  },
  {
    value: 'fab-amazon',
    label: __( 'fab-amazon', THEME_NAME ),
  },
  {
    value: 'fab-user',
    label: __( 'fab-user', THEME_NAME ),
  },
  {
    value: 'fab-envelope',
    label: __( 'fab-envelope', THEME_NAME ),
  },
  {
    value: 'fab-flag',
    label: __( 'fab-flag', THEME_NAME ),
  },
  {
    value: 'fab-ban',
    label: __( 'fab-ban', THEME_NAME ),
  },
  {
    value: 'fab-calendar',
    label: __( 'fab-calendar', THEME_NAME ),
  },
  {
    value: 'fab-clock',
    label: __( 'fab-clock', THEME_NAME ),
  },
  {
    value: 'fab-cutlery',
    label: __( 'fab-cutlery', THEME_NAME ),
  },
  {
    value: 'fab-heart',
    label: __( 'fab-heart', THEME_NAME ),
  },
  {
    value: 'fab-camera',
    label: __( 'fab-camera', THEME_NAME ),
  },
  {
    value: 'fab-search',
    label: __( 'fab-search', THEME_NAME ),
  },
  {
    value: 'fab-file-text',
    label: __( 'fab-file-text', THEME_NAME ),
  },
  {
    value: 'fab-folder',
    label: __( 'fab-folder', THEME_NAME ),
  },
  {
    value: 'fab-tag',
    label: __( 'fab-tag', THEME_NAME ),
  },
  {
    value: 'fab-car',
    label: __( 'fab-car', THEME_NAME ),
  },
  {
    value: 'fab-truck',
    label: __( 'fab-truck', THEME_NAME ),
  },
  {
    value: 'fab-bicycle',
    label: __( 'fab-bicycle', THEME_NAME ),
  },
  {
    value: 'fab-motorcycle',
    label: __( 'fab-motorcycle', THEME_NAME ),
  },
  {
    value: 'fab-bus',
    label: __( 'fab-bus', THEME_NAME ),
  },
  {
    value: 'fab-plane',
    label: __( 'fab-plane', THEME_NAME ),
  },
  {
    value: 'fab-train',
    label: __( 'fab-train', THEME_NAME ),
  },
  {
    value: 'fab-subway',
    label: __( 'fab-subway', THEME_NAME ),
  },
  {
    value: 'fab-taxi',
    label: __( 'fab-taxi', THEME_NAME ),
  },
  {
    value: 'fab-ship',
    label: __( 'fab-ship', THEME_NAME ),
  },
  {
    value: 'fab-jpy',
    label: __( 'fab-jpy', THEME_NAME ),
  },
  {
    value: 'fab-usd',
    label: __( 'fab-usd', THEME_NAME ),
  },
  {
    value: 'fab-eur',
    label: __( 'fab-eur', THEME_NAME ),
  },
  {
    value: 'fab-btc',
    label: __( 'fab-btc', THEME_NAME ),
  },
  {
    value: 'fab-apple',
    label: __( 'fab-apple', THEME_NAME ),
  },
  {
    value: 'fab-android',
    label: __( 'fab-android', THEME_NAME ),
  },
  {
    value: 'fab-wordpress',
    label: __( 'fab-wordpress', THEME_NAME ),
  },
];
















export const LIST_ICONS = [
  {
    value: 'list-caret-right',
    label: __( 'fab-caret-right', THEME_NAME ),
  },
  {
    value: 'list-check',
    label: __( 'fab-check', THEME_NAME ),
  },
  {
    value: 'list-check-circle',
    label: __( 'fab-check-circle', THEME_NAME ),
  },
  {
    value: 'list-check-circle-o',
    label: __( 'fab-check-circle-o', THEME_NAME ),
  },
  {
    value: 'list-check-square',
    label: __( 'fab-check-square', THEME_NAME ),
  },
  {
    value: 'list-check-square-o',
    label: __( 'fab-check-square-o', THEME_NAME ),
  },
  {
    value: 'list-caret-square-o-right',
    label: __( 'fab-caret-square-o-right', THEME_NAME ),
  },
  {
    value: 'list-arrow-right',
    label: __( 'fab-arrow-right', THEME_NAME ),
  },
  {
    value: 'list-angle-right',
    label: __( 'fab-angle-right', THEME_NAME ),
  },
  {
    value: 'list-angle-double-right',
    label: __( 'fab-angle-double-right', THEME_NAME ),
  },
  {
    value: 'list-arrow-circle-right',
    label: __( 'fab-arrow-circle-right', THEME_NAME ),
  },
  {
    value: 'list-arrow-circle-o-right',
    label: __( 'fab-arrow-circle-o-right', THEME_NAME ),
  },
  {
    value: 'list-play-circle',
    label: __( 'fab-play-circle', THEME_NAME ),
  },
  {
    value: 'list-play-circle-o',
    label: __( 'fab-play-circle-o', THEME_NAME ),
  },
  {
    value: 'list-chevron-right',
    label: __( 'fab-chevron-right', THEME_NAME ),
  },
  {
    value: 'list-chevron-circle-right',
    label: __( 'fab-chevron-circle-right', THEME_NAME ),
  },
  {
    value: 'list-hand-o-right',
    label: __( 'fab-hand-o-right', THEME_NAME ),
  },
  {
    value: 'list-star',
    label: __( 'fab-star', THEME_NAME ),
  },
  {
    value: 'list-star-o',
    label: __( 'fab-star-o', THEME_NAME ),
  },
  {
    value: 'list-heart',
    label: __( 'fab-heart', THEME_NAME ),
  },
  {
    value: 'list-heart-o',
    label: __( 'fab-heart-o', THEME_NAME ),
  },
  {
    value: 'list-square',
    label: __( 'fab-square', THEME_NAME ),
  },
  {
    value: 'list-square-o',
    label: __( 'fab-square-o', THEME_NAME ),
  },
  {
    value: 'list-circle',
    label: __( 'fab-circle', THEME_NAME ),
  },
  {
    value: 'list-circle-o',
    label: __( 'fab-circle-o', THEME_NAME ),
  },
  {
    value: 'list-dot-circle-o',
    label: __( 'fab-dot-circle-o', THEME_NAME ),
  },
  {
    value: 'list-plus',
    label: __( 'fab-plus', THEME_NAME ),
  },
  {
    value: 'list-plus-circle',
    label: __( 'fab-plus-circle', THEME_NAME ),
  },
  {
    value: 'list-plus-square',
    label: __( 'fab-plus-square', THEME_NAME ),
  },
  {
    value: 'list-plus-square-o',
    label: __( 'fab-plus-square-o', THEME_NAME ),
  },
  {
    value: 'list-minus',
    label: __( 'fab-minus', THEME_NAME ),
  },
  {
    value: 'list-minus-circle',
    label: __( 'fab-minus-circle', THEME_NAME ),
  },
  {
    value: 'list-minus-square',
    label: __( 'fab-minus-square', THEME_NAME ),
  },
  {
    value: 'list-minus-square-o',
    label: __( 'fab-minus-square-o', THEME_NAME ),
  },
  {
    value: 'list-times',
    label: __( 'fab-times', THEME_NAME ),
  },
  {
    value: 'list-times-circle',
    label: __( 'fab-times-circle', THEME_NAME ),
  },
  {
    value: 'list-times-circle-o',
    label: __( 'fab-times-circle-o', THEME_NAME ),
  },
  {
    value: 'list-window-close',
    label: __( 'fab-window-close', THEME_NAME ),
  },
  {
    value: 'list-window-close-o',
    label: __( 'fab-window-close-o', THEME_NAME ),
  },
];

export function LetterToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Letter.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}

export function MarkerToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Marker.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}

export function BadgeToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Badge.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}


export function FontSizeToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'FontSize.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}


export function AffiliateToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Affiliate.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}


export function TemplateToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Template.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}


export function ShortcodeToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Shortcode.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}


export function RankingToolbarButton( { name, shortcutType, shortcutCharacter, ...props } ) {
  let shortcut;
  let fillName = 'Ranking.ToolbarControls';

  if ( name ) {
    fillName += `.${ name }`;
  }

  if ( shortcutType && shortcutCharacter ) {
    shortcut = displayShortcut[ shortcutType ]( shortcutCharacter );
  }

  return (
    <Fill name={ fillName }>
      <ToolbarButton
        { ...props }
        shortcut={ shortcut }
      />
    </Fill>
  );
}



