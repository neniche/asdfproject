module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "nosotros-pattern": "url('/img/nosotros.svg')",
      }),
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
