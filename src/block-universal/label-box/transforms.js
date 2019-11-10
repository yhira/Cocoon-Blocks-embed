const { createBlock } = wp.blocks;

export const transforms = {
  to: [
    {
      type: 'block',
      blocks: [ 'cocoon-blocks/caption-box-1' ],
      transform: ( attributes ) => {
        return createBlock( 'cocoon-blocks/caption-box-1', attributes );
      },
    },
    {
      type: 'block',
      blocks: [ 'cocoon-blocks/tab-caption-box-1' ],
      transform: ( attributes ) => {
        return createBlock( 'cocoon-blocks/tab-caption-box-1', attributes );
      },
    },
  ],
};