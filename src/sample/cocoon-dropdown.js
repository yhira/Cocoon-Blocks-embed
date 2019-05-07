import { orderBy } from 'lodash';

const {Fragment}=wp.element;
const {BlockFormatControls} = wp.editor;
const {Slot,Toolbar,DropdownMenu}=wp.components;
const {registerFormatType,toggleFormat}=wp.richText;
const {__}=wp.i18n;

registerFormatType('cocoon/dropdown',{
    title:'buttons',
    tagName:'dropdown',
    className:null,
    edit({isActive,value,onChange}){

        return (
            <BlockFormatControls>
              <div className="editor-format-toolbar block-editor-format-toolbar">
                <Toolbar>
                    <Slot name="Cocoon.ToolbarControls">
                        { ( fills ) => fills.length !== 0 &&
                          <DropdownMenu
                      icon={ false }
                      position="bottom left"
                      label={ __( 'Cocoon Buttons' ) }
                      controls={ orderBy( fills.map( ( [ { props } ] ) => props ), 'title' ) }
                    />
                        }
              </Slot>
                </Toolbar>
              </div>
            </BlockFormatControls>
        );
    }
});

