/******************************************************************************
This is a very simple binary tree based bin packing algorithm that is initialized
with a fixed width and height and will fit each block into the first node where
it fits and then split that node into 2 parts (down and right) to track the
remaining whitespace.
Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).
Inputs:
------
  w:       width of target rectangle
  h:      height of target rectangle
  blocks: array of any objects that have .w and .h attributes
Outputs:
-------
  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates
Example:
-------
  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];
  const packer = new Packer(500, 500);
  packer.fit(blocks);
  for(let n = 0 ; n < blocks.length ; n++) {
    const block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }
******************************************************************************/

class Packer {
    constructor(w, h) {
        this.init(w, h);
    }

    init(w, h) {
        this.root = {
            x: 0,
            y: 0,
            w,
            h,
        };
    }

    fit(blocks) {
        for (let n = 0; n < blocks.length; n++) {
            const block = blocks[n];

            const node = this.findNode(this.root, block.w, block.h);

            if (node) {
                block.fit = this.splitNode(node, block.w, block.h);
            }
        }
    }

    findNode(root, w, h) {
        if (root.used) {
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        } else if ((w <= root.w) && (h <= root.h)) {
            return root;
        }

        return null;
    }

    splitNode(n, w, h) {
        const PAD_H = 20;
        const PAD_W = 20;

        const node = n;

        node.used = true;
        node.down = {
            x: node.x,
            y: node.y + h + PAD_H,
            w: node.w,
            h: node.h - h - PAD_H,
        };

        node.right = {
           x: node.x + w + PAD_W,
           y: node.y,
           w: node.w - w - PAD_W,
           h,
        };

        return node;
    }
}

export default Packer;
