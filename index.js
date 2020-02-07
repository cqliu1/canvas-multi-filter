export default function(kibana) {
  return new kibana.Plugin({
    require: ['interpreter', 'canvas'],
    name: 'canvas-multi-filter',
    uiExports: {
      // Tell Kibana that the files in `/public` should be loaded into the
      // browser only when the user is in the Canvas app.
      canvas: ['plugins/canvas-multi-filter'],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {},
  });
}
