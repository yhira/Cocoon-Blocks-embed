const {Fragment}=wp.element;
const {RichText} = wp.editor;
const {registerFormatType,toggleFormat}=wp.richText;
const {__}=wp.i18n;

import { LetterToolbarButton } from '../helpers.js';

registerFormatType('cocoon/small',{
    title:'small',
    tagName:'span',
    className:'co-small',
    edit({isActive,value,onChange}){
        const onToggle=()=>onChange(toggleFormat(value,{type:'cocoon/small'}));

        return (
            <Fragment>
              <LetterToolbarButton
                    icon={'admin-tools'}
                    title={'small'}
                    onClick={onToggle}
                    isActive={isActive}
              />
            </Fragment>
        );
    }
});

registerFormatType('cocoon/large',{
    title:'large',
    tagName:'span',
    className:'co-large',
    edit({isActive,value,onChange}){
        const onToggle=()=>onChange(toggleFormat(value,{type:'cocoon/large'}));

        return (
            <Fragment>
              <LetterToolbarButton
                    icon={'admin-network'}
                    title={'large'}
                    onClick={onToggle}
                    isActive={isActive}
              />
            </Fragment>
        );
    }
});