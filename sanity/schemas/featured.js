export default {
  name: "featured",
  title: "Featured Category",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Featured Catogry Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortdescription",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "restaurants",
      type: "array",
      title: "Restaurants",
      of: [{ type: "reference", to: [{ type: "restaurant" }] }],
    },
  ],
};
