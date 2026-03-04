figma.showUI(__html__, { width: 240, height: 240, title: 'Pixel Pets', themeColors: true });
figma.ui.resize(240, 240);
figma.ui.on('message', (msg) => {
  if (msg.type === 'resize') {
    figma.ui.resize(msg.width, msg.height);
  }
});
