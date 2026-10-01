// Founder details used by the Founder block on Home and About, and as the
// founder Person in the Organization structured data.
// - Add the photo as public/founder.jpg (square, at least 480×480). Until it
//   exists, the block shows initials instead of a broken image.
// - Add the LinkedIn URL; it becomes a profile link and the Person's sameAs.
export const founder = {
  verified: true,
  name: "Meet Dalsania",
  initials: "MD",
  role: "Founder, Clean Rows",
  photo: "/founder.jpg",
  linkedin: "",
  quote:
    "Outbound teams were signing annual database contracts, paying for every seat, then spending their week cleaning exports that were never built for them. I started Clean Rows to flip that: tell us who you sell to, check a free sample, and pay once for a list made for your campaign.",
  principles: [
    "No annual contracts",
    "No seat fees",
    "A sample before you pay",
  ],
};
